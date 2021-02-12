// TODO: Require Controllers...
// const express = require('express');
// var router = express.Router();
let homeRouter = require('../controllers/home');


module.exports = (app) => {
    // TODO...
    app.get('/', (req, res) => {
        homeRouter(req, res)
    }
    )};