

/**
 * Returns access token or NULL if user is not logged in
 */
const getAccessToken = () => {
    return localStorage.getItem('AccessToken')
}

/**
 * Returns boolean wether current user session is stil valid
 */
const isSessionValid = () => {
    /* TODO */
    return true;
}

/**
 * Returns details about currently logged in user, or null if not logged in
 */
const getUserInfo = () => {
    /* TODO */
}

module.exports = {
    getAccessToken,
    isSessionValid,
    getUserInfo
}