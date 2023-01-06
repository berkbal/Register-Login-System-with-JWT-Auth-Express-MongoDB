const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  pw: String
});

const User = mongoose.model("User", userSchema);