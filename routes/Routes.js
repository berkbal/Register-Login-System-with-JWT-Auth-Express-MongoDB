const { Router } = require("express");
const express = require("express")
const app = express();
const path = require('path');

const mongoose = require("mongoose");

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
        console.log(id,pw)
    })

}