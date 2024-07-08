require('dotenv').config();
const app = require('./src/app');
const { database } = require('./db');
const { PORT } = process.env;

database.sync({ force: false }).then(
    console.log('database conneccted'),

    app.listen(PORT, () => {
        console.log('Server on port:' , PORT);
    })
)