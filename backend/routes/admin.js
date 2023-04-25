const express = require('express')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const Admin = require('../models/Admin')
const { generateToken } = require('../utils/generalUtils')
const logger = require('../utils/logger')

const router = express.Router()

// Login
router.post(
    '/login',

    asyncHandler(async (req, res) => {

        const { username, password } = req.body
        const admin = await Admin.findOne({ username })

        if (!admin) {
            res.status(400)
            throw new Error('Incorrect Credentials')
        }

        const id = admin.id
 
        const passwordValidated = await bcrypt.compare(password, admin.password)
        if (!passwordValidated) {
            res.status(401)
            throw new Error('Incorrect Credentials')
        }

        logger.info(`User logged in as Admin { id: ${id}, username: ${username} }`)

        res.status(200).json({
            token: generateToken({
                id
            }),
            type: 'admin',
            username: admin.username
        })
        
    })
)


module.exports = router