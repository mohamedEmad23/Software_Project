const {Router} = require('express');
const userControllers = require('../controllers/userControllers');
const orderControllers = require('../controllers/orderControllers.js');
const authorizationMiddleware = require('../middleware/authorizationMiddleware.js');
const authenticationMiddleware = require('../middleware/authenticationMiddleware.js');
const userModel = require('../models/userModel.js'); // Import userModel
const router = Router();

// register
router.post('/register', userControllers.register);
// login
router.post('/login', userControllers.login);
//Get All Products
router.get('/products', userControllers.getAllProducts);
//Get User Role
router.get('/user/role/:userId', authenticationMiddleware, async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ role: user.role });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


module.exports = router;