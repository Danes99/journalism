readJwtFromToken = async token => {
    try {
        const queryString = `SELECT * FROM jwt WHERE token='${token}'`
        const result = await client.query(queryString)
        return { success: result.rows.length > 0, result: result.rows[0] }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = readJwtFromToken