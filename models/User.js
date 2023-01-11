const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

userSchema.pre("save", async function(next) { // Fire a function before save function
    const salt = await bcrypt.genSalt();
    this.pw = await bcrypt.hash(this.pw, salt)

    next();
})

userSchema.post("save", function(doc, next) { // Fire a function after save function
    console.log("new user was created and saved.", doc);

    next();
})



const User = mongoose.model('user', userSchema);

module.exports = User;