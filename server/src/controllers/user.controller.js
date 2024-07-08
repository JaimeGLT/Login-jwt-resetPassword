const { User } = require('../../db');
const bcrypt = require('bcrypt');
const {generateJWT, passwordToken} = require('../libs/jwt');
const main = require('../libs/correo');

const register = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        
        if(!username) throw Error('Nombre de usuario es obligatorio');
        if(!email) throw Error('Email es obligatorio');
        if(!password) throw Error('Contraseña es obligatoria');

        const userFound = await User.findOne({ where: { email } });
        if(userFound) throw Error('El usuario con ese correo ya existe' )

        const passwordHashed = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: passwordHashed
        });

        return res.status(200).send({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        });

    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }

};

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        if(!email) throw new Error('Email es obligatorio');
        if(!password) throw Error('Contraseña es obligatoria');

        const userFound = await User.findOne({ where: { email } });
        if(!userFound) throw Error('El usuario no fue encontrado');

        const verifyPassword = await bcrypt.compare(password, userFound.password);
        if(!verifyPassword) throw Error('Contraseña incorrecta');

        const token = generateJWT(userFound);

        res.cookie('access_token', token, {
            expiresIn: '1h'
        });


        return res.status(200).send({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
        })

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

};

const logOut = (req, res) => {

    const { access_token } = req.cookies;
    if(!access_token) return res.status(400).send({ msg: 'No se cerró ninguna cuenta' });

    res.cookie('access_token', '', {
        expiresIn: new Date(0)
    })
    
    return res.status(200).send({ msg: 'Cuenta cerrada exitosamente' });

};

const forgotPassword = async (req, res) => {

    const { email } = req.body;

    try {
        if(!email) return res.status(404).send('Debe introducir un email');

        const userFound = await User.findOne({ where: { email } });
        if(!userFound) throw Error('Este correo no esta registrado');

        const token = passwordToken(userFound);

        await main(email, token);

        userFound.token = token;
        await userFound.save();

        return res.status(200).send({ msg: 'email enviado' });

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

};

const changePassword = async (req, res) => {

    const { id } = req.userPass;
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if(!password || !confirmPassword) return res.status(401).send({ msg: 'Son campos obligatorios' });

    try {
        
        const userFound = await User.findOne({ where: { id, token }});
        if(!userFound) return res.status(401).send({ msg: 'El usuario no ah sido encontrado' });

        if(password !== confirmPassword) return res.status(404).send({ msg: 'La contraseña debe ser la misma' });

        const newPasswordHashed = await bcrypt.hash(password, 10);

        userFound.password = newPasswordHashed;
        userFound.token = '';
        await userFound.save();

        return res.status(200).send({ msg: 'contraseña cambiada correctamente' });

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

};


const userProfile = async (req, res) => {

    const { id } = req.user;

    try {
        
        const userFound = await User.findByPk(id);
        if(!userFound) return res.status(401).send({ msg: 'Usuario no encontrado' });

        return res.status(200).send({
            username: userFound.username,
            email: userFound.email
        })

    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }

};

module.exports = {
    register,
    loginUser,
    logOut,
    forgotPassword,
    userProfile,
    changePassword
};