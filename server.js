// Server
const express = require("express");
const app = express();
const port = process.env.PORT || 7777;
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

// Middlewares
app.set('view engine', 'ejs');
app.use(express.static('public')) // External JS Favicon vs bu dizinden frontende gider
app.use(cookieParser());

// Frontend'den Gelen Datayi Okunur Hale Getirmek
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json());

// Routes
const authRoute = require("./routes/authRoutes.js");

// MongoDB

const mongoose = require("mongoose");
const { JsonWebTokenError } = require("jsonwebtoken");

mongoose.set('strictQuery', true);
const dbURI = 'mongodb://localhost:27017/admin-ui';
mongoose.connect(dbURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
});

//routes

app.get('*', checkUser);
app.get("/", (req,res) => res.render("home"));
app.get("/admin", requireAuth, (req,res) => res.render("admin"));
app.use(authRoute);

app.listen(port, () => {
    console.log("App is running at port: ", port)
})