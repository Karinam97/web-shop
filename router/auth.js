const express = require("express")
const path = require("path")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/views/login.html"))
})

router.post("/login", (req, res) => {
  // Receiving data from client
  const { username, password } = req.body

  // Check if the username and password match the expected values
  if (username === "karina" && password === "123") {
    const user = { username: "karina", name: "Karina" }

    const token = jwt.sign(user, "super-secret-key", { expiresIn: "1m" })

    res.json({ token })
  } else {
    res.status(401).json({ error: "Invalid credentials" })
  }
})

module.exports = router