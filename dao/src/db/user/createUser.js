createUser = async (name, email, url, password) => {
    try {
        const queryString = `INSERT INTO users(name, email, url, password) VALUES (
            '${name}', '${email}', '${url}', '${password}');
            SELECT * FROM users WHERE email='${email}';`
        
        const result = await client.query(queryString)
        const resultFromSelect = result[1]
        
        return { success: resultFromSelect.rows.length > 0, result: resultFromSelect.rows[0] }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = createUser