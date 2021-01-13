readArticle = async id => {
    try {
        const queryString = `SELECT * FROM articles WHERE id=${id}`
        const result = await client.query(queryString)
        return { success: true, result: result.rows[0] }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = readArticle