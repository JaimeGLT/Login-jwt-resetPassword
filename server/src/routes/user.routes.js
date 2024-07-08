const userRouter = require('express').Router();
const { register, loginUser, logOut, forgotPassword, userProfile, changePassword } = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyTokenPassword = require('../middlewares/verifyTokenPassword');


userRouter.post('/register', register);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logOut);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/change-password/:token', verifyTokenPassword, changePassword);

userRouter.get('/profile', verifyToken, userProfile);

module.exports = userRouter;