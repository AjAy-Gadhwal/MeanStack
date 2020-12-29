module.exports = {
    database: 'mongodb+srv://mechatrox:umesh1234@cluster0.0ljb0.mongodb.net/mechatroxDb?retryWrites=true&w=majority',
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
        password: "Umesh@14793535"
    },
};
