import * as bodyParser from 'body-parser'
import cookie_parser from 'cookie-parser'
import express from "express"
import path from "path"
import accountRouter from "./router/account"

const app = express()

app.use(bodyParser.json(), cookie_parser())

const port = process.env.PORT || 3000

// Serve the static files from the public folder
app.use(express.static(path.join(__dirname, "../client/public/homepage.html")))

// Covers all account related routes e.g. /login, /registration
app.use("/account", accountRouter);


app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})

/**
 *  TODO:
 *    - use React instead of pure HTML, JS
 *    - setup grapqhl
 *    - replace json with mongoDB
 */