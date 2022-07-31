const express = require('express');
const path = require('path');

const cors = require('cors');


// Mongoose Setup
const mongoose = require('mongoose')

const ML = require('./models/form_model.js');

mongoose.connect("mongodb+srv://main-PC:mymongodb.server@base.dmmx9.mongodb.net/Main?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// Mongoose Setup


const port = 5000;

const server = express();

// server.use(express.urlencoded())

server.use(cors())

server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({limit: '50mb'}));

server.listen(port, () =>{
    console.log(`Server running at ${port}/`);
})


server.get("/", (req, res) => {
    server.use(express.static(path.resolve(__dirname,'client','build')))
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})

server.post("/finalise", async (req, res) => {
    console.log(req.body);
    
    let Record = (disc) => {
        if (disc) {
            return {
                Client_Name: req.body.username,
                Book_Name: req.body.book_name,
                Price: req.body.price,
                Book_Image: req.body.img.slice(23, req.body.img.length), // "removed data:image/jpeg;base64," from start...
                Discription: disc,
            }
        }else {
            return {
                Client_Name: req.body.username,
                Book_Name: req.body.book_name,
                Price: req.body.price,
                Book_Image: req.body.img.slice(23, req.body.img.length),
            }
        }
    }

    console.log(Record);

    try {
        await ML.create(Record(req.body.disc))
    } catch (error) {
        res.send("ERROR")
    }

    res.send("DONE")
})