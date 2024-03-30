const JWT = require("jsonwebtoken")
const SECRETE_KEY = require("../Globle")

const Middlewares = {
    AUTH_MIDDLEWARE: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const isUserLogin = JWT.verify(token, SECRETE_KEY)
            if (isUserLogin._doc) {
                next()
            }

        } catch (error) {
            res.json({
                message: "Login first"
            })

        }
    }
}

module.exports = Middlewares