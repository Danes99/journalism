// Import downloaded modules
const jwt = require('jsonwebtoken')

// Import database functions (CRUD) : user
const readUserFromEmail = require('../db/user/readUserFromEmail')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const result = await readUserFromEmail(decode.data)

        if (!result.success) throw new Error('No user')

        req.token = token
        req.user = result.result

        next()
    }
    catch (error) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth