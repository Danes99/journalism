deleteJwt = async (token) => {
    try {
        const queryString = `DELETE FROM jwt WHERE token='${token}';`
        const result = await client.query(queryString)
        return { success: true, data: 'success' }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = deleteJwt