const mongoose = require('mongoose');

const signupUser = new mongoose.Schema({
    username: {
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
    },

    confirmPassword: {
        type: String,
        require: true,
    }
})
module.exports = mongoose.model("User" , signupUser )