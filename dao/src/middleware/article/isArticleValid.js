const isArticleValid = async (req, res, next) => {
    try {

        // Test title
        if (!req.body.title) return res.status(400).json({ error: "No title" })
        if (req.body.title.length === 0) return res.status(400).json({ error: "title.length === 0" })

        // Test content
        if (!req.body.content) return res.status(400).json({ error: "No content" })
        if (req.body.content.length === 0) return res.status(400).json({ error: "content.length === 0" })

        // Middleware is over
        // Go to ext function
        next()
    }
    catch (error) {
        res.status(500).send(error)
    }
}
module.exports = isArticleValid