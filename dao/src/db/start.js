const { Client } = require('pg')

const startConnection = async () => {

    try {
        clientData = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        }

        const client = new Client(clientData)
        const result = await client.connect()

        console.log("Connected successfully to database PostgreSQL")
        return { success: true, result, client }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

const start = async () => {
    const result = await startConnection()
    global.client = result.client
}

module.exports = start