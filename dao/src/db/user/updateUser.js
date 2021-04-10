const updateUser = async (id, name, email, password) => {
    try {
        const queryString = `UPDATE users SET 
            ${ name ? `name='${name}'` : '' } ${ name && email ? ',' : '' }
            ${ email ? `email='${email}'` : '' } ${ email && password ? ',' : '' }
            ${ password ? `password='${password}'` : '' }
            WHERE id=${id}`

        const result = await client.query(queryString)
        return { success: result.rowCount === 1 }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = updateUser