// Import downloaded modules
const express = require('express')

// Import middleware
const auth = require('../middleware/auth')
const isIdValid = require('../middleware/article/isIdValid')
const isArticleValid = require('../middleware/article/isArticleValid')

// Import database functions (CRUD)
const createArticle = require('../db/article/createArticle')
const readArticle = require('../db/article/readArticle')
const readArticleAll = require('../db/article/readArticleAll')
const readArticleSearch = require('../db/article/readArticleSearch')
const updateArticle = require('../db/article/updateArticle')
const deleteArticle = require('../db/article/deleteArticle')

// Create Express.js router
const router = new express.Router()

// Read article by ID
// No need to be authenticated
router.get(
    '/id/:id',
    isIdValid,
    async (req, res) => {
        try {

            // Test id
            if (!req.params.id) return res.status(400).send('ID not defined')
            if (typeof parseInt(req.params.id) !== 'number') return res.status(400).send('ID is n ot a number')

            // SQL Query result
            const result = await readArticle(req.params.id)

            // Send result
            if (result.success) {
                if (result.data) {
                    return res.status(200).send(result.data)
                } else {
                    res.sendStatus(404)
                }
            } else {
                res.sendStatus(500)
            }

            // res.status(result.success ? 200 : 500).send(result.result)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
)

router.get(
    '/all',
    auth,
    async (req, res) => {
        try {

            // SQL Query result
            const result = await readArticleAll(req.user_id)

            // Send results
            if (result.success) {
                res.status(200).json(result.data)
            } else {
                res.sendStatus(500)
            }

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
)

// Search article by string in "title" or "content"
// No need to be authenticated
router.get(
    '/',
    async (req, res) => {
        try {

            // Test search query
            if (!req.query.search) return res.status(400).json({ error: "No search query" })

            // SQL Query result
            const result = await readArticleSearch(req.query.search)
            res.status(result.success ? 200 : 500).send(result.result)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
)

// Create article
// Need to be authenticated
router.post(
    '/',
    auth,
    isArticleValid,
    async (req, res) => {
        try {

            // Create article in database
            const result = await createArticle(
                req.user_id,
                req.body.title,
                req.body.content
            )

            // SQL Query result
            if (result.success) {
                return res.sendStatus(201)
            } else {
                return res.status(500).json(result)
            }

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
)

// Update article
// Need to be authenticated
router.patch(
    '/:id',
    auth,
    isIdValid,
    async (req, res) => {
        try {

            // Update article
            const result = await updateArticle(
                req.params.id,
                req.body.title,
                req.body.content
            )

            // SQL Query result
            res.status(result.success ? 200 : 500).json(result.result)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
)

// Delete article
// Need to be authenticated
router.delete(
    '/:id',
    auth,
    isIdValid,
    async (req, res) => {
        try {
            // SQL Query result
            const result = await deleteArticle(req.params.id)
            console.log(result)

            if (result.success) {
                return res.sendStatus(200)
            } else {
                if (result.result === 0) {
                    res.sendStatus(404)
                } else {
                    return res.status(500).json(result.result)
                }
            }

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
)

// Export Express.js router
module.exports = router