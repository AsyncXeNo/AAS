const { getSecret } = require('../src/secrets')
const logger = require('../utils/logger')

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
  
    res.status(statusCode)

    logger.error(`Error caught in middleware: ${err.message}`)
  
    res.json({
        message: err.message,
        stack: getSecret('NODE_ENV') === 'production' ? null : err.stack,
    })
}
  
module.exports = {
    errorHandler,
}