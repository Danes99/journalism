createUser = async (name, email, password) => {
    try {
        const queryString = `INSERT INTO users(name, email, password) VALUES ('${name}', '${email}', '${password}')`
        const result = await client.query(queryString)
        return { success: result.rowCount > 0, result: 'success' }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = createUser