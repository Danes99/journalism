const readArticle = async id => {
    try {
        const queryString = `SELECT * FROM articles WHERE id=${id}`
        const result = await client.query(queryString)
        return { success: true, data: result.rows[0] }
    }
    catch (error) {
        console.log(error)
        return { success: false, data: error }
    }
}

module.exports = readArticle