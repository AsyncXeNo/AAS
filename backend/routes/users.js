const express = require('express')

const adminRoutes = require('./admin')
const studentRoutes = require('./student')
const facultyRoutes = require('./faculty')

const router = express.Router()

router.use('/admin', adminRoutes)
router.use('/student', studentRoutes)
router.use('/faculty', facultyRoutes)

module.exports = router