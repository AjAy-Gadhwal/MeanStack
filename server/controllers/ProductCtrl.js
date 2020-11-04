const ProductModel = require("../models/ProductModel");
const ProductDetailModel = require("../models/ProductDetailModel");
var mongoose = require('mongoose');

exports.insert = async (req, res, next) => {
    try {
        const reqBody = req.body || {};
        const reqFile = req.file || {};        
        const options = { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true };

        console.log('reqBody : ', reqBody);

        if ((reqBody && !!reqBody)) { 
            const query = { "_id": reqBody['_id'] || mongoose.Types.ObjectId() };
            const update = {
                "name": reqBody['name'],
                "description": reqBody['description']
            };
            if (reqFile['filename']) {
                update['image'] = `uploads/${reqFile['filename']}`;
            }

            if (reqBody['products'] && reqBody['products'].length > 0) {                
                reqBody['products'] = reqBody['products'].map(product => { product['productId'] = query['_id']; return product; } );
                
                if (reqBody['_id']) {
                    await ProductDetailModel.deleteMany({ productId: reqBody['_id'] });
                }
                const products = await ProductDetailModel.insertMany(reqBody['products']);
                console.log('products : ', products);
                update['products'] = products;
            }

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
        let products = await ProductModel.find({ isActive: true }).populate('products').exec();

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

exports.detele = async (req, res, next) => { 
    try {
        const record = await ProductModel.findOneAndDelete({ '_id': req.params.id }); 
        
        return res.json({
            status: 200,
            message: 'Product deleted successfully.',
            data: record
        });
    } catch (error) {
        return res.json({
            status: 400,
            message: 'Please enter a valid data.',
            error: error.message
        });
    }
}
