const mongoose = require('mongoose');

const signupUser = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },

    contact : {
        type: Number,
        require: true,
    },

    password: {
        type: String,
        require: true,
        unique: true,
    },

    confirmPassword: {
        type: String,
        require: true,
        unique: true,
    }
})
module.exports = mongoose.model("User" , signupUser )