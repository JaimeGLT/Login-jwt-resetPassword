const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// rutas
app.use('/api', userRouter);

module.exports = app;