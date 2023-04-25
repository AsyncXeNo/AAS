const express = require('express')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const Faculty = require('../models/Faculty')
const Class = require('../models/Class')
const { generateToken } = require('../utils/generalUtils')
const { protectFaculty, protectAdmin } = require('../middleware/authMiddleware')
const logger = require('../utils/logger')

const router = express.Router()

// Register
router.post(
    '/register',

    protectAdmin,

    asyncHandler(async (req, res) => {

        const { username, password, universityEmail, department, fullName, personalEmail, phone, address, other } = req.body

        if (!username || !password || !universityEmail || !department || !fullName || !personalEmail || !phone || !address) {
            res.status(400)
            throw new Error('Incomplete information')
        }

        const facultyExists = await Faculty.findOne({ username })

        if (facultyExists) {
            res.status(400)
            throw new Error('Faculty already exists')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const faculty = await Faculty.create({
            username,
            password: hashedPassword,

            universityEmail,
            department,

            fullName,
            personalEmail,
            phone,
            address,
            other: typeof(other) === 'object' ? other : {}
        })

        if (faculty) {
            logger.info(`Faculty registered { id: ${faculty.id}, username: ${faculty.username} }`)
            res.status(201).json({
                token: generateToken({
                    id: faculty.id,
                }),
                type: 'faculty'
            })
        } else {
            res.status(400)
            throw new Error('Invalid faculty data')
        }
        
    })
)

// Login
router.post(
    '/login',

    asyncHandler(async (req, res) => {

        const { username, password } = req.body
        const faculty = await Faculty.findOne({ username })

        if (!faculty) {
            res.status(400)
            throw new Error('Faculty does not exist')
        }
        
        const id = faculty.id

        const passwordValidated = await bcrypt.compare(password, faculty.password)
        if (!passwordValidated) {
            res.status(401)
            throw new Error('Incorrect password')
        }

        logger.info(`User logged in as Faculty { id: ${faculty.id}, username: ${faculty.username} }`)

        res.status(200).json({
            token: generateToken({
                id
            }),
            type: 'faculty'
        })
        
    })
)

// Delete Faculty
router.delete(
    '/delete',

    protectAdmin,

    asyncHandler(async (req, res) => {

        const { id } = req.body

        if (!id) {
            res.status(400)
            throw new Error('No user ID provided to delete')
        }

        await Faculty.findByIdAndDelete(id)

        logger.info(`Faculty deleted { id: ${id} }`)

        res.status(200).send()
        
    })
)

// Get Info
router.get(
    '/me',

    protectFaculty,

    asyncHandler(async (req, res) => {

        console.log(req.user)

        const faculty = await Faculty.findOne({ _id: req.user._id })
        
        res.status(200).json(faculty)

    })
)

// Get Info
router.get(
    '/class',

    protectFaculty,

    asyncHandler(async (req, res) => {
        
        const id = req.user.id

        const _class = await Class.findOne({ classTeacher: id }).populate('students')
        // const populated = 

        if (_class) {
            res.status(200).send(_class)
        } else {
            res.status(400)
            throw new Error('No class')
        }

    })
)

// Get complete Info
router.get(
    '/info',

    protectAdmin,

    asyncHandler(async (req, res) => {

        const faculty = await Faculty.findById(req.user.id)

        if (!faculty) {
            res.status(400)
            throw new Error('User with ID does not exist')
        }

        res.status(200).json(faculty)

    })
)

// Get all
router.get(
    '/all',

    protectAdmin,

    asyncHandler(async (req, res) => {

        const teachers = await Faculty.find({})

        res.status(200).json(teachers)
        
    })
)

module.exports = router