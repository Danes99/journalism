const readUser = async id => {
    try {
        const queryString = `SELECT name, url, created_at FROM users WHERE id=${id}`
        const result = await client.query(queryString)
        return { success: true, data: result.rows[0] }
    }
    catch (error) {
        console.log(error)
        return { success: false, data: error }
    }
}

module.exports = readUser