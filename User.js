module.exports.users = (i) => {
    return {
        "name": "CMS_NAME" + i,
        "lname": "CMS_LAST_NAME" + i,
        "age": 0,
        "gender": [
            "Male",
            "Female"
        ],
        "colors": "red",
        "isMarried": false,
        "email": `abc${1 + i * 4 % 5}@gmail.com`,
        "password": `abc${i * 12 / 85}@/${i * i ** 2}`
    }
}

