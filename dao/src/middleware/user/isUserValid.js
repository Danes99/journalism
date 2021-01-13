// Import downloaded modules
const validator = require('validator')

const MINI_LENGTH_NAME = 2
// const MINI_LENGTH_PASSWORD = 2

const isUserValid = async (req, res, next) => {
    try {
        // Retrieve tested values
        const name = req.body.name
        const password = req.body.password

        // Test name
        if (!name) return res.status(400).json({ error: "No name" })
        if (name.length < MINI_LENGTH_NAME) {
            return res.status(400).json({ error: `name.length must be > ${MINI_LENGTH_NAME}` })
        }
        // Test password
        // if (!password) return res.status(400).json({ error: "No password" })
        // if ((password.length < MINI_LENGTH_PASSWORD)) {
        //     return res.status(400).json({ error: `password.length must be > ${MINI_LENGTH_PASSWORD}` })
        // }

        // Middleware is over
        // Go to ext function
        next()
    }
    catch (error) {
        res.status(500).send(error)
    }
}
module.exports = isUserValid