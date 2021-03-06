var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

/* GET create listing */
router.get('/:uid', function(req, res, next) {
    console.log('get attachAccessory');
    
    let id = req.params.uid;
    console.log(id);

    // get all accessories which are not attached to thisCube already
    Cube.findOne({ _id: id }).populate('accessories')
        .then((thisCube) => {
            console.log(thisCube);

            // create array which has the ids of the attached accessories
            let idArr = thisCube.accessories.map(a => {return a._id;});

            console.log('idArr', idArr);

            Accessory.find()
                .then((foundAccessories) => {
                    //get all accessories, then filter out any which were already attached
                    let dropdownAccessories = foundAccessories.filter(acc => !idArr.includes(acc._id));

                    console.log('all accessories', foundAccessories);

                    console.log('accessories to add to dropdown', dropdownAccessories);
                    res.render('attachAccessory', { title: 'Attach Accessory Page', cube: thisCube, dropdownAccessories: dropdownAccessories, loggedInUser: req.user});
                });
        });
});

router.post('/:uid', function(req, res, next) {
    let selAccId = req.body.accessory;
    let cubeId = req.params.uid;

    Cube.findOneAndUpdate(
        { _id: cubeId },
        { $push: {"accessories": selAccId}},
        { upsert: true },
        function(err) { if (err) console.log(err);}
    );
    Accessory.findOneAndUpdate(
        { _id: selAccId },
        { $push: {"cubes": cubeId}},
        { upsert: true },
        function(err) { if (err) console.log(err);
        });

        res.redirect(`/details/${cubeId}`);
});

module.exports = router;