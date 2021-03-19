// Import downloaded modules
const express = require('express')

// Import database functions (CRUD) : user
// const createUser = require('../db/user/createUser')
// const readUserFromEmail = require('../db/user/readUserFromEmail')
// const readUserFromUrl = require('../db/user/readUserFromUrl')
// const readUser = require('../db/user/readUser')
// const updateUser = require('../db/user/updateUser')
// const deleteUser = require('../db/user/deleteUser')

// Create Express.js router
const router = new express.Router()

// User read
router.get(
    '/id/:id',
    async (req, res) => {

        // SQL Query result
        const result = await readUser(req.params.id)

        // Test result
        if (!result.success) return res.sendStatus(500)
        if (!result.data) return res.sendStatus(404)

        return res.json(result.data)
    }
)

// User read
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