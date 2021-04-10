const readArticle = async (search) => {
    try {
        const queryString = `SELECT * FROM articles WHERE 
            content LIKE '%${search}%' OR 
            title LIKE '%${search}%';`
        
        const result = await client.query(queryString)
        return { success: true, result: result.rows }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = readArticle