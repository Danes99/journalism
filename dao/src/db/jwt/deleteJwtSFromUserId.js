const deleteJwtS = async id => {
    try {
        const queryString = `DELETE FROM jwt WHERE user_id=${id}`
        const result = await client.query(queryString)
        return { success: true, data: result.rowCount }
    }
    catch (error) {
        console.log(error)
        return { success: false, data: error }
    }
}

module.exports = deleteJwtS