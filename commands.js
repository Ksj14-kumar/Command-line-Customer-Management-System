#!/usr/bin/env node
const { Command } = require("commander");
const command = new Command()
const inquire = require("inquirer")
const { AddUser, findUser, deleteUser, AllCustomer, update } = require("./db");


const isInt = (value) => {
    console.log(typeof value)
    console.log(value)
    const num = Number(value)
    return Number(num) === num && num % 1 === 0
}

const isAlbhaNumeric = (value) => {
    return /\d/.test(value)
}

const isEmail = (email) => {
    return /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i.test(email);
}

const isPassword = (value) => {
    return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
}

function password_generator(len) {
    var length = (len) ? (len) : (10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    var crunch = true;
    while (password.length < length) {
        entity1 = Math.ceil(string.length * Math.random() * Math.random());
        entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
        hold = string.charAt(entity1);
        hold = (password.length % 2 == 0) ? (hold.toUpperCase()) : (hold);
        character += hold;
        character += numeric.charAt(entity2);
        character += punctuation.charAt(entity3);
        password = character;
    }
    password = password.split('').sort(function () { return 0.5 - Math.random() }).join('');
    return password.substr(0, len);
}

const questions = [{
    name: "name",
    type: "input",
    message: "Enter your name:",
    validate: (input) => {
        if (!input) {
            return `please, fill this`
        }
        else if (isAlbhaNumeric(input)) {
            return "name can't contain a number"
        }
        return true
    }
},
{
    name: "lname",
    type: "input",
    message: "Enter your last name:",
    validate: (value) => {
        if (!value) {
            return "please, fill this"
        }
        else if (isAlbhaNumeric(value)) {
            return "last can't contain a number"
        }
        return true
    }
},
{
    name: "age",
    type: "input",
    message: "Enter your age:",
    validate: (input) => {
        if (!input) {
            return "please, fill this."
        }
        else if (!isInt(input)) {
            return "age must be an integer number"
        }
        else if (Number(input) >= 100 || Number(input) <= 2) {
            return "age must be between 2-100"
        }
        return true
    }
},
{
    name: "gender",
    type: "checkbox",
    message: "choose your gender",
    choices: ["Male", "Female"],


},
{
    name: "colors",
    type: "list",
    message: "choose your favoright color: ",
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
    validate: (input) => {
        if (!input) {
            return "please, fill this"
        }
        else if (!isEmail(input)) {
            return "invalid email"
        }
        return true;
    }
},
{
    name: "password",
    type: "password",
    message: "Enter your password: ",
    validate: (value) => {
        if (!value) {
            return "please, fill"
        }
        else if (!isPassword(value)) {
            return "invalid password, password must contains at least one special character, one albha character and one numberic and also greater than 8 digits"
        }
        return true;
    },
    default: () => {
        return password_generator();
    }
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
                AddUser(result)
            }).catch((err) => {
                console.log({ err })
                throw new Error(err)
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