import { User } from "../types"
import path from "path"
import fs from 'fs'

export const checkUser = (username:string) => {
    const users = getAllUsers()
    
    // Check if user exists
    return users.find((u:User) => u.username === username)
}

export const getAllUsers = ():User[] => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/users.json')).toString())
}
