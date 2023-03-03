const router = require('express').Router();
const Event  = require('../models/proposal')


router.get('/allproposals', async (req, res) => {
    try {
        const proposals = await Event.find().sort({ _id: "-1" })
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

router.put("/update/:id", async(req,res)=>{
    try{
        await Event.updateOne({_id:req.params.id},req.body);
        const data=await Event.find({_id:req.params.id});
        res.status(200).json({
            status:"success",
            data
        })
    }
    catch(e){
         res.status(400).json({
            status:"failed",
            message:e.message
         })   
    }
    })
    
    router.delete("/delete/:id", async(req,res)=>{
        try{
            await Event.deleteOne({_id:req.params.id});
            res.status(200).json({
                status:"Success",
                
             })  
        }
        catch(e){
             res.status(400).json({
                status:"failed",
                message:e.message
             })
    }
    })

module.exports = router;