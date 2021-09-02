const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    bookId: {type: String, required: true},
    userId: {type: String, required: true},
    name:{type: String, required: true},
    author:{type:String, required: true},
    price: { type: Number, required: true},
    category: { type: String, required: true},
    description: { type: String, required: true},
    imagePath: {type: String, required: true}  
})

module.exports = mongoose.model('Cart', cartSchema);
