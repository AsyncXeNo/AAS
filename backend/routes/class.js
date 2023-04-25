const express = require('express')
const asyncHandler = require('express-async-handler')

const Class = require('../models/Class')
const { protectAdmin, protectFaculty } = require('../middleware/authMiddleware')
const logger = require('../utils/logger')

const router = express.Router()

// Register
router.post(
    '/register',

    protectAdmin,

    asyncHandler(async (req, res) => {

        const { name, classTeacher, students } = req.body

        if (!name || !classTeacher || !students || students.length < 1) {
            res.status(400)
            throw new Error('Incomplete information')
        }

        const newClass = await Class.create({
            name,
            classTeacher,
            students
        }) 

        if (!newClass) {
            res.status(400)
            throw new Error('Incorrect information')
        }

        logger.info(`Class registered { name: ${name}, classTeacher: ${classTeacher} }`)

        res.status(201).json(newClass)
        
    })
)

// Delete
router.delete(
    '/delete',

    protectAdmin,

    asyncHandler(async (req, res) => {

        const { id } = req.body

        if (!id) {
            res.status(400)
            throw new Error('Id not provided')
        }

        await Class.findByIdAndDelete(id)

        logger.info(`Class deleted { id: ${id} }`)

        res.status(200).send()

    })
)

// Get classes
router.get(
    '/all',

    protectAdmin,

    asyncHandler(async (req, res) => {

        const classes = await Class.find({}).populate()
        
        res.status(200).json(classes)
        
    })
)

// Get class (faculty)
router.get(
    '/mine',

    protectFaculty,

    asyncHandler(async (req, res) => {

        const { id } = req.user
        
        const myClass = await Class.findOne({ classTeacher: id })

        if (!myClass) {
            res.status(400)
            throw new Error('Class not found')
        }

        res.status(200).json(myClass)
        
    })
)

module.exports = router