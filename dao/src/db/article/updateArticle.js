updateArticle = async (id, title, content) => {
    try {
        const queryString = `UPDATE articles SET 
            ${ title ? `title='${title}'` : '' } ${ title && content ? ',' : '' }
            ${ content ? `content='${content}'` : '' }
            WHERE id=${id}`

        const result = await client.query(queryString)
        return { success: result.rowCount === 1 }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = updateArticle