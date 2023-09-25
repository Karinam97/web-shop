import bcrypt from "bcryptjs"
import express, { Request, Response } from "express"
import fs from 'fs'
import jwt from "jsonwebtoken"
import path from "path"
import { checkUser, getAllUsers } from "../helpers/checkUser"
import { encryptPassword } from "../helpers/passwordHashing"
import { auth } from "../middleware/auth"
import { User } from "../types"

const router = express.Router()
type Req = Request<{},{},User>

// LOGIN
router.get("/login", (_, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/login.html"))
})

router.post("/login", async (req: Req, res:Response) => {
  const { username, password } = req.body
  
    const user = checkUser(username)

    if(user){
      // Verify the entered password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password)

      // Check if entered password matches the one in database
      if(passwordMatch){
        const token = jwt.sign(user, "super-secret-key", { expiresIn: "1m" })
        res.cookie("token", token, {httpOnly: true, secure: false, sameSite: 'strict'})
        res.status(200).json({ success: true, message: "Login successful" })
      } else {
        res.status(401).json({ success: false, error: "Invalid password" })
      }
    } else {
        res.status(401).json({ success: false, error: "User not found" })
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
  
router.post("/register", async (req: Req, res:Response) => {
const { username, fullName, email, password } = req.body

const user = checkUser(username)

if( user ) {
    res.status(409).json({ success: false, error: "This username already taken. Try another one" })
} else {

    const hashedPassword = await encryptPassword(password)  
  
    const newUser = {
    username,
    fullName,
    email,
    password:hashedPassword
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

router.get("/user", auth, (req:Req, res:Response) => {
  const users = getAllUsers()
  const user = users.find((user:User) => user.fullName === req.body.fullName)
  user ? res.json({ fullName: user.fullName}) : res.sendStatus(404)
})

// AUTHENTICATE USER
router.get("/isAuthenticated", (req: Request, res:Response) => {
    const token = req.cookies.token
  
    if (!token) return res.json({ isAuthenticated: false })
  
    jwt.verify(token, "super-secret-key", (err:any) => {
        if (err) return res.json({ isAuthenticated: false })
        return res.json({ isAuthenticated: true })
    })
  })
  
export default router