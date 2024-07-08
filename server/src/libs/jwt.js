const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const generateJWT = (user) => {

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: '1h'
    });

    return token;

};

const passwordToken = user => {

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: '15m'
    })

    return token;

};

module.exports = {
    generateJWT,
    passwordToken
};