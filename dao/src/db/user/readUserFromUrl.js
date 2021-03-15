readUserFromUrl = async url => {
    try {
        const queryString = `SELECT name, description, created_at, updated_at FROM users WHERE url='${url}'`
        const result = await client.query(queryString)
        return { success: true, data: result.rows[0] }
    }
    catch (error) {
        console.log(error)
        return { success: false, data: error }
    }
}

module.exports = readUserFromUrl