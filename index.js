const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer'); // for multer use the specified methods only, like in react...


const mongoose = require('mongoose')

const ML = require('./models/form_model.js');


mongoose.connect("mongodb+srv://main-PC:mymongodb.server@base.dmmx9.mongodb.net/Main?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


// FOR IMAGE UPLOADATION USING MULTER


// Setting The Storage Engine
const storage = multer.diskStorage({
    destination: './public/book_images/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // cd first argument is err -> seted to null
    }
})
// Check File Type -> Coppied from bradtraversy/nodeuploads
const checkFileType = (file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}


// init upload
const Upload = multer({
    storage: storage,
    limits: {fileSize: 10000000}, // 10 mb in bites (take in bites)
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
}).single('book_image') // single or multipple -> take filed name as parameter to upload/point given file



const hostname = '127.0.0.1';
const port = 80;

const server = express();
server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}/`);
})


server.use(express.urlencoded())

server.set('view engine', 'pug')



server.get("/", (req, res) => {
    // res.sendFile(__dirname + "/views/start.html")
    res.render("start.pug")
})

server.get("/upload", (req, res) => {
    res.render("start.pug")
})
server.post("/upload", (req, res) => {
    Upload(req, res, (err) => { // why only this format
        console.log(req.file); // only can access res.file inside Upload(inside multer component) cuz express has no way to handle images of that I know...

        const params = {
            dest: req.file.path
        }


        if (err) {
            res.render("info.pug", params)

        }else {
            res.render("info.pug", params)
        }
    })

})
server.post("/finalise", async (req, res) => {
    console.log(req.body);
    
    let a = fs.readFileSync(req.body.dest)
    let b = a.toString('base64')
    
    let Record = (disc) => {
        if (disc) {
            return {
                Client_Name: req.body.username,
                Book_Name: req.body.book_name,
                Price: req.body.price,
                Book_Image: b,
                Discription: disc,
                Name_at_Server: req.body.dest.slice(19, req.body.dest.length-1)
            }
        }else {
            return {
                Client_Name: req.body.username,
                Book_Name: req.body.book_name,
                Price: req.body.price,
                Book_Image: b,
                Name_at_Server: req.body.dest.slice(19, req.body.dest.length-1)
            }
        }
    }


    await ML.create(Record(req.body.disc))
    console.log("done");

    res.render("end.pug")

})