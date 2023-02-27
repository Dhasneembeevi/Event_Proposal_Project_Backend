const express=require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("hello")
})

app.listen(5000, () =>{
    console.log("port is running at 5000")
})