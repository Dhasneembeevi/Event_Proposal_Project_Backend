const mongoose = require('mongoose');

const userProposal = new mongoose.Schema({
    eventName: {
        type: String,
        require: true,
    },

   eventPlace: {
        type: String,
        require: true,
    },

    proposalType : {
        type: String,
        require: true,
    },

    eventType: {
        type: String,
        require: true,
    },
    eventClass:{
        type: String,
        require: true,
    },

  budget: {
        type: Number,
        require: true,
    },
    fromDate:{
        type: Date,
        require: true,
    },
    toDate:{
        type: Date,
        require: true,
    },
    

    description: {
        type: String,
        require: true,
    },
    foodPreferences : {
        type: String,
        require: true,
    }, 
    events:{
        type: String,
        require: true,
    },
    images : {
        type: String,
        require :true,
    }
},
{
    timestamps: true
})
module.exports = mongoose.model("Event" , userProposal)