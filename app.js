const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login-route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', loginRoute);


module.exports = app;
