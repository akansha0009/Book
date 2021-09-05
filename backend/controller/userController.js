const User = require("../models/user");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

exports.signUp = (req,res,next)=>{
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
};

/***************  Login User *****************/
exports.login = (req,res,next)=>{
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
            const token = jwt.sign({email: user.email, userId: user._id},
                'anything_should_be_longer',
                 {expiresIn: "1h"});
                 console.log(token);
               res.status(200).json({
                   token: token,
                   id: result._id
               })
        }
    });
};