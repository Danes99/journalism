createJwt = async (user_id, token) => {
    try {
        const queryString = `INSERT INTO jwt(user_id, token) VALUES ('${user_id}', '${token}')`
        const result = await client.query(queryString)
        return { success: result.rowCount > 0, result: 'success' }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = createJwt