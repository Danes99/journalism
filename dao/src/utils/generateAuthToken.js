// Import downloaded modules
const jwt = require('jsonwebtoken')

generateAuthToken = async data => (
    jwt.sign(
        { data },
        process.env.JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    )
)

module.exports = generateAuthToken