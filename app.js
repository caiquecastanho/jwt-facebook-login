const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login-route');

const app = express();
const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'Provides authentication layer for REST APIs through Facebook',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json",
        ],
        schemes: ['https']
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', loginRoute);


module.exports = app;
