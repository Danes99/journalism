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
const readUserFromEmail = require('../db/user/readUserFromEmail')
const readUserFromUrl = require('../db/user/readUserFromUrl')
const updateUser = require('../db/user/updateUser')
const deleteUser = require('../db/user/deleteUser')

// Import database functions (CRUD) : jwt
const createJwt = require('../db/jwt/createJwt')

// Create Express.js router
const router = new express.Router()

// User read
router.get(
    '/:url',
    async (req, res) => {
        const result = await readUserFromUrl(req.params.url)

        if (!result.success) return res.sendStatus(500)
        if (!result.result) return res.sendStatus(404)

        return res.json(result.result)
    }
)

// User read avatar
// router.get(
//     '/:id/avatar',
//     isIdValid,
//     async (req, res) => {
//         res.sendStatus(200)
//     }
// )

// User create
router.post(
    '/',
    isUserValid,
    async (req, res) => {

        const url  = req.body.name.trim().toLowerCase().replace(' ', '-')

        // Create user in database
        const result = await createUser(
            req.body.name,
            req.body.email,
            url,
            await bcrypt.hash(req.body.password, 12)
        )

        // // Return JSON Web Token (JWT)
        // return res.status(201).json({ 
        //     token: await generateAuthToken(req.body.email) 
        // })

        // JSON Web Token (JWT)
        const token = await generateAuthToken(req.body.email)
        const queryJwt = await createJwt(result.result.id, token)

        if (queryJwt.success) {
            return res.status(201).json({ token })
        } else {
            return res.status(500).send(queryJwt.result)
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
        res.send(200)
    }
)

// User logout
router.post(
    '/logout/all',
    auth,
    async (req, res) => {
        res.send(200)
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