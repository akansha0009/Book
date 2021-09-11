
const Book = require('../models/add-book');

exports.addBook = (req, res, next) => {
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

}