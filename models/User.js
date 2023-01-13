const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please enter an id."],
        unique: true,
    },

    pw: {
        type: String,
        required: [true, "Please enter a password."],
        minlenght: [6, "Minimum password length is 6 characters."]
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

// static method to login user

userSchema.statics.login = async function(userId, pw){
    const user = await this.findOne({userId});

    if (user){
        const auth = await bcrypt.compare(pw, user.pw); // databasedeki pw value'su ile kullanicinin girdigini karsilastirma
        if (auth){
            return user;
            
        }
        throw Error("Incorrect Password");
    }
        throw Error('incorrect id');
}

const User = mongoose.model('user', userSchema);

module.exports = User;