// Require pre-installed modules
const path = require('path')

// Require downloaded modules
const express = require('express')
const bodyParser = require('body-parser')

// Create Express.js app
const app = express()

// App Variables
app.set('AppName', 'Business Service Logic (BLS)')

// Serving static files in Express.js
app.use(express.static(path.join(__dirname, '../public/build/ui')))

// Define body-parser config
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Send complied React.js app (UI)
app.get(
    '/*',
    async (req, res) => res.sendFile(path.join(__dirname, '../public/build/ui', 'index.html'))
)

module.exports = app