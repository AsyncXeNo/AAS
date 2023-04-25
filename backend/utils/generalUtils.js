const JWT = require('jsonwebtoken')

const { getSecret } = require('../src/secrets')

const generateToken = payload => {
    return JWT.sign(
        payload,
        getSecret('JWT_SECRET')
    )
}

module.exports = {
    generateToken
}