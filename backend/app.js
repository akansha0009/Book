const path= require("path");
const express=require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const Book = require('./models/add-book');
const multer = require('multer');

const crypto = require('crypto');
const { diskStorage } = require("multer");

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

app.post('/signUp',(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const salt = "toosoon"
    const hash = crypto.createHash("sha256", salt).update(password).digest('hex');
    console.log(hash);
    const user = new User({
        email: email,
        password: hash
    });
    user.save().then((result) => {
        if(result){
            res.json({
                message:"User Created"
                });
        }
    }) .catch((error) => {
        res.status(501).json({
            message: "Internal server error",
            error: error
        })
    });
   
});

app.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const salt = "toosoon"
    const hash = crypto.createHash("sha256", salt).update(password).digest('hex');
    // console.log(req.body);
    User.findOne({
        email: email
    }).then((result) => {
        console.log(result);
        if(result.password == hash){
            res.status(201).json({
                message: 'User is logged in'
            })
        }
    })
})

app.post('/add-book', multer({storage: store}).single("image") , (req , res, next)=>{
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

//app.listen(3000);
module.exports=app;
 