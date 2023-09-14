const express = require("express")
const path = require("path")
const fs = require('fs')
const jwt = require("jsonwebtoken")
const router = express.Router()

router.get("/register", (_, res) => {
  res.sendFile(path.join(__dirname, "../client/views/registration.html"))
})

router.post("/register", (req, res) => {
  const { username, fullName, email, password } = req.body
  
   // TODO: move to helper function
   // Read users data from JSON file
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')))
  
  // Check if user already exists
  const user = users.find(u => u.username === username)

  if( user ) {
    // 409 - conflict in current state OR better 422 or 403? TODO
    res.status(409).json({ success: false, error: "This username already taken. Try another one" })
  } else {
    // if user doesn't exist add user details to existing users.json file
    const newUser = {
      username,
      fullName,
      email,
      password // TODO need password encryption 
    }
    users.push(newUser)
    // Write the updated user data back to the JSON file
    fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2))

    // store token for new user so after successful registration can stay logged in
    const token = jwt.sign(newUser, "super-secret-key", { expiresIn: "1m" })
    res.cookie("token", token, {httpOnly: true, secure: false, sameSite: 'strict'})

    res.status(201).json({ success: true, message: "Registration successful" })
  }
})

module.exports = router
