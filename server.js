const express = require("express")
const accountRouter = require("./router/account");
const bodyParser = require("body-parser")
const path = require("path")

const cookie_parser=require('cookie-parser')

const app = express()

app.use(bodyParser.json(), cookie_parser())

const port = process.env.PORT || 3000

// Serve the static files from the public folder
app.use(express.static(path.join(__dirname, "client/public")))

// Covers all account related routes e.g. /login, /registration
app.use("/account", accountRouter);


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