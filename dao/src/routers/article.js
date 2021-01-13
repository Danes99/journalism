// Import downloaded modules
const express = require('express')

// Import middleware
const auth = require('../middleware/auth')
const isIdValid = require('../middleware/article/isIdValid')
const isArticleValid = require('../middleware/article/isArticleValid')

// Import database functions (CRUD)
const createArticle = require('../db/article/createArticle')
const readArticle = require('../db/article/readArticle')
const readArticleSearch = require('../db/article/readArticleSearch')
const updateArticle = require('../db/article/updateArticle')
const deleteArticle = require('../db/article/deleteArticle')

// Create Express.js router
const router = new express.Router()

// Read article by ID
// No need to be authenticated
router.get(
    '/:id',
    isIdValid,
    async (req, res) => {
        try {

            // SQL Query result
            const result = await readArticle(req.params.id)
            res.status(result.success ? 200 : 500).send(result.result)

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
                req.user.id,
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
            const result = await deleteArticle(id)
            res.status(result.success ? 200 : 500).json(result.result)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
)

// Export Express.js router
module.exports = router