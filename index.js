const express = require ("express");
const bodyParser = require('body-parser');
const Event = require('./models/proposal')
const cors= require('cors');
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config();

const vendorsignup = require("./Routes/vendors/vendorAuth");
const usersignup = require("./Routes/users/userAuth");

const allProposals = require('./Routes/Proposal')

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const fileupload = require('express-fileupload');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL).then(()=>
    console.log("connected to mongodb")
).catch((err )=>{
    console.log(`${err}`)
})

app.use(cors());
app.use(express.json());
app.use(fileupload());

app.get('/', (req,res)=>{
    res.send("hello")
})

app.use(allProposals)
app.use(vendorsignup);
app.use(usersignup);

app.post("/createproposals", (req, res) => {
    const { eventName, eventPlace, proposalType, eventType, eventClass, budget, fromDate, toDate, description, foodPreferences, events } = req.body;
    console.log({ eventName, eventPlace, proposalType, eventType, eventClass, budget, fromDate, toDate, description, foodPreferences, events })
console.log(req.body, req.files)
console.log(req.files)
    const { images } = req.files;
    images.mv("./images/" + images.name, async (err) => {
        if (err) {
            res.status(500).json({
                message: err
            })
        }
        else {
            const createProposal = new Event({
                ...{ eventName, eventPlace, proposalType, eventType, eventClass, budget, fromDate, toDate, description, foodPreferences, events, images },
                images: images.name
            });
            try {
                const newProposal = await createProposal.save();
                res.status(201).json({
                    message: "Proposal saved successfully",
                    newProposal
                })
                console.log(newProposal)

            } catch (error) {
                res.status(500).json({
                    message: "missing fields"
                })
                console.log(error)
            }
        }
    })
})
app.get('../images/:filename', async(req,res)=>{
    res.sendFile(path.join(__dirname, `../images/${req.params.filename}`))
})

const PORT = 5000 || process.env.PORT
app.listen(PORT, () =>{
    console.log(`port is running at ${PORT}`)
})