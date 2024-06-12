const express = require('express');
const path = require('path');
const morgan = require('morgan')
const mysql = require('mysql2');
const myConnection = require('express-myconnection');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const app = express()

//importing routes
const customerRoutes = require('./routes/customer');
//const exp = require('constants');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
};

app.use(myConnection(mysql, dbOptions, 'single'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', customerRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});