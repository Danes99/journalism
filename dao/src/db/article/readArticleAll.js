readArticleAll = async id => {
    try {
        const queryString = `SELECT * FROM articles WHERE user_id=${id}`
        const result = await client.query(queryString)
        return { success: true, data: result.rows }
    }
    catch (error) {
        console.log(error)
        return { success: false, data: error }
    }
}

module.exports = readArticleAll