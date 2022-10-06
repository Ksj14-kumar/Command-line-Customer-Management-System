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
const CollectionName = process.env.NODE_ENV === "dev" ? "CMS_DEV" : "CMS-prod"
module.exports = new mongoose.model(CollectionName, Schema)
