// Import downloaded modules
const jwt = require('jsonwebtoken')

// Import database functions (CRUD) : user
const readUserFromEmail = require('../db/user/readUserFromEmail')
const readJwtFromToken = require('../db/jwt/readJwtFromToken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const resultJwt = await readJwtFromToken(token)

        if (!resultJwt.success) throw new Error('No user')

        req.token = token
        req.user_id = resultJwt.result.user_id

        next()
    }
    catch (error) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth