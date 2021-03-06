const readArticle = async (search) => {
    try {
        const queryString = `SELECT * FROM articles WHERE 
            content LIKE '%${search}%' OR 
            title LIKE '%${search}%';`
        
        const result = await client.query(queryString)
        return { success: true, data: result.rows }
    }
    catch (error) {
        console.log(error)
        return { success: false, data: error }
    }
}

module.exports = readArticle