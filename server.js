const express = require("express")
const bodyParser = require("body-parser")
const login = require("./router/login")
const register = require("./router/register")
const user = require("./router/user")
const auth = require("./middleware/auth")
const path = require("path")
const jwt = require("jsonwebtoken")

const cookie_parser=require('cookie-parser')

const app = express()

app.use(bodyParser.json(), cookie_parser())

const port = process.env.PORT || 3000

// Serve the static files from the public folder
app.use(express.static(path.join(__dirname, "client/public")))

// Endpoints for login
app.use(login)

// Endpoints for registration
app.use(register)

// Serve the account page
app.get("/account", auth, (_, res) => {
    res.sendFile(path.join(__dirname, "client/views/account.html"))
})

app.use(user)

/**
 *  TODO: 
 *    - create one main route /account and store all other routes related to account 
 *      e.g. /login , /register , /user ( ?overview? )
 *           /account/login , /account/register
 */

app.get("/isAuthenticated", (req, res) => {
  const token = req.cookies.token

  if (!token) return res.json({ isAuthenticated: false })

  jwt.verify(token, "super-secret-key", (err, user) => {
      if (err) return res.json({ isAuthenticated: false })
      return res.json({ isAuthenticated: true })
  })
})


app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})


/**
 *  TODO:
 *    - encrypt password ( e.g. use bcryptjs )
 *    - convert application from JS to TS ( setup webpack first before converting to TS )
 *    - replace json with mongoDB
 *    - use React instead of pure HTML, JS
 */