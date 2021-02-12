const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Accessory = require('./accessory');
const User = require('./user');

const cubeSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[\w\d][\w\d\s]*[\w\d]$/.test(v);       //starts with any number or english letter; includes only numbers, letters, and spaces; and ends with any number or english letter
            },
            message: `must be only letters/numbers/spaces and not start or end with a space!`
        },
        minlength: [5, 'must be at least 5 characters!'],
        required: [true, 'must have a name!']
    },
    description: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[\w\d][\w\d\s]*[\w\d]$/.test(v);       //starts with any number or english letter; includes only numbers, letters, and spaces; and ends with any number or english letter
            },
            message: `must be only letters/numbers/spaces and not start or end with a space!`
        },
        minlength: [20, 'must be at least 20 characters!'],
        required: [true, 'must have a description!']
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function(v) {
                return /^https?:\/\/\X*/.test(v);       //starts with https://
            },
            message: `must start with "http(s)://"!`
        },
        required: [true, 'must have an image path!']
    },
    difficulty: {
        type: Number,
        required: true
    },
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory'}],
    creator: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;