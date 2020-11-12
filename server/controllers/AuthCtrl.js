const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const MailerCtrl = require('../utilities/Mailer');
const ejs = require('ejs');
const AdminModel = require('../models/AdminModel');

// exports.privacyPolicy = (req, res, next) => {
//     try {
//         return res.render('privacyPolicy');
//     } catch (error) {
//         console.log(error);
//         res.end();
//     }
// };

// exports.termsCondition = (req, res, next) => {
//     try {
//         return res.render('termsCondition');
//     } catch (error) {
//         console.log(error);
//         res.end();
//     }
// };

/**========================================= Admin ============================================**/
exports.login = async (req, res, next) => {
    if (req.body.username && req.body.password) {
        passport.authenticate('adminLogin', async (err, admin, info) => {
            try {
                if (err || !admin) {
                    //const error = new Error('An Error occurred')
                    //return next(error);
                    return res.json({
                        status: 400,
                        message: info.message
                    });
                }
                req.login(admin, { session: false }, async (error) => {

                    if (error) { return next(error) }

                    const body = { sub: admin._id, email: admin.email, isAdmin: true, random: Math.floor(Math.random() * Math.pow(100, 5)) };
                    const token = jwt.sign({ admin: body }, config.passport.secret, { expiresIn: 604800 });

                    admin.token = "Bearer " + token;
                    admin.save()

                    let userResponded = admin.toJSON();
                    delete userResponded.password;

                    return res.json({
                        status: 200,
                        message: info.message,
                        data: userResponded
                    });
                });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    } else {
        return res.json({
            status: 400,
            message: 'Please enter a valid data.'
        });
    }
};

exports.logout = async(req, res) => {
    const reqBody = req.body;

    try {
        if(!!reqBody && reqBody['_id']) {
            await AdminModel.findByIdAndUpdate({ "_id": reqBody['_id'] }, { token: '' }, function (err, admin) {
                console.log('admin : ', admin);
                
                if (err) {
                    return res.json({
                        status: 400,
                        message: 'Opps..! This Is Bad Request',
                        error: err
                    });
                }
        
                return res.json({
                    status: 200,
                    message: 'Get admin data by id.',
                    data: admin
                }); 
            });   
        } else {
            throw Error('Admin id missing.')
        }
    } catch (error) {
        return res.json({
            status: 400,
            message: 'Please enter a valid data.',
            error: error
        });
    }    
}

exports.contactUs = async(req, res) => {    
    try {
        const reqBody = req.body;
        const admin = await AdminModel.findOne().exec();

        console.log('admin : ', admin);

        ejs.renderFile(__dirname + '/../views/thankContactUsAdmin.ejs', { name: reqBody['name'], subject: reqBody['subject'], message: reqBody['message'] }, function (err, data) {
            if (err) {
                throw err;
            }

            MailerCtrl.sendMail("mechatroxdrive@gmail.com", reqBody['subject'], data, reqBody['email']);
        });

        ejs.renderFile(__dirname + '/../views/thankContactUs.ejs', { name: reqBody['name'], subject: reqBody['subject'] }, function (err, data) {
            if (err) {
                throw err;
            }

            MailerCtrl.sendMail(admin['email'], 'mechatrox', data);
        });

        return res.json({
            status: 200,
            message: 'Email sent'
        });
    } catch (error) {
        return res.json({
            status: 400,
            message: 'Please enter a valid data.',
            error: error
        });
    }
}