const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// define schema to store tokens
const tokens_schema = new mongoose.Schema({
    token: {
        type: String,
        required: false
    }
});

// define schema
const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique : true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Error: Invalid email !');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate: (value) => {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Warning: weak password !');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0)
                throw new Error('Error: Invalid age !');
        }
    },
    tokens : [tokens_schema],
    avatar : {
        type: Buffer
    }
}, {
    timestamps : true
});

// Hide sensitive data from user document (It will get called when a user document is being send in response)
user_schema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    delete user.avatar;
    return user;
}

// virtual data


// Generate JWT auth token
user_schema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id:user._id.toString(), email:user.email}, process.env.JWT_AUTH_SECRET, {expiresIn: '1 day'});
    return token;
}

// assign schema to model
const user_schema_model = mongoose.model('User', user_schema);

// export it without creating json object
module.exports = user_schema_model;