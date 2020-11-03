const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// const passportJWT = require("passport-jwt");
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const AdminModel = require("../models/AdminModel");
const config = require("../config/config");

//Create a passport middleware to handle User login
// passport.use('customerLogin', new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password',
//     passReqToCallback: true
// }, async (req, username, password, done) => {
//     try {
//         const user = await Customer.findOne({ username: username });
//         if (user) {
//             if (!await user.isValidPassword(password)) {
//                 return done(null, false, { message: 'Invalid username and password.' });
//             }
//             else if (!user.isActive) {
//                 return done(null, false, { message: 'Your account is not activated. Please verify it by clicking the activation link that has been send to your email.' });
//             }
//             else if (user.isDeleted) {
//                 return done(null, false, { message: 'Your account has been deleted.' });
//             }
//         } else {
//             return done(null, false, { message: 'Invalid username and password.' });
//         }
//         return done(null, user, { message: 'Logged in Successfully' });
//     } catch (error) {
//         console.log(error);
//         return done(error);
//     }
// }));


passport.use('adminLogin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        const user = await AdminModel.findOne({ username: username });
        if (user) {
            if (!await user.isValidPassword(password)) {
                return done(null, false, { message: 'Invalid username and password.' });
            }
            else if (!user.isActive) {
                return done(null, false, { message: "Your account is not activated. Super Admin has revoked you admin right's ." });
            }
            else if (user.isDeleted) {
                return done(null, false, { message: 'Your account has been deleted.' });
            }
        } else {
            return done(null, false, { message: 'Invalid username and password.' });
        }
        return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
        console.log(error);
        return done(error);
    }
}));


var jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: config.passport.secret
};
passport.use(new JWTStrategy(jwtOptions, async (jwt_payload, done) => {    
    console.log('jwt_payload : ', jwt_payload);
    try {
        // let token = req.get("Authorization");

        const user = await AdminModel.findOne({
            id: jwt_payload.sub
        });
        console.log('user : ', user);
        
        if (user) {
            return done(null, jwt_payload.user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.log(error);
        return done(null, false);
    }
}));