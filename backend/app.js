const path= require("path");
const express=require('express');
const app= express();
const mongoose = require('mongoose');
// const mongoConnect = require('./util/database').mongoConnect;
// mongoConnect();
app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:false}));
app.use('/images',express.static(path.join('backend/images')));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();
});



// app.listen(3000);
module.exports=app;