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
const DAO_ENDPOINT_USER_LOGOUT = DAO_ENDPOINT_USER + 'logout/'
const DAO_ENDPOINT_USER_REGISTER = DAO_ENDPOINT_USER
const DAO_ENDPOINT_USER_IS_LOGGED_IN = DAO_ENDPOINT_USER + 'isLoggedIn/'

// DAO endpoints: article
const DAO_ENDPOINT_ARTICLE_ID = DAO_ENDPOINT_ARTICLE + 'id/'
const DAO_ENDPOINT_ARTICLE_READ_ALL = DAO_ENDPOINT_ARTICLE + 'all/'

// Exports
export {

    // Options
    DAO_PORT,
    DAO_PROTOCOL,
    DAO_BASE_URL,

    // URI
    DAO_URL,

    // Main endpoints
    DAO_ENDPOINT_USER,
    DAO_ENDPOINT_ARTICLE,

    // User endpoints
    DAO_ENDPOINT_USER_LOGIN,
    DAO_ENDPOINT_USER_LOGOUT,
    DAO_ENDPOINT_USER_REGISTER,
    DAO_ENDPOINT_USER_IS_LOGGED_IN,

    // Article endpoints
    DAO_ENDPOINT_ARTICLE_ID,
    DAO_ENDPOINT_ARTICLE_READ_ALL
}