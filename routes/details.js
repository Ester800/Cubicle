var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory');
const Cube = require('../models/cube');

// GET users listing
router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);
    
    Cube.findOne({ _id: id }).populate('accessories')
        .then((thisCube) => {
            //console.log('The single cube results are ', results)
            //console.log('the accessories are ', results.accessories)
            res.render('details', { title: 'Cubicle', cube: thisCube, accessories: thisCube.accessories, isCreator: true, loggedInUser: req.user });
        });

    console.log('the id is ', id);
});



module.exports = router;