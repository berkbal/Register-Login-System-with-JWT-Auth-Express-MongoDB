const mongoose = require("mongoose");

const userSchema({
    id: {
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

const User = mongoose.model('user', userSchema);
