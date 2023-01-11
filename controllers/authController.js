const User = require("../models/User.js")

module.exports.register_get = (req,res,next) => {
    res.render("register")
}

module.exports.register_post = async (req,res,next) => {
    const { userId, pw } = req.body
    console.log(userId, pw)

    try {
        const user = await User.create({userId, pw});
        res.status(201).json(user)
    }
    catch(err) {
        console.log(err)
    }

}

module.exports.login_get = (req,res,next) => {
    res.render("login")
}

module.exports.login_post = async (req,res,next) => {
    const { userId, pw } = req.body
    console.log(userId, pw)

}