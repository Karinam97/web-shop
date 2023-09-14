const express = require("express")
const fs = require("fs")
const auth = require("../middleware/auth")

const router = express.Router()

router.get("/user", auth, (req, res) => {
    fs.readFile('./data/users.json', (err, data) => {
      if(err) {
        console.log(err)
        return res.sendStatus('500')
      }
     // TODO: move to helper function
      const users = JSON.parse(data)
      const user = users.find(user => user.fullName === req.user.fullName)
  
      user ? res.json({ fullName: user.fullName}) : res.sendStatus(404)
    })
})

module.exports = router