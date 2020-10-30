const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Product = new Schema({
    name: { type: String, required: [true, 'Product name required.'], trim: true },
    model: { type: String, required: [true, 'Product model required.'], trim: true },
    image: { type: String, required: [true, 'Product image required.'], trim: true },
    ratio: {
        minmum: { type: String, required: [true, 'Product minmum ratio required.'], trim: true },
        maxmum: { type: String, required: [true, 'Product maxmum ratio required.'], trim: true },
    },
    power: {
        kw: { type: String, required: [true, 'Product power kw required.'], trim: true },
        hp: { type: String, required: [true, 'Product power hp required.'], trim: true },
    },
    flange: { type: String, required: [true, 'Product flange required.'], trim: true },
    isActive: { type: Boolean, default: 1, trim: true },
    isDeleted: { type: Boolean, default: 0, trim: true },
},
{
    timestamps: true,
    collection: 'Products'
});

module.exports = mongoose.model('Product', Product);