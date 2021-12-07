// npm packages ...
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const hbs = require('hbs');
const Routes = require('./routes/router'); // app routes ...
const app = express();
const port = process.env.PORT || 8080;

// file paths ...
const staticPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views/');
const partialsPath = path.join(__dirname, '../templates/partials/');

// app middlewares ...
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// app.use(cookieParser());
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));
app.use(Routes);

// listening to app on port 5000 ...
app.listen(port, (error) => {
    if (error) {
        console.log(`error occured while listening to app => ${error}`);
    } else {
        console.log(`server running on localhost port ${port}`);
    }
});