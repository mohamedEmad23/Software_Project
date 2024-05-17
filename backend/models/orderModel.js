const mongoose = require('mongoose');
const Product = require('./productModel');

// This is a testing environment for Ali Amr's new order model schema

// const orderSchema = new mongoose.Schema ({
//     user: {type: mongoose.Types.ObjectId, ref: "User"},
//     product: {type: mongoose.Types.ObjectId, ref: "Product"}
// });
//
// module.exports=mongoose.model('Order',orderSchema);

///////////////////////////////////////////////////

const orderSchema = new mongoose.Schema({
    customer:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        immutable: true
    }
    ,
    products:{
        type:[mongoose.SchemaTypes.ObjectId],
        required: false
    }
    ,
    createdAt:{
        type: Date,
        default: () => Date.now(),
        required: false,
        immutable: true
    }
    ,
    updatedAt:{
        type: Date,
        default: () => Date.now(),
        required: false

    }
    ,
    totalPrice:{
        type:Number,
        default: 0,
        required: false,
        min: 0

    }
    ,
    isComplete:{
        type:Boolean,
        default: false,
        required: false

    }
    ,numOfProducts:{
        type: Number,
        default:0,
        required:false,
        min: 0
    }

})




//METHODS:

//ADDITIONAL METHOD:

orderSchema.statics.getOrderById = async function(orderId){
    try{
        const order = await this.findById(orderId);
        if(!order){
            throw new Error('Order not found')
        }
        return order;
    }catch(error){
        throw new Error('Error retrieving order: ' + error.message)
        //console.error(error.message)
    }
}


//CREATE A NEW ORDER


orderSchema.statics.createOrder = async function(customerId){

    try{
        if(!customerId){
            throw new Error('Costumer parameter is missing!')
        }

        const order = new this({
            customer: customerId,
        });

        await order.save()

        return order

    } catch(error){
        throw new Error('Error creating order: ' + error.message)
        //console.error(error.message)
    }
};




//ADDING AND REMOVING A PRODUCT



//ADDING A NEW PRODUCT TO THE LIST OF PRODUCTS

orderSchema.methods.addProduct = async function(productId) {
    try {

        //CHECKS IF THE PRODUCT ACTUALLY EXISTS IN THE DATABASE
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Can not add this product since it does not exist!');
        }

        this.products.push(productId);

        await this.save();

        return this;
    } catch (error) {
        throw new Error('Error adding product to order: ' + error.message);
        //console.error(error.message)
    }
};


//REMOVING A PRODUCT FROM THE LIST OF PRODUCTS

orderSchema.methods.removeProduct = async function(productId) {
    try {
        //CHECKS IF THE ORDER IS EMPTY
        if(this.products.length ==0){
            throw new Error('The order cart is empty');
        }
        //CHECKS IF THE PRODUCT IS IN THE ORDER
        if (!this.products.includes(productId)) {
            throw new Error('Product was not found in the order!');
        }
        //GRABS THE OBJECT ID TO REMOVE IT FROM THE ORDER
        const product = await Product.findById(productId);

        index = this.products.indexOf(product)

        this.products.splice(index,1);



        await this.save();

        return this;
    } catch (error) {
        throw new Error('Error removing product from order: ' + error.message);
        //console.error(error.message)
    }
};



//PLACING AN ORDER
orderSchema.methods.placeOrder = async function(){
    try{
        if(this.isComplete){
            throw new Error("A complete order can not be placed")
        }
        if(this.numOfProducts===0){
            throw new Error("Can not place an empty order!")
        }

        this.isComplete = true;

        await this.save();

        console.log("Order was Placed Succesfully")

    }catch(error){
        throw new Error('Error Placing order : ' + error.message)
        //console.error(error.message)
    }
}







//CANCEL/DELETE ORDER

orderSchema.methods.cancelOrder = async function(){
    try{
        if(this.isComplete){
            throw new Error("A complete order can not be cancelled!")
        }

        await this.deleteOne()
        console.log('Order was Cancelled succesfully!')

    }catch (error){
        throw new Error('Error cancelling order : ' + error.message)
        //console.error(error.message)
    }
}




//HOOKS

//PRE VALIDATION HOOK TO PREVENT MODIFICATION



orderSchema.pre('validate', function(next) {

    try {
        if(this.isComplete&&this.isModified('products')){
            return next(new Error('Cannot modify a complete order.'));
        }

        next();
    } catch (error) {
        next(error);
    }
});



//PRE SAVE HOOK:



orderSchema.pre('save', async function(next) {
    try {

        //UPDATING THE TOTAL PRICE
        const productPromises = this.products.map(productId => Product.findById(productId));

        const products = await Promise.all(productPromises);

        let totalPrice = 0;
        for (const product of products) {
            totalPrice += product.price;
        }
        this.totalPrice = totalPrice;

        //UPDATING NUMBER OF PRODUCTS
        this.numOfProducts = this.products.length;

        //TO RECALCULATE THE UPDATED TIME
        this.updatedAt = Date.now()

        next();

    } catch (error) {
        next(error);
    }
});



//EXPORT ORDER MODEL
module.exports=mongoose.model('Order',orderSchema);
