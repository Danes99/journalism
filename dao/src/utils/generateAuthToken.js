// Import downloaded modules
const jwt = require('jsonwebtoken')

generateAuthToken = async function (name) {
    const token = jwt.sign(
        { data: name.toString() },
        process.env.JWT_SECRET
    )

    return token
}

module.exports = generateAuthToken