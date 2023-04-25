const mongoose = require('mongoose')

const FacultySchema = mongoose.Schema({
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

    // University Info
    universityEmail: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
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

module.exports = mongoose.model('Faculty', FacultySchema)