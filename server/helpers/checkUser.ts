import fs from 'fs'
import path from "path"
import { User } from '../types'

export const checkUser = (username:string) => {
    const users = getAllUsers()
    
    // Check if user exists
    return users.find((u:User) => u.username === username)
}

export const getAllUsers = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/users.json')).toString())
}
