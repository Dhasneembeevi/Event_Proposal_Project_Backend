const mongoose = require('mongoose');

const userProposal = new mongoose.Schema({
    Username: {
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
    eventDate:{
        type: Date,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    
},
{
    timestamps: true
})
module.exports = mongoose.model("Event" , userProposal)