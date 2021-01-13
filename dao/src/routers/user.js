// Import downloaded modules
const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')

// Import middleware
const auth = require('../middleware/auth')
const isIdValid = require('../middleware/user/isIdValid')
const isUserValid = require('../middleware/user/isUserValid')

// Import functions
const generateAuthToken = require('../utils/generateAuthToken')

// Import database functions (CRUD) : user
const createUser = require('../db/user/createUser')
const readUser = require('../db/user/readUser')
const readUserFromEmail = require('../db/user/readUserFromEmail')
const updateUser = require('../db/user/updateUser')
const deleteUser = require('../db/user/deleteUser')

// Import database functions (CRUD) : jwt
const createJwt = require('../db/jwt/createJwt')

// Create Express.js router
const router = new express.Router()

// User read
router.get(
    '/:id',
    isIdValid,
    async (req, res) => {
        const result = readUser(req.params.id)
        if (!result) return res.sendStatus(404)
        return res.json(result)
    }
)

// User read
router.get(
    '/:id/avatar',
    isIdValid,
    async (req, res) => {
        res.sendStatus(200)
    }
)

// User create
router.post(
    '/',
    isUserValid,
    async (req, res) => {

        // Create user in database
        const result = await createUser(
            req.body.name,
            req.body.email,
            await bcrypt.hash(req.body.password, 12)
        )

        console.log(result)

        // Return JSON Web Token (JWT)
        return res.status(201).json({ 
            token: await generateAuthToken(req.body.email) 
        })
    }
)

// User login
router.post(
    '/login',
    async (req, res) => {

        // Get user from email
        const result = await readUserFromEmail(req.body.email)
        if (!result.success) return res.status(500).send(result.result)
        if (!result.result) return res.status(400).json({ error: "Bad credentials" })

        // Compare stored hashed password and login password
        const isMatch = await bcrypt.compare(
            req.body.password,
            result.result.password
        )

        // Does password match? 
        if (!isMatch) return res.status(400).json({ error: "Bad credentials" })

        // JSON Web Token (JWT)
        const token = await generateAuthToken(req.body.email)
        const queryJwt = await createJwt(result.result.id, token)

        if (queryJwt.success) {
            return res.json({ token })
        } else {
            return res.status(500).send(queryJwt.result)
        }
    }
)

// User logout
router.post(
    '/logout',
    async (req, res) => {
        res.send(200)
    }
)

// User logout
router.post(
    '/logout/all',
    async (req, res) => {
        res.send(200)
    }
)

// User update
router.patch(
    '/',
    async (req, res) => {
        res.send(200)
    }
)

// User delete
router.delete(
    '/',
    async (req, res) => {
        res.send(200)
    }
)

module.exports = router