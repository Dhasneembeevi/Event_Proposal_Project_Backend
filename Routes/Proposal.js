const router = require('express').Router();
const { Event } = require('../models/proposal')


router.get('/allproposals', async(req,res)=>{
    try {
        const proposals = await Event.find().sort({_id:"-1"})
        res.json({
            status: "success",
            proposals,
        })
    } 
    catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })   
    }
})

router.post("/createproposals" ,async(req,res)=>{
   
    const createProposal = new Event({

        eventName : req.body.username,
        eventPlace : req.body.eventPlace,
        proposalType : req.body.proposalType,
        eventType : req.body.eventType,
        eventClass : req.body.eventClass,
        budget : req.body.budget,
        fromDate : req.body.fromDate,
        toDate : req.body.toDate,
        description : req.body.description,
        foodPreferences : req.body.foodPreferences,
        events : req.body.events,
        // images : req.files.images
    })

    try{

    const newProposal = await createProposal.save();
    res.status(201).json(newProposal)
}catch(err){
    res.status(500).json(err)
}
})

module.exports = router;