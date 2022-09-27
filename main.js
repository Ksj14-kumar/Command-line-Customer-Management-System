// console.log("hello")
// const process = require('process');
// console.log(process.arch) // return the architechure of OS like win32,win64
// console.log(process.argv) // return an array which containes command line arguments
// console.log(process.argv0) // return node js interpreter path
// // console.log(process.config)
// process.debugPort = 9000
// console.log(process.connected) // rnpm i commandereturn boolean value process is connected or not
// console.log(process.debugPort) // retrun port number which is DebugPort of process
// // console.log(process.env) // return all the system variablle path
// console.log(process.execArgv) // return execArgs of commands line
// console.log(process.execPath) //absolutly path of node js interpreter
// console.log(process.exitCode) // return exit code not work on window, woork only POSIX Plateform
// console.log(process.features)
// console.log(process.getegid)
// console.log(process.geteuid)
// console.log(process.getgroups)
// console.log(process.getuid)
// console.log(process.hrtime)
// console.log(process.memoryUsage)
// console.log(process.pid)
// console.log(process.platform)
// console.log(process.ppid)
// console.log(process.release)
// console.log(process.report)
// console.log(process.traceDeprecation)
// console.log(process.stdout)
// console.log(process.title)
// console.log(process.version)
// console.log(process.stderr)
// console.log(process.setgroups)

const inquire = require("inquirer")

inquire.prompt([
    {
        name: "colors",
        type: "list",
        message: "what is your colors: ",
        choices: [{ name: "red" }, { name: "green" }, { name: "blue" }, { name: "yellow" }]
    },
    {
        name: "fruites",
        type: "rawlist",
        message: "choose a fruite you like it.",
        choices: ["apple", "orange", "banana", "licchi"]
    },
    {
        name: "Subjects",
        type: "expand",
        message: "Choose your college subjects",
        choices: [
            { name: "Physics", key: "P" },
            { name: "chemistry", key: "C" },
            { name: "Math", key: "M" }
        ]
    },
    {
        name: "password",
        type: "password",
        message: "Enter your password: ",
    },
    {
        name: "Gender",
        type: "checkbox",
        message: "Select your gender: ",
        choices: [
            "Male", "Female", "Transgender"
        ]
    },
    {
        name: "confirm",
        type: "confirm",
        message: "Are you 18+ ?",
        default: true
    },
    {
        name: "age",
        type: "number",
        message: "Enter your age: ",
        validate: async (input) => {
            const isValid = !isNaN(parseInt(input))
            return isValid || "Invalid value"
        }
    }
]).then((answer) => {
    console.log(answer)
}).catch((err) => {
    console.log({ err })

});