const readArticle = async number => {
    try {
        const queryString = `SELECT * FROM articles ORDER BY created_at DESC LIMIT ${number}`
        const result = await client.query(queryString)
        return { success: true, data: result.rows }
    }
    catch (error) {
        console.log(error)
        return { success: false, data: error }
    }
}

module.exports = readArticle