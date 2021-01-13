deleteArticle = async (id) => {
    try {
        const queryString = `DELETE FROM articles WHERE id=${id}`
        const result = await client.query(queryString)
        return { success: true, result: result.rowCount }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = deleteArticle