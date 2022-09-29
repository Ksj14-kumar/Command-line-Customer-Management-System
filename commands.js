#!/usr/bin/env node
const { Command } = require("commander");
const command = new Command()
const inquire = require("inquirer")
const { AddUser, findUser, deleteUser, AllCustomer, update } = require("./db")


const questions = [{
    name: "name",
    type: "input",
    message: "Enter your name:",
    // validate: (value) => {
    // }
},
{
    name: "lname",
    type: "input",
    message: "Enter your last name:",
    // validate: (value) => {
    //     return
    // }
},
{
    name: "age",
    type: "number",
    message: "Enter your age:",
},
{

    name: "gender",
    type: "checkbox",
    message: "choose your gender",
    choices: ["Male", "Female"],
    // validate: () => {
    // }
},
{
    name: "colors",
    type: "list",
    message: "choose your favoright color: ",
    // validate: (value) => {
    // },
    choices: ["red", "green", "yellow", "blue", "dark", "voilet", "orange"]
},
{
    name: "isMarried",
    type: "confirm",
    message: "Are you married ? ",
    default: false
},
{
    name: "email",
    type: "input",
    message: "Enter your email",
    // validate: () => {
    // }
},
{
    name: "password",
    type: "password",
    message: "Enter your password: ",
    // validate: (value) => {
    // }
},
]



command
    .name("Command line Customer management system")
    .description("Customer Management System")
    .version("1.0.0")
command
    .command("Add ")
    .description("add a new Customer")
    .alias("a")
    .action(() => {
        inquire.prompt(questions)
            .then((result) => {
                console.log({ result })
                AddUser(result)
            }).catch((err) => {
                console.log({ err })
            });
    })
command
    .command("Find <name>")
    .alias("f")
    .description("find a user by name")
    .action((name) => {
        findUser(name)
    })
command
    .command("Delete <_id>")
    .alias("d")
    .description("delete a user")
    .action(id => {
        deleteUser(id)
    })
command
    .command("list")
    .alias("l")
    .description("all customer list")
    .action(() => {
        AllCustomer()
    })

command
    .command("update <_id>")
    .alias("u")
    .description("update customer")
    .action((id) => {
        inquire.prompt(questions).then(d => {
            update(id, d)
        })
            .catch(err => {
                process.stdout.write(err)
            })
    })
command.parse(process.argv)