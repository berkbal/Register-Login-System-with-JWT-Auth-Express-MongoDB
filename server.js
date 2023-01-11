// Server
const express = require("express");
const app = express();
const port = process.env.PORT || 7777;
const bodyParser = require('body-parser');

// Frontend'den Gelen Datayi Okunur Hale Getirmek
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json());

// Child Process
const { stderr } = require("process");
var exec = require('child_process').exec;

// EJS
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);
app.use(express.static('public')) // External JS Favicon vs bu dizinden frontende gider

// MongoDB

const mongoose = require("mongoose");

const dbURI = 'mongodb://localhost:27017/admin-ui';
mongoose.connect(dbURI);

// Routes
const authRoute = require("./routes/authRoutes.js")
app.use(authRoute)

app.get("/", (req,res,next) => {
    res.render("home")
})

app.listen(port, () => {
    console.log("App is running at port: " +port)
})