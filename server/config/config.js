module.exports = {
    database: 'mongodb://localhost:27017/mechatroxDb',
    passport: {
        secret: 'tunePaysAuthSecret',
    },
    bcrypt: {
        salt: {
            rounds: 10,
        },
    }
};
