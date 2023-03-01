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
module.exports = router;