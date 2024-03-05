const mongoose = require('mongoose');

const {Schema} = mongoose;

const productSchema =  new Schema({
    name: {
        type: String,
        minLength:1,
        maxLength: 30
    },
    size: {
        type: String,
        minLength: 1,
        maxLength: 8
    },
    price: {
        type: Number,
    },
    color: {
        type: String,
        maxLength: 20,
        minLength: 1
    },
    category: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    likes: {
        type: Number,
        default: 0
    },
    img: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now()
    },
    newArrival: {
        type: Boolean,
        default: true
    }
})

const Products = mongoose.model("Products", productSchema);
module.exports = Products