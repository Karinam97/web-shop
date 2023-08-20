const express = require("express")
const bodyParser = require("body-parser")
const auth = require("./router/auth")
const path = require("path")
const app = express()

app.use(bodyParser.json())

const port = process.env.PORT || 3000

// Serve the static files from the public folder
app.use(express.static(path.join(__dirname, "client/public")))

// Endpoints for login
app.use(auth)

// Serve the account page
app.get("/account", (req, res) => {
  res.sendFile(path.join(__dirname, "client/views/account.html"))
})

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})
