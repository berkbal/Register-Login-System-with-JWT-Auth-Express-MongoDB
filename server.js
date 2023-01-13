// Server
const express = require("express");
const app = express();
const port = process.env.PORT || 7777;
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const {requireAuthJwt} = require("./middleware/authMiddleware.js");

// Child Process
const { stderr } = require("process");
var exec = require('child_process').exec;

// Middlewares
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);
app.use(express.static('public')) // External JS Favicon vs bu dizinden frontende gider
app.use(cookieParser());

// Frontend'den Gelen Datayi Okunur Hale Getirmek
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json());


// MongoDB

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const dbURI = 'mongodb://localhost:27017/admin-ui';
mongoose.connect(dbURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
});

// Routes
const authRoute = require("./routes/authRoutes.js");
//const { requireAuthJwt } = require("./middleware/authMiddleware.js");

app.get("/", (req,res,next) => {
    res.render("home")
})

app.get("/admin", requireAuthJwt, (req,res) => {
    res.render("admin");
})

app.use(authRoute);

// cookies

app.listen(port, () => {
    console.log("App is running at port: " +port)
})