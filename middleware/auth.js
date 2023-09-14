const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.cookies.token

    if(!token) return res.redirect('/')

    jwt.verify(token, "super-secret-key", (err, user) => {
        if (err) return res.redirect('/')
        req.user = user
        next();
      })
}

module.exports = auth