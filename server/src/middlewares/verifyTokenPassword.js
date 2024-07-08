const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const verifyTokenPassword = (req, res, next) => {

    const { token } = req.params;
    if(!token) return res.status(404).send({ msg: 'Hace falta el token' });

    jwt.verify(token, SECRET_KEY, (err, user) => {

        if(err) return res.status(400).send({ msg: 'Token no valido' });
        const now = Math.floor(Date.now() / 1000);
        console.log(now);
        console.log(user.exp);


        if(now >= user.exp) return res.status(400).send('El token ha expirado');

        req.userPass = user;


        next();

    });

};

module.exports = verifyTokenPassword;