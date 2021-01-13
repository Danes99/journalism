const isArticleIDValid = async (req, res, next) => {
    try {
        const id = req.params.id

        // Test article id
        if (!id) return res.status(400).json({ error: "No id" })
        if (isNaN(id)) return res.status(400).json({ error: "Id is not a number" })
        if (id < 1) return res.status(400).json({ error: "Id must be > 0" })

        // Middleware is over
        // Go to ext function
        next()
    }
    catch (error) {
        res.status(500).send(error)
    }
}
module.exports = isArticleIDValid