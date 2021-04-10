const readUser = async (name, email) => {
    try {
        const queryString = `SELECT * FROM users WHERE email='${email}' OR name='${name}'`
        const result = await client.query(queryString)
        return { success: true, result: result.rows[0] }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = readUser