const deleteUser = async id => {
    try {
        const queryString = `DELETE FROM jwt WHERE user_id=${id}; DELETE FROM users WHERE id=${id}`
        const result = await client.query(queryString)
        return { success: true, result: result.rowCount }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = deleteUser