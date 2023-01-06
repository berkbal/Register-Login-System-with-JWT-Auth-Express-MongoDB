const { Router } = require("express");
const express = require("express")
const app = express();
const path = require('path');

const mongoose = require("mongoose");

// EJS
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public')) // External JS Favicon vs bu dizinden frontende gider

// Child Process
const { stderr } = require("process");
var exec = require('child_process').exec;


module.exports = function(app){ 

        const userSchema = {
            id: String,
            pw: String
        }

        const User = mongoose.model("User", userSchema);

 
    // Admin

    app.get("/admin", (req,res,next) => {
        res.render(path.join(__dirname, '../views/admin.html'))
        }
    )

    // Auth
    app.post("/auth/register", (req,res,next) => {
        const newUser = new User({
            id: req.body.id,
            pw: req.body.pw
        })

        newUser.save()
   })


    app.post("/auth/login", (req,res,next) => {
        const id = req.body.id
        const pw = req.body.pw

        User.findOne({id, pw})
        .then((data)=> {
            if (!data){
                console.log("Incorrect id or password")
            }else{
                // Correct
                res.render(path.join(__dirname, '../views/admin.html'))
            }

        })
        .catch((err) => {
            console.log(err);
        })

    })

app.post('/hello-world', (req,res,next) => {
    const input = req.body.input; // Burada bir degiskene almadan frontend'den gelen data ile islem yapilamiyor.
    console.log(input)
    next(res.render(path.join(__dirname, '../views/admin.html')))
})

}