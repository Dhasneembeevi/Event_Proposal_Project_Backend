const mongoose = require('mongoose');

const signupVendor = new mongoose.Schema({
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
        unique: true,
    },

    confirmPassword: {
        type: String,
        require: true,
        unique: true,
    }
})
module.exports = mongoose.model("Vendor" , signupVendor)