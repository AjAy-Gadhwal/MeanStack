const ProductModel = require("../models/ProductModel");
const ProductDetailModel = require("../models/ProductDetailModel");
var mongoose = require('mongoose');

exports.insert = async (req, res, next) => {
    try {
        const reqBody = req.body || {};
        const reqFile = req.file || {};

        if ((reqBody && !!reqBody)) { 
            const query = { "_id": reqBody['_id'] || mongoose.Types.ObjectId() };
            const update = {
                "name": reqBody['name'],
                "description": reqBody['description']
            };
            if (reqFile['filename']) {
                update['image'] = `uploads/${reqFile['filename']}`;
            }
            const options = { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true };

            const product = await ProductModel.findOneAndUpdate(query, update, options);

            return res.json({
                status: 200,
                message: 'Product successfully created.',
                data: product
            });
        } else {
            throw Error('Please check your params.')
        }
    } catch (error) {
        return res.json({
            status: 400,
            message: 'Please enter a valid data.',
            error: error.message
        });
    }
};

exports.update = async (req, res, next) => { 
    return this.insert(req, res, next);
}

exports.get = async (req, res, next) => { 
    try {
        let products = await ProductModel.find({ isActive: true }).exec();

        return res.json({
            status: 200,
            message: 'Get products.',
            data: products
        });
    } catch (error) {
        return res.json({
            status: 400,
            message: 'Please enter a valid data.',
            error: error.message
        });
    }
}