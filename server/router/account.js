const express = require("express")
const path = require("path")
const fs = require('fs')
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const {checkUser, getAllUsers} = require("../helpers/checkUser")

const router = express.Router()

// LOGIN
router.get("/login", (_, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/login.html"))
})

router.post("/login", (req, res) => {
    const { username, password } = req.body
  
    const user = checkUser(username)
    
    // Check if entered password matches the one in database
    if(user && password === user.password){
      const token = jwt.sign(user, "super-secret-key", { expiresIn: "1m" })
      res.cookie("token", token, {httpOnly: true, secure: false, sameSite: 'strict'})
      res.status(200).json({ success: true, message: "Login successful" })
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" })
    }
})

router.post("/logout", (_, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: "Logout successful" })
  })

// REGISTER
router.get("/register", (_, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/registration.html"))
  })
  
router.post("/register", (req, res) => {
const { username, fullName, email, password } = req.body

const user = checkUser(username)

if( user ) {
    res.status(409).json({ success: false, error: "This username already taken. Try another one" })
} else {
    // if user doesn't exist add user details to existing users.json file
    const newUser = {
    username,
    fullName,
    email,
    password // TODO need password encryption 
    }
    const users = getAllUsers()
    users.push(newUser)
    // Write the updated user data back to the JSON file
    fs.writeFileSync(path.join(__dirname, '../../data/users.json'), JSON.stringify(users, null, 2))

    // store token for new user so after successful registration can stay logged in
    const token = jwt.sign(newUser, "super-secret-key", { expiresIn: "1m" })
    res.cookie("token", token, {httpOnly: true, secure: false, sameSite: 'strict'})

    res.status(201).json({ success: true, message: "Registration successful" })
}
})

// ACCOUNT OVERVIEW

router.get("/overview", auth, (_, res) => {
    res.sendFile(path.join(__dirname, "/../../client/views/account.html"))
})

// GET USER DETAILS

router.get("/user", auth, (req, res) => {
  const usersFilePath = path.join(__dirname, '../../data/users.json')
    fs.readFile(usersFilePath, (err, data) => {
      if(err) {
        console.log(err)
        return res.sendStatus('500')
      }
      const users = JSON.parse(data)
      const user = users.find(user => user.fullName === req.user.fullName)
  
      user ? res.json({ fullName: user.fullName}) : res.sendStatus(404)
    })
})

// AUTHENTICATE USER
router.get("/isAuthenticated", (req, res) => {
    const token = req.cookies.token
  
    if (!token) return res.json({ isAuthenticated: false })
  
    jwt.verify(token, "super-secret-key", (err, user) => {
        if (err) return res.json({ isAuthenticated: false })
        return res.json({ isAuthenticated: true })
    })
  })
  
module.exports = router