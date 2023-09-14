const path = require("path")
const fs = require('fs')

const checkUser = (username) => {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')))
    
    // Check if user exists
    return users.find(u => u.username === username)
}

module.exports = checkUser