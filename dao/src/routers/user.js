// Import downloaded modules
const bcrypt = require('bcryptjs')
const express = require('express')

// Import middleware
const auth = require('../middleware/auth')
const isUserValid = require('../middleware/user/isUserValid')
const isUserUpdateValid = require('../middleware/user/isUserUpdateValid')

// Import functions
const generateAuthToken = require('../utils/generateAuthToken')

// Import database functions (CRUD) : user
const createUser = require('../db/user/createUser')
const deleteUser = require('../db/user/deleteUser')
const readUser = require('../db/user/readUser')
const readUserFromEmail = require('../db/user/readUserFromEmail')
const readUserFromId = require('../db/user/readUserFromId')
const readUserFromUrl = require('../db/user/readUserFromUrl')
const updateUser = require('../db/user/updateUser')

// Import database functions (CRUD) : jwt
const createJwt = require('../db/jwt/createJwt')
const deleteJwt = require('../db/jwt/deleteJwt')
const deleteJwtSFromUserId = require('../db/jwt/deleteJwtSFromUserId')

// Create Express.js router
const router = new express.Router()

// User read
router.get(
    '/',
    auth,
    async (req, res) => {

        // SQL Query result
        const result = await readUser(req.user_id)

        // Test result
        if (!result.success) return res.sendStatus(500)
        if (!result.data) return res.sendStatus(404)

        return res.json(result.data)
    }
)

// Test if user is logged in
// Test the validity of the JWT in header
router.get(
    '/isLoggedIn',
    auth,
    async (req, res) => res.sendStatus(200)
)

// User read form id
// Used by external users
// Send none confidential information
router.get(
    '/id/:id',
    async (req, res) => {

        // SQL Query result
        const result = await readUserFromId(req.params.id)

        // Test result
        if (!result.success) return res.sendStatus(500)
        if (!result.data) return res.sendStatus(404)

        return res.json(result.data)
    }
)

// User read form url
// Used by external users
// Send none confidential information
router.get(
    '/url/:url',
    async (req, res) => {

        // SQL Query result
        const result = await readUserFromUrl(req.params.url)

        // Test result
        if (!result.success) return res.sendStatus(500)
        if (!result.data) return res.sendStatus(404)

        return res.json(result.data)
    }
)

// User create
router.post(
    '/',
    isUserValid,
    async (req, res) => {
        try {

            // Get user URL
            const url = req.body.name.trim().toLowerCase().replace(' ', '-')

            // Create user in database
            const result = await createUser(
                req.body.name,
                req.body.email,
                url,
                await bcrypt.hash(req.body.password, 12)
            )

            // JSON Web Token (JWT)
            const token = await generateAuthToken(req.body.email)
            const queryJwt = await createJwt(result.result.id, token)

            // Test result
            if (queryJwt.success) {
                return res.status(201).json({ token })
            } else {
                return res.status(500).send(queryJwt.result)
            }

        } catch (error) {
            res.status(500).send(error)
        }
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

        // Test result
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
    auth,
    async (req, res) => {

        // Token to delete from database
        const token = req.header('Authorization').replace('Bearer ', '')

        // Delete token from database
        const result = await deleteJwt(token)

        // Send result
        return res.sendStatus(result.success ? 200 : 500)
    }
)

// User logout
router.post(
    '/logout/all',
    auth,
    async (req, res) => {

        // Delete every user's tokens from database 
        const result = await deleteJwtSFromUserId(req.user_id)

        // Send result
        return res.sendStatus(result.success ? 200 : 500)
    }
)

// User update
router.patch(
    '/',
    auth,
    isUserUpdateValid,
    async (req, res) => {

        const result = updateUser(
            req.user_id,
            req.body.name,
            req.body.email,
            req.body.password
        )

        if (result.success) {
            return res.sendStatus(200)
        } else {
            return res.status(500).send(result.result)
        }
    }
)

// User delete
router.delete(
    '/',
    auth,
    async (req, res) => {
        const result = await deleteUser(req.user_id)

        if (result.success) {
            return res.sendStatus(200)
        } else {
            return res.status(500).send(result.result)
        }
    }
)

module.exports = router