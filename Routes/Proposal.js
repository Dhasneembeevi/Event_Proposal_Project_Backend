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

// router.post("/createproposals", async (req, res) => {
//     const { eventName, eventPlace, proposalType, eventType, eventClass, budget, fromDate, toDate, description, foodPreferences, events } = req.body;
//     console.log({ eventName, eventPlace, proposalType, eventType, eventClass, budget, fromDate, toDate, description, foodPreferences, events })
//     const { images } = req.files;
//     images.mv("../images/" + images.name, async (err) => {
//         if (err) {
//             res.status(500).json({
//                 message: err
//             })
//         }
//         else {
//             const createProposal = new Event({
//                 ...{ eventName, eventPlace, proposalType, eventType, eventClass, budget, fromDate, toDate, description, foodPreferences, events, images },
//                 images: images.name
//             });
//             try {
//                 const newProposal = await createProposal.save();
//                 res.status(201).json({
//                     message: "Proposal saved successfully",
//                     newProposal
//                 })

//             } catch (error) {
//                 res.status(500).json({
//                     message: "missing fields"
//                 })
//                 console.log(error)
//             }
//         }
//     })
//     res.send("hellooo")
// })
// router.get('../images/:filename', async(req,res)=>{
//     res.sendFile(path.join(__dirname, `../images/${req.params.filename}`))
// })

module.exports = router;