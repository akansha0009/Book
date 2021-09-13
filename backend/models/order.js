const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    bookId: {type: String, required: true},
    name:{type: String, required: true},
    author:{type:String, required: true},
    price: { type: Number, required: true},
    category: { type: String, required: true},
    description: { type: String, required: true},
    imagePath: {type: String, required: true},
    userId: {type: String, required: true},
});

const OrderSchema = new Schema({
    date: {type: Date, required: true},
    total: {type: Number, required: true},
    books: [BookSchema]
});

module.exports = mongoose.model('Order', OrderSchema);