const secrets = {
    DB_URL: process.env.DB_URL || 'mongodb+srv://asyncxeno:asyncxeno@aas.mocv5hu.mongodb.net/aas?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'jwt secret',
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'production'
}

const getSecret = key => secrets[key]

module.exports = { getSecret }