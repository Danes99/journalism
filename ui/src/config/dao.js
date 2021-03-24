// Data Access Object (DAO) options
const DAO_PORT = 81
const DAO_PROTOCOL = window.location.protocol
const DAO_BASE_URL = window.location.hostname

// DAO url
const DAO_URL = `${DAO_PROTOCOL}//${DAO_BASE_URL}:${DAO_PORT}/`

// DAO endpoint
const DAO_ENDPOINT_ARTICLE = DAO_URL + 'article/'
const DAO_ENDPOINT_USER = DAO_URL + 'user/'

// Exports
export {
    DAO_PROTOCOL,
    DAO_PORT,
    DAO_BASE_URL,
    DAO_URL,
    DAO_ENDPOINT_ARTICLE,
    DAO_ENDPOINT_USER
}