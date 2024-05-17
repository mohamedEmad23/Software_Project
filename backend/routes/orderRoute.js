const {Router} = require('express');
const orderControllers = require('../controllers/orderControllers.js');
const authorizationMiddleware = require('../middleware/authorizationMiddleware.js');
const router = Router();

// router.post('/placeOrder', authorizationMiddleware([1]),orderControllers.placeOrder);
// router.get('/orders', authorizationMiddleware([1]),orderControllers.getOrders);


//POST


//CREATE ORDER
router.post('/createOrder/:customerId', authorizationMiddleware([1]), orderControllers.createOrder);


//PATCH

//ADD PRODUCT
router.patch('/order/addProduct/:orderId/:productId', authorizationMiddleware([1]), orderControllers.addProduct);

//REMOVE PRODUCT
router.patch('/order/removeProduct/:orderId/:productId', authorizationMiddleware([1]), orderControllers.removeProduct);

//PLACE ORDER
router.patch('/placeOrder/:orderId', authorizationMiddleware([1]), orderControllers.placeOrder);


//GET

//GET ONE ORDER
router.get('/getOneOrder/:orderId', authorizationMiddleware([1]), orderControllers.getOneOrder);

//GET ALL ORDERS
router.get('/getAllOrders/:customerId', authorizationMiddleware([1]), orderControllers.getAllOrders);

//GET ACTIVE ORDERS
router.get('/getActiveOrders/:customerId', authorizationMiddleware([1]), orderControllers.getActiveOrders);

//GET COMPLETE ORDERS
router.get('/getCompleteOrders/:customerId', authorizationMiddleware([1]), orderControllers.getCompleteOrders);


//DELETE

//DELETE ORDER
router.delete('/deleteOrder/:orderId', authorizationMiddleware([1]), orderControllers.deleteOrder);





module.exports = router;