// Import downloaded modules
const validator = require('validator')

// Import database functions (CRUD) : user
const readUserFromEmailOrName = require('../../db/user/readUserFromEmailOrName')

// Constants
const MINI_LENGTH_NAME = 2

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

        // Is Email or name already used?
        const resultTest = await readUserFromEmailOrName(
            req.body.name,
            req.body.email
        )

        if (resultTest.success) {
            if (resultTest.result) {
                if (resultTest.result.name === req.body.name) {
                    return res.status(400).send(`'${req.body.name}' already used`)
                } else {
                    return res.status(400).send(`'${req.body.email}' already used`)
                }
            }
        } else {
            return res.status(500).send(resultTest.result)
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