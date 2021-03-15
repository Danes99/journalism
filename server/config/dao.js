// DAO options
const DAO_PORT = 81
const DAO_PROTOCOL = 'http'

// DAO base url
const DAO_BASE_URL = `${DAO_PROTOCOL}://${process.env.DAO_BASE_URL || 'localhost'}:${DAO_PORT}/`

// DAO endpoint
const DAO_ENDPOINT_ARTICLE = DAO_BASE_URL + 'article/'
const DAO_ENDPOINT_USER = DAO_BASE_URL + 'user/'

// Exports
export {
    DAO_PROTOCOL,
    DAO_PORT,
    DAO_BASE_URL,
    DAO_ENDPOINT_ARTICLE,
    DAO_ENDPOINT_USER
}