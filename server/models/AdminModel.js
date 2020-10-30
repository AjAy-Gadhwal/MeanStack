const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/config');

var Admin = new Schema({
    name: { type: String, required: [true, 'Admin name required.'], trim: true },    
    email: { type: String, required: [true, 'Admin email required.'], trim: true, unique: true },
    username: { type: String, required: [true, 'Admin username required.'], trim: true, unique: true },
    password: { type: String, required: [true, 'Admin password required.'], trim: true },
    avatar: { type: String, default: '', trim: true },
    token: { type: String, default: '', trim: true },
    isActive: { type: Boolean, required: [true, 'Please enter is active.'], default: 1, trim: true },
    isDeleted: { type: Boolean, required: [true, 'Please enter is delete.'], default: 0, trim: true },
},
{
    timestamps: true,
    collection: 'Admins'
});

Admin.pre('save', function (next) {
    (async () => {
        try {
            var user = this;
            if (user.isModified('password') || user.isNew) {
                let rounds = config.bcrypt.salt.rounds;
                let salt = await bcrypt.genSalt(rounds);
                let hash = await bcrypt.hash(user.password, salt);
                user.password = hash;
                next();
            } else {
                return next();
            }
        } catch (err) {
            return next(err);
        }
    })();
});

Admin.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

module.exports = mongoose.model('Admin', Admin);