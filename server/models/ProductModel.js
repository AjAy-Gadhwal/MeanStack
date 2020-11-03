const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Product = new Schema({
    name: { type: String, required: [true, 'Product name required.'], default: null, trim: true },    
    image: { type: String, required: [true, 'Product image required.'], default: null, trim: true },
    description: { type: String, default: null, trim: true },        
    products: [{
        type: mongoose.ObjectId,
        ref: "ProductDetail"
    }],
    isActive: { type: Boolean, default: 1, trim: true },
    isDeleted: { type: Boolean, default: 0, trim: true },
},
{
    timestamps: true,
    collection: 'Products'
});

module.exports = mongoose.model('Product', Product);