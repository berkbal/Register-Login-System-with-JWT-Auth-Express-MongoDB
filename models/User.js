const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        lowercase: true
    },

    pw: {
        type: String,
        required: true,
        minlenght: 6
    }
})

// Hooks

userSchema.post("save", function(doc, next) { // Fire a function after save function
    console.log("new user was created and saved.", doc);

    next();
})

userSchema.pre("save", function(next) { // Fire a function before save function
    console.log('user about to be created and saved.', this)
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;