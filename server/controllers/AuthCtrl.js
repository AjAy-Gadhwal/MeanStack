const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


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
        passport.authenticate('adminLogin', async (err, user, info) => {
            try {
                if (err || !user) {
                    //const error = new Error('An Error occurred')
                    //return next(error);
                    return res.json({
                        status: 400,
                        message: info.message
                    });
                }
                req.login(user, { session: false }, async (error) => {

                    if (error) { return next(error) }

                    const body = { sub: user._id, email: user.email, isAdmin: true, random: Math.floor(Math.random() * Math.pow(100, 5)) };
                    const token = jwt.sign({ user: body }, config.passport.secret, { expiresIn: 604800 });

                    user.token = "jwt " + token;
                    user.fcmToken = req.body.fcmToken || '';
                    user.save()

                    let userResponded = user.toJSON();
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