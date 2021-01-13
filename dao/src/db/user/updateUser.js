updateUser = async (id, name, password) => {
    try {
        const queryString = `UPDATE users SET 
            ${ name ? `name='${name}'` : '' } ${ name && password ? ',' : '' }
            ${ password ? `password='${password}'` : '' }
            WHERE id=${id}`

        const result = await client.query(queryString)
        return { success: true }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = updateUser