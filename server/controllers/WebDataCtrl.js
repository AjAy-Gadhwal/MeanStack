const WebDataModel = require("../models/WebDataModel");
var mongoose = require('mongoose');

exports.insert = async (req, res, next) => {
    try {
        const reqBody = req.body || {};     
        const options = { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true };

        console.log('reqBody : ', reqBody);

        if ((reqBody && !!reqBody)) { 
            const query = { "_id": reqBody['_id'] || mongoose.Types.ObjectId() };
            const update = {
                "aboutUs": reqBody['aboutUs']
            };

            const webData = await WebDataModel.findOneAndUpdate(query, update, options);

            return res.json({
                status: 200,
                message: 'Web data successfully created.',
                data: webData
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
        let webData = await WebDataModel.findOne({ isActive: true }).exec();

        return res.json({
            status: 200,
            message: 'Get web data.',
            data: webData
        });
    } catch (error) {
        return res.json({
            status: 400,
            message: 'Please enter a valid data.',
            error: error.message
        });
    }
}
