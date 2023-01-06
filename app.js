// Server
const express = require("express");
const app = express();
const port = process.env.PORT || 7777;
const path = require('path');
const bodyParser = require('body-parser');

// Frontend'den Gelen Datayi Okunur Hale Getirmek
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());

// Child Process
const { stderr } = require("process");
const { Router } = require("express");
var exec = require('child_process').exec;

// EJS
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public')) // External JS Favicon vs bu dizinden frontende gider

// MongoDB

const mongoose = require("mongoose");
const dbURI = "mongodb://root:example@127.0.0.1:27017/user";
mongoose.set("strictQuery", false);
mongoose.connect(dbURI, () => {
    console.log("Mongoose Connected!")
})

// Routes
const adminRoute = require("./routes/Routes.js");

const router = express.Router();
require('./routes/Routes')(app);

app.get('/', (req,res,next) =>{
    res.render(path.join(__dirname, 'views/index.html'));
});

app.get('/register', (req,res,next) => {
    res.render(path.join(__dirname, 'views/register.html'))
})
//app.get('/hello-world', (req,res,next) => {
//    exec("./script.sh", (error,stdout,stderr) => {
//        console.log(stdout);
//        next(res.render(path.join(__dirname, 'views/index.html')))
//    })
//})

//app.post('/hello-world', (req,res,next) => {
//    const input = req.body.input; // Burada bir degiskene almadan frontend'den gelen data ile islem yapilamiyor.
//    console.log(input)
//    next(res.render(path.join(__dirname, 'views/index.html')))
//})
app.listen(port, ()=>{
    console.log(`Server is Running at: 7777`)
})