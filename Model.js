const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
    name: String,
    lname: String,
    age: Number,
    gender: String,
    password: String,
    colors: String,
    isMarried: Boolean,
    email: String,
    password: String
})

module.exports = new mongoose.model("CLI", Schema)
