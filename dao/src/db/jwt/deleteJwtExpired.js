deleteJwtExpired = async () => {
    try {
        const queryString = `DELETE from jwt WHERE expired_at < NOW() AT TIME ZONE 'UTC-1';`
        const result = await client.query(queryString)
        return { success: true, result: 'success' }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = deleteJwtExpired