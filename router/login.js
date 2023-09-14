const express = require("express")
const path = require("path")
const fs = require('fs')
const jwt = require("jsonwebtoken")
const router = express.Router()

router.get("/login", (_, res) => {
  res.sendFile(path.join(__dirname, "../client/views/login.html"))
})

router.post("/login", (req, res) => {
  const { username, password } = req.body

  // TODO: move to helper function
  // Read users data from JSON file
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')))
  
  // Check if user exists
  const user = users.find(u => u.username === username)

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

module.exports = router