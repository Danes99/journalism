// Import downloaded modules
const express = require('express')

// Import functions
const generateAuthToken = require('../utils/generateAuthToken')

// Create Express.js router
const router = new express.Router()

router.get(
    '/',
    async (req, res) => {
        res.send(200)
    }
)

router.post(
    '/',
    async (req, res) => {
    }
)

router.post(
    '/login',
    async (req, res) => {
        
        const name = req.body.name
        const password = req.body.password

        const token = await generateAuthToken(name)

        res.json({ token, length: token.length })
    }
)

router.post(
    '/logout',
    async (req, res) => {
        res.send(200)
    }
)

router.patch(
    '/',
    async (req, res) => {
        res.send(200)
    }
)

router.delete(
    '/',
    async (req, res) => {
        res.send(200)
    }
)

module.exports = router