const updateArticle = async (id, title, content, is_completed) => {
    try {

        // SQL query string
        const queryString = `${ typeof title !== 'undefined' ? `UPDATE articles SET title='${title}' WHERE id=${id};` : '' } 
            ${ typeof content !== 'undefined' ? `UPDATE articles SET content='${content}' WHERE id=${id};` : '' }
            ${ typeof is_completed !== 'undefined' ? `UPDATE articles SET is_completed=${is_completed} WHERE id=${id};` : '' }`

        // SQL query result
        const result = await client.query(queryString)

        // Is SQL query successful?
        const success = result.length ? 
            result.every( element => element.rowCount === 1 )
            :
            result.rowCount === 1

        return { success }
    }
    catch (error) {
        console.log(error)
        return { success: false, data: error }
    }
}

module.exports = updateArticle