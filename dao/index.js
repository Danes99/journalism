// Server Variables
const port = process.env.PORT || 81

// Import Express.js app
const app = require('./src/app')

app.listen(
    port, 
    () => console.log(`${app.get('AppName')} listening on port ${port}!`)
)