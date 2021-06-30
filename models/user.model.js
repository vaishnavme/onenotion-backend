const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: "Product name is required"
    },
    email: {
        type: String,
        unique: [true, "email address already in"],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please Enter valied Email"],
        required: "email adderess is required"
    },
    password: {
        type: String,
        minLength: [8, "Password is too short"],
        required: "password is required"
    }
})

const User = mongoose.model("User", userSchema);
  
module.exports = { User };