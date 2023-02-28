const express = require ("express");
const app = express();
const dotenv = require("dotenv");
// const userRoute = require("./routes/user");
// const authRoute = require("./routes/auth")
dotenv.config();
const mongoose = require("mongoose");
const allProposals = require('./Routes/Proposal')
mongoose.set('strictQuery', false);
app.use(express.json());

const PORT = 5000 || process.env.PORT

mongoose.connect(process.env.MONGO_URL).then(()=>
    console.log("connected to mongodb")
).catch((err )=>{
    console.log(`${err}`)
})

app.get('/', (req,res)=>{
    res.send("hello")
})

app.use('/api', allProposals)

app.listen(PORT, () =>{
    console.log(`port is running at ${PORT}`)
})