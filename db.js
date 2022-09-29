const User = require("./Model")
require("dotenv").config()
const mongoose = require("mongoose");
const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/CLI"
mongoose.connect(URI, (err) => {
    if (err) throw new Error(err)
})
module.exports.AddUser = async (value) => {
    try {
        const userInfo = { ...value, gender: value.gender[0] }
        const res = await new User(userInfo)
        await res.save()
        console.info("A user Successfull added")
        process.exit()
    } catch (err) {
        console.warn(err)
        throw new Error(err)
    }
}

module.exports.findUser = async (value) => {
    try {
        const res = await User.find({
            $or: [
                { name: value.toLowerCase() },
            ]
        })
        console.info(res)
        process.exit()
    } catch (err) {
        console.warn(err)
        throw new Error(err)

    }
}

module.exports.deleteUser = async (value) => {
    try {
        await User.findOneAndDelete({ _id: value })
        console.info("A user successfull delete")
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