const express = require("express")
const path = require("path")
const fs = require("fs")
const auth = require("../middleware/auth")

const router = express.Router()

router.get("/user", auth, (req, res) => {
    fs.readFile('./data/users.json', (err, data) => {
      if(err) {
        console.log(err)
        return res.sendStatus('500')
      }
  
      const users = JSON.parse(data)
      const user = users.find(user => user.username === req.user.username)
  
      user ? res.json({ name: user.name}) : res.sendStatus(404)
    })
})

module.exports = router