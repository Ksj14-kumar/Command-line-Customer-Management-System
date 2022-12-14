const User = require("./Model")
require("dotenv").config()
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/CLI"
mongoose.connect(URI, (err) => {
    if (err) throw new Error(err)
})
module.exports.AddUser = async (value) => {
    try {
        const userInfo = {
            ...value, gender: value.gender[0],
            password: await bcrypt.hash(value.password, 16)
        }
        const res = await new User(userInfo)
        await res.save()
        console.info("A user Successfull added")
        return "A user Successfull added"
        // process.exit()
    } catch (err) {
        console.warn(err)
        throw new Error(err)
    }
}
module.exports.findUser = async (value) => {
    try {
        const res = await User.findOne({
            name: value.toLowerCase(),
        })
        console.log({ res })
        return "success";
        process.exit()
    } catch (err) {
        console.warn(err)
        throw new Error(err)
    }
}
module.exports.deleteUser = async (value) => {
    try {
        await User.findOneAndDelete({ email: value })
        console.info("A user successfull delete")
        return "A user successfull delete"
        process.exit()
    } catch (err) {
        console.warn(err)
        throw new Error(err)
    }
}
module.exports.update = async (_id, value) => {
    try {
        const data = { ...value, gender: value.gender[0] }
        await User.findOneAndUpdate({ _id }, data)
        console.info("A user successfull update")
        process.exit()
    } catch (err) {
        console.warn(err)
        throw new Error(err)
    }
}
module.exports.AllCustomer = async () => {
    try {
        const res = await User.find()
        process.stdout.write(`${res}`)
        process.exit()
    } catch (err) {
        console.warn(err)
        throw new Error(err)
    }
}