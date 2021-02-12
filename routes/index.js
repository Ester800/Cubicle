var express = require('express');
//const { handlebars } = require('hbs');
var router = express.Router();
//const cubes = require('../config/database.json');
const passport = require('passport');
const Cube = require('../models/cube');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    Cube.find()
      .then((response) => {
      res.render('index', { title: 'Express now with Mongo', cube: response, loggedInUser: req.user });
    })
      .catch((err) => console.log(err));
});

router.get('/ping', async function(req, res) {
  res.status(200).send('pong');
});

module.exports = router;
