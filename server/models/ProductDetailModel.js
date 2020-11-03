const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProductDetail = new Schema({
    model: { type: String, required: [true, 'Product model required.'], trim: true },
    ratio: { type: String, trim: true },
    size: { type: String, trim: true },
    type: { type: String, trim: true },
    powerKw: { type: String, trim: true },
    powerHp: { type: String, trim: true },
    flange: { type: String, required: [true, 'Product flange required.'], trim: true },
    application: { type: String, trim: true },
    industries: { type: String, trim: true },
    productId: { type: mongoose.ObjectId, required: [true, 'Please enter product.'], default: null, trim: true, ref: "Product" },
    isActive: { type: Boolean, default: 1, trim: true },
    isDeleted: { type: Boolean, default: 0, trim: true },
},
{
    timestamps: true,
    collection: 'ProductDetails'
});

module.exports = mongoose.model('ProductDetail', ProductDetail);