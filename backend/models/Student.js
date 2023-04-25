const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    // Authentication
    username: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    facialId: {
        type: String,
        required: true
    },

    // University Info
    registrationNumber: {
        type: Number,
        required: true,
        unique: true
    },
    universityEmail: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    programme: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },

    // Attendance Info
    classesConducted: {
        type: Number,
        default: 0
    },
    classesAttended: {
        type: Number,
        default: 0
    },

    // Personal Info
    fullName: {
        type: String,
        required: true
    },
    personalEmail: {
        type: String,
        required: true
    },
    phone: {
        type: [Number],
        required: true
    },
    address: {
        type: [String],
        required: true
    },
    other: {
        type: Object
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Student', studentSchema)