// Import downloaded modules
const validator = require('validator')

const MINI_LENGTH_NAME = 2
// const MINI_LENGTH_PASSWORD = 2

const isUserValid = async (req, res, next) => {
    try {

        // Test name
        if (!req.body.name) return res.status(400).json({ error: "No name" })
        if (req.body.name.length < MINI_LENGTH_NAME) {
            return res.status(400).json({ error: `name.length must be > ${MINI_LENGTH_NAME}` })
        }

        // Test email
        if (!req.body.email) return res.status(400).json({ error: "No email" })
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ error: `${req.body.email} is not an email` })
        }

        // Test password
        if (!req.body.password) return res.status(400).json({ error: "No password" })
        if (!validator.isStrongPassword(req.body.password)) {
            return res.status(400).json({ error: `Password is not strong enough` })
        }

        // Middleware is over
        // Go to ext function
        next()
    }
    catch (error) {
        res.status(500).send(error)
    }
}
module.exports = isUserValid