const User = require("./db")
const mongoose = require("mongoose")
const MongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/CLI"
const createUsers = require("./User")


jest.setTimeout(20000)
let UserList = []

let db;
beforeAll(() => {
    mongoose.connect(MongoURI, (err, connect) => {
        if (err) throw new Error(err)
        db = connect
    })
    for (var i = 0; i < 3; i++) {
        UserList.push(createUsers.users(i))
    }
})

test('add user', async () => {
    for (var i = 0; i < UserList.length; ++i) {
        const res = await User.AddUser(UserList[i])
        expect(res).toMatch(/A user Successfull added/)
    }
})
test("get user", async () => {
    for (var i = 0; i < UserList.length; ++i) {
        const res = await User.findUser(UserList[i].name)
        expect(res).toMatch(/success/)
    }
})


test("delete a user", async () => {
    for (var i = 0; i < UserList.length; ++i) {
        const res = await User.deleteUser(UserList[i].email)
        expect(res).toMatch(/A user successfull delete/)
    }
})
