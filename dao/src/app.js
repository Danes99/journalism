// Import downloaded modules
const cors = require('cors')
const express = require('express')
const bodyParser = require("body-parser")

// Import routers
const routerUser = require('./routers/user')
const routerArticle = require('./routers/article')

// Import functions
const startIfNotStarted = require('./db/startIfNotStarted')

// Constants
clientData = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
}

// Global constants
global.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h'
global.TIMEZONE = process.env.TIMEZONE || 'UTC'

// Connected to database
startIfNotStarted(clientData)

// Create Express.js app
const app = express()

// App Variables
app.set('AppName', 'Data Access Object (DAO)')

// Define express config: Parse HTTP Request body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Allow-Control-Allow-Origin for the web browser
app.use(cors())

// Use routers
app.use('/article', routerArticle)
app.use('/user', routerUser)

module.exports = app