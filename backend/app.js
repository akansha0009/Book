const path= require("path");
const express=require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const Book = require('./models/add-book');
const multer = require('multer');
const jwt = require("jsonwebtoken");
const checkAuth = require('./middleware/check-auth');
const Cart = require('./models/cart')


const { diskStorage } = require("multer");
const user = require("./models/user");
const userRoutes = require("./routes/userRoutes");
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const store = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid= MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid Mime Type');
        if(isValid){
            error=null;
        }
        cb(error,"./backend/images");
    },
    filename:(req,file,cb)=>{
        const name=file.originalname.toLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, name+ '-' + Date.now()+ '.'+ext);
    }
});

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

app.post('/add-book', 
 checkAuth
,multer({storage: store}).single("image") , (req , res, next)=>{
    const url= req.protocol + "://" + req.get("host");
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        imagePath:url+"/images/"+req.file.filename
    });
    book.save().then(result => {
        res.status(201).json({
            message:"Book has been saved"
        })
    }).catch(error => {
        console.log(error);
        res.status(501).json({
            error : error,
            message:"Internal server error"
        })
    });
})

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

app.post('/cart',multer({storage: store}).single("image"),(req, res, next) => {
    const url= req.protocol + "://" + req.get("host");
    console.log(req.body);
    const cart = new Cart({
        bookId: req.body.data._id,
        userId: req.body.userId,
        name: req.body.data.name,
        author: req.body.data.author,
        price: req.body.data.price,
        category: req.body.data.category,
        description: req.body.data.description,
        imagePath: req.body.data.imagePath
    });
    cart.save().then(result => {
        res.status(201).json({
            message:"Book has been saved"
        })
    }).catch(error => {
        console.log(error);
        res.status(501).json({
            error : error,
            message:"Internal server error"
        })
    });
})

app.get('/cart', (req, res, next) => {
    // console.log('hello');
    // console.log(res)
    Cart.find().then(result => {
        console.log(result);
        res.status(201).json({
            message: "get cart",
            data:result,
        })
    })

})

app.get('/delete-cart', (req, res, next) => {
    console.log(req.query);
    Cart.remove({_id:req.query.id}).then(result => {
        console.log(result);
    })
    res.status(201).json({
        message: 'Book deleted'
    })
})

//app.listen(3000);
module.exports=app;
 