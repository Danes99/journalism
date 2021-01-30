// Import downloaded modules
const jwt = require('jsonwebtoken')

// Import database functions (CRUD) : user
const readJwtFromToken = require('../db/jwt/readJwtFromToken')
const deleteJwtExpired = require('../db/jwt/deleteJwtExpired')

const auth = async (req, res, next) => {
    try {
        
        // Delete expired JSON Web Tokens (JWT)
        deleteJwtExpired()

        // Verify validity of token
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        // Does token exist in database?
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