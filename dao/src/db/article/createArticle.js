createArticle = async (user_id, title, content) => {
    try {
        const queryString = `INSERT INTO articles(user_id, title, content) VALUES (
            ${user_id}, '${title}', '${content}');`
        const result = await client.query(queryString)
        return { success: result.rowCount > 0, result: 'success' }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = createArticle