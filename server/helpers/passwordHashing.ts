import bcrypt from "bcryptjs"

export const encryptPassword = async (password: string) => {
    // Hash the password before storing it
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)  
}
