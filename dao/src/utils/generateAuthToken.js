// Import downloaded modules
const jwt = require('jsonwebtoken')

generateAuthToken = async data => (
    jwt.sign(
        { data },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
    )
)

module.exports = generateAuthToken