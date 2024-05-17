const Order = require('../models/orderModel');
const mongoose = require('mongoose');
const Product = require('../models/productModel');

// module.exports.placeOrder = async (req, res) => {
//     const { products,userId } = req.body; // products should be an array of product IDs
//
//
//     try {
//         if (!products || !Array.isArray(products) || products.length === 0) {
//             return res.status(400).json({ message: 'No products provided' });
//         }
//
//         const orders = await Promise.all(products.map(async (productId) => {
//             const newOrder = new Order({ user: userId, product: productId });
//             return await newOrder.save();
//         }));
//
//         res.status(201).json(orders);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
//
// module.exports.getOrders = async (req, res) => {
//     const { userId } = req.body;
//
//     try {
//         const orders = await Order.find({ user: userId }).populate('product');
//         let products = [];
//         if (orders && Array.isArray(orders)) {
//             products = orders.map(order => order.product);
//         }
//         res.status(200).json(products);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// PUT
// Beye3mel instance men el order
module.exports.createOrder = async (req, res) => {
    try {
        const customerId = new mongoose.Types.ObjectId(req.params.customerId);
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            throw new Error("Invalid Customer Id");
        }
        const order = await Order.createOrder(customerId);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//PATCH
//Adds el instance of a product ely mawgood odam el user
module.exports.addProduct = async (req, res) => {
    try {
        const orderId = new mongoose.Types.ObjectId(req.params.orderId);
        const order = await Order.getOrderById(orderId);
        const productId = new mongoose.Types.ObjectId(req.params.productId);
        await order.addProduct(productId);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//removes product men el order
module.exports.removeProduct = async (req, res) => {
    try {
        const orderId = new mongoose.Types.ObjectId(req.params.orderId);
        const order = await Order.getOrderById(orderId);
        const productId = new mongoose.Types.ObjectId(req.params.productId);
        await order.removeProduct(productId);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports.placeOrder = async (req, res) => {
    try {
        const orderId = new mongoose.Types.ObjectId(req.params.orderId);
        const order = await Order.getOrderById(orderId);
        await order.placeOrder();
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// GET

module.exports.getOneOrder = async (req, res) => {
    try {
        const orderId = new mongoose.Types.ObjectId(req.params.orderId);
        const order = await Order.getOrderById(orderId);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.getAllOrders = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            throw new Error("Invalid Customer Id");
        }
        const orders = await Order.find({ customer: customerId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.getActiveOrders = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            throw new Error("Invalid Customer Id");
        }
        const orders = await Order.find({ customer: customerId, isComplete: false }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.getCompleteOrders = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            throw new Error("Invalid Customer Id");
        }
        const orders = await Order.find({ customer: customerId, isComplete: true }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// DELETE

module.exports.deleteOrder = async (req, res) => {
    try {
        const orderId = new mongoose.Types.ObjectId(req.params.orderId);
        const order = await Order.getOrderById(orderId);
        await order.cancelOrder();
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
