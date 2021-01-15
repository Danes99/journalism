readUserFromUrl = async url => {
    try {
        const queryString = `SELECT name, url FROM users WHERE url='${url}'`
        const result = await client.query(queryString)
        return { success: true, result: result.rows[0] }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = readUserFromUrl