// Libraries
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const logger = require('../utils/logger')
const { getSecret } = require('./secrets')
const userRoutes = require('../routes/users')
const classRoutes = require('../routes/class')
const { errorHandler } = require('../middleware/errorMiddleware')
const { logRequests } = require('../middleware/logMiddleware')

// Connecting to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(getSecret('DB_URL')).then(
    () => {
        logger.info('Connected to MongoDB')
    },
    (err) => {
        logger.critical(`Connection to MongoDB failed: ${err}`)
        process.exit(1)
    }
)

const Class = require('../models/Class')

// const main = async () => {
//     await Class.create({
//         name: '4BCA',
//         classTeacher: '6447233b5bc94a414aa06be3',
//         students: [
//             '644747c28a873809d4426801',
//             '6447482e8a873809d4426809',
//             '644749388a873809d4426819'
//         ]
//     })
// }

// main()


// Setting up API
const app = express()
const port = getSecret('PORT')

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(logRequests)

// Routes
app.use('/users', userRoutes)
app.use('/class', classRoutes)

// More Middleware
app.use(errorHandler)

// Listening
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`)
})

module.exports = app