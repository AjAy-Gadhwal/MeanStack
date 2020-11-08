const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var WebData = new Schema({
    aboutUs: { type: String, default: null, trim: true },        
    isActive: { type: Boolean, default: 1, trim: true },
    isDeleted: { type: Boolean, default: 0, trim: true },
},
{
    timestamps: true,
    collection: 'WebDatas'
});

module.exports = mongoose.model('WebData', WebData);