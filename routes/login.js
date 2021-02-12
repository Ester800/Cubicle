var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET login listing
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login Page', loggedInUser: req.user });
});

router.post('/', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
})

module.exports = router;