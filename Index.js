const mongoose = require('mongoose')
const express = require('express')

const app = express();
const PORT = 5000;
app.use(express.json())

app.get('/',(req,res)=>{
    console.log(req);
    res.send("End Point work Successfully")
})

// mongodb connectivity
// mongodb+srv://Abhishek:abhi0023@cluster0.nxevonu.mongodb.net/assignment

mongoose.connect('mongodb+srv://Abhishek:abhi0023@cluster0.nxevonu.mongodb.net/assignment',(err,res)=>{
    if(!err){
        console.log(res);
        console.log("Connected to Mongo Successfully")
    }
})

const schema = new mongoose.Schema({
    items:Array
})

const model = new mongoose.model('first',schema);

app.post('/',(req,res)=>{
    if(req.body.searchkey){
        console.log(req.body.searchkey)
        res.send("Request Work")

    }
})

app.listen(PORT,(er,res)=>{
    console.log("Listening on port"+ PORT);
})


