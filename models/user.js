const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    //id: mongoose.isValidObjectId,
    username: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[\w\d]*$/.test(v);
            },
            message: `must be only letters or numbers!`
        },
        minlength: [5, 'must be 5 or more letters!'],
        required: [true, 'is required']
    },
    password: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[\w\d]*$/.test(v);
            },
            message: `must be only letters or numbers!`
        },
        minlength: [8, 'must be 8 or more letters...'],
        //required: [true, 'is required']
    },
    cubes: [{ type: Schema.Types.ObjectId, ref: 'Cube' }]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;