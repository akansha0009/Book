const path= require("path");
const express=require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const Book = require('./models/add-book');
const Order = require('./models/order');

const multer = require('multer');
const jwt = require("jsonwebtoken");
const checkAuth = require('./middleware/check-auth');
const Cart = require('./models/cart')


const { diskStorage } = require("multer");
const user = require("./models/user");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoute");
const bookRoutes = require("./routes/bookRoute");

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}





mongoose.connect('mongodb+srv://Akansha:2U6vOZESNw5bqBGW@cluster0.j6npz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ,{useNewUrlParser: true, useUnifiedTopology: true}).then(
    result=>{
        console.log("Users connected");
    }
).catch(error=>{
    console.log(error);
});

app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:false}));
app.use('/images',express.static(path.join('backend/images')));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();
});

app.use(userRoutes);
app.use(cartRoutes);
app.use(bookRoutes);

app.get('/recent-books', (req, res, next) => {
    let response;
    Book.find().then(result=> {
        response = result;
        console.log(result);
        res.status(201).json({
            message: response
        })
    })
})

app.post('/order', (req, res, next) => {
    console.log("body", req.body);
    res.status(200).json({
        message: "Confirm order",
    })
})

//app.listen(3000);
module.exports=app;
 