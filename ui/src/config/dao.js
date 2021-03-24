// Data Access Object (DAO) options
const DAO_PORT = 81
const DAO_PROTOCOL = window.location.protocol
const DAO_BASE_URL = window.location.hostname

// DAO url
const DAO_URL = `${DAO_PROTOCOL}//${DAO_BASE_URL}:${DAO_PORT}/`

// DAO endpoints
const DAO_ENDPOINT_USER = DAO_URL + 'user/'
const DAO_ENDPOINT_ARTICLE = DAO_URL + 'article/'

// DAO endpoints: user
const DAO_ENDPOINT_USER_LOGIN = DAO_ENDPOINT_USER + 'login/'
const DAO_ENDPOINT_USER_SIGNUP = DAO_ENDPOINT_USER

// DAO endpoints: article
const DAO_ENDPOINT_ARTICLE_READ_ALL = DAO_ENDPOINT_ARTICLE + 'all/'

// Exports
export {

    // Options
    DAO_PROTOCOL,
    DAO_PORT,
    DAO_BASE_URL,

    // URI
    DAO_URL,

    // Main endpoint
    DAO_ENDPOINT_ARTICLE,
    DAO_ENDPOINT_USER,

    // User endpoints
    DAO_ENDPOINT_USER_LOGIN,
    DAO_ENDPOINT_USER_SIGNUP,

    // Article endpoints
    DAO_ENDPOINT_ARTICLE_READ_ALL
}