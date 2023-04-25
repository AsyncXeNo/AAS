const asyncHandler = require('express-async-handler')
const logger = require('../utils/logger')

const logRequests = (req, res, next) => {
    logger.debug(`${req.method} ${req.path}`)
    next()
}

module.exports = {
    logRequests
}