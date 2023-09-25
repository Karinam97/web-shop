import jwt from "jsonwebtoken"

export const auth = (req: any, res:any, next:any) => {
    const token = req.cookies.token

    if(!token) return res.redirect('/')

    jwt.verify(token, "super-secret-key", (err:any, user:any) => {
        if (err) return res.redirect('/')
        req.user = user
        next();
      })
}

