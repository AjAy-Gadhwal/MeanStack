module.exports = {
    database: 'mongodb://localhost:27017/mechatroxDb',
    passport: {
        secret: 'tunePaysAuthSecret',
    },
    bcrypt: {
        salt: {
            rounds: 10,
        },
    },
    emailConfig: {
        email: "mechatroxdrive@gmail.com",
        password: "Mechatrox@3535"
    },
};
