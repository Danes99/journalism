// Import downloaded modules
const express = require('express')
const bodyParser = require("body-parser")

// Import routers
const routerUser = require('./routers/user')
const routerArticle = require('./routers/article')

// Import functions
const start = require('./db/start')
const scheduleDeleteOldJwt = require('./db/schedule/scheduleDeleteOldJwt')

// Connected to database
start()
// scheduleDeleteOldJwt(6000)

// Create Express.js app
const app = express()

// App Variables
app.set('AppName', 'Data Access Object (DAO)')

// Define express config
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Use routers
app.use('/article', routerArticle)
app.use('/user', routerUser)

module.exports = app