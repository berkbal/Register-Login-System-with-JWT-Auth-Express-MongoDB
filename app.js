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

// Routes
const adminRoute = require("./routes/adminRoute.js");
const router = express.Router();
require('./routes/adminRoute')(app);


app.get('/', (req,res,next) =>{
    res.render(path.join(__dirname, 'views/index.html'));
});

app.get('/hello-world', (req,res,next) => {
    exec("./script.sh", (error,stdout,stderr) => {
        console.log(stdout);
        next(res.render(path.join(__dirname, 'views/index.html')))
    })
})

app.post('/hello-world', (req,res,next) => {
    const input = req.body.input; // Burada bir degiskene almadan frontend'den gelen data ile islem yapilamiyor.
    console.log(input)
    next(res.render(path.join(__dirname, 'views/index.html')))
})

//app.use('/admin', adminRoute);
//router.get('/admin', adminRoute)

app.listen(port, ()=>{
    console.log(`Server is Running at: 7777`)
})