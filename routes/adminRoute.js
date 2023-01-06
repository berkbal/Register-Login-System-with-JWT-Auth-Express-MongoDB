const express = require("express")
const app = express();
const path = require('path');

module.exports = function(app){ 

    app.get("/admin", (req,res,next) => {
        res.render(path.join(__dirname, '../views/admin.html'))
})

}