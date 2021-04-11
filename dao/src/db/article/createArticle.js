const createArticle = async (user_id, title, content, is_completed) => {
    try {
        const queryString = `INSERT INTO articles(user_id, title, content${ is_completed ? ', is_completed' : '' }) VALUES (
            ${user_id}, '${title}', '${content}'${ is_completed ? ', true' : '' });`

        const result = await client.query(queryString)

        return { success: result.rowCount > 0, data: 'success' }
    }
    catch (error) {
        return { success: false, data: error }
    }
}

module.exports = createArticle