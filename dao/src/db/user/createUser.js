createUser = async (name, password) => {
    try {
        const queryString = `INSERT INTO users(name, password) VALUES ('${name}', '${password}')`
        const result = await client.query(queryString)
        return { success: result.rowCount > 0, result: 'success' }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = createUser