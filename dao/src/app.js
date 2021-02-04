// Import downloaded modules
const express = require('express')
const bodyParser = require("body-parser")

// Import routers
const routerUser = require('./routers/user')
const routerArticle = require('./routers/article')

// Import functions
const startDBConnection = require('./db/start')

// Global constants
global.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h'
global.TIMEZONE = process.env.TIMEZONE || 'UTC-1'

// Connected to database
startDBConnection()

// Create Express.js app
const app = express()

// App Variables
app.set('AppName', 'Data Access Object (DAO)')

// Define express config
// Parse HTTP Request body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Use routers
app.use('/article', routerArticle)
app.use('/user', routerUser)

module.exports = app