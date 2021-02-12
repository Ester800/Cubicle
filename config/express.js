const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = (app) => {
    
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({
        defaultLayout: 'index',
        extname: ".hbs"
    }));

    app.set('view engine', ".hbs");
    app.set('views', path.join(__dirname, '../views'));

    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //TODO: Setup the static files
    app.use(express.static(path.join(__dirname, '../static')));
    
};