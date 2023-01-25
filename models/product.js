const mongoose = require('mongoose'); 

//Create schema 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number, 
        required: true, 
        min: 0,
    },
    category: {
        type: String, 
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})
//Need to compile our model
const Product = mongoose.model('Product', productSchema);


//Now could import this model and use it somewhere else 
module.exports = Product;