const Cart = require("../models/cart")

exports.getCart = (req, res, next) => {
    Cart.find().then(result => {
        console.log(result);
        res.status(201).json({
            message: "get cart",
            data:result,
        })
    }
    )
}

exports.postCart = (req, res, next) => {
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
}

exports.deleteCart = (req, res, next) => {
    console.log(req.query);
    Cart.remove({_id:req.query.id}).then(result => {
        console.log(result);
    })
    res.status(201).json({
        message: 'Book deleted'
    })
}