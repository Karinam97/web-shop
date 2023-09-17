const path = require("path")
const fs = require('fs')

const checkUser = (username) => {
    const users = getAllUsers()
    
    // Check if user exists
    return users.find(u => u.username === username)
}

const getAllUsers = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/users.json')))
}

module.exports = {
    checkUser,
    getAllUsers,
}