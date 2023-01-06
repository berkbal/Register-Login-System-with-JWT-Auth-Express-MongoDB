const express = require("express")
const app = express();
const router = express.Router();
const path = require('path');

// EJS
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public')) // External JS Favicon vs bu dizinden frontende gider
module.exports = function(app){
    
    app.get("/admin", (req,res,next) => {
        res.render(path.join(__dirname, '../views/admin.html'));
    })
}