module.exports = {
    database: 'mongodb://localhost:27017/dbs',
    passport: {
        secret: 'tunePaysAuthSecret',
    },
    bcrypt: {
        salt: {
            rounds: 10,
        },
    }
};
