const { Router } = require("express");
const express = require("express")
const app = express();
const path = require('path');

module.exports = function(app){ 

    // Admin

    app.get("/admin", (req,res,next) => {
        res.render(path.join(__dirname, '../views/admin.html'))
        }
    )

    // Auth
    app.post("/auth/register", (req,res,next) => {
        const id = req.body.id
        const pw = req.body.pw
        console.log(id,pw)
    })


    app.post("/auth/login", (req,res,next) => {
        const id = req.body.id
        const pw = req.body.pw
        console.log(id,pw)
    })

}