// Import downloaded module
const { Client } = require('pg')

// Client data
clientData = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
}

const startConnection = async () => {

    try {

        global.client = new Client(clientData)
        const result = await client.connect()

        console.log("Connected successfully to database PostgreSQL")
        return { success: true, result, client }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

module.exports = startConnection