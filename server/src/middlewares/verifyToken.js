const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {

    const { access_token } = req.cookies;
    if(!access_token) return res.status(401).send({ msg: 'No token, sin autorización' });

    jwt.verify(access_token, SECRET_KEY, (err, user) => {

        if(err) return res.status(400).send({ msg: 'Token inválido' });

        req.user = user;

        next();

    });

};



module.exports = verifyToken;