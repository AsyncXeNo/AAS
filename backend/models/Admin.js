const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    // Authentication
    username: {
        type: String,
        required: true,
        minLength: 4,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Admin', adminSchema)