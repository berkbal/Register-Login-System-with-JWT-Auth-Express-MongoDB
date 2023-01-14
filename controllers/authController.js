const User = require("../models/User.js")

// error handlers

const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { userId: '', password: ''}

    // Duplicate Error code

    if (err.code === 11000){
        errors.userId = "This user is already registered."
        return errors;
    }

    // Validation Errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors;
}


const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
    return jwt.sign({id}, 'TOP SECRET', {
        expiresIn: maxAge
    }); // jwt secret. It should never published 
}

module.exports.register_get = (req,res,next) => {
    res.render("register")
}

module.exports.register_post = async (req,res,next) => {
    const { userId, pw } = req.body

    try {
        const user = await User.create({userId, pw});
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(400).json({ user: user._id});
    }

    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json(errors)
    }

}

module.exports.login_get = (req,res,next) => {
    res.render("login")
}

module.exports.login_post = async (req,res,next) => {
    const {userId, pw} = req.body;

    try {
        const user = await User.login(userId,pw)
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id})
    }
    catch {
        res.status(400).json({});
    }
}