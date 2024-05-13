const express=require('express');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const userControllers = require('./controllers/userControllers.js');

const adminRoute = require('./routes/adminRoute');
const authenticationMiddleware=require("./middleware/authenticationMiddleware")
const orderRoute = require('./routes/orderRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


connectDB();

const port = process.env.PORT || 5000;
app.use("/api/v1", userRoute);
app.use(authenticationMiddleware)
app.use("/api/v1", adminRoute);
app.use("/api/v1", orderRoute);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


