const { Sequelize } = require('sequelize');
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const user = require('./src/models/User.model');

const database = new Sequelize(`postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { logging: false });

user(database);
console.log(database.models);

module.exports = {
    database,
    ...database.models
};