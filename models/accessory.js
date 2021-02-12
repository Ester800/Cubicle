const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cube = require('./cube');

const accessorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cubes: [{ type: Schema.Types.ObjectId, ref: 'Cube' }]
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;