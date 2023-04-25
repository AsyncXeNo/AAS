const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    classTeacher: {
        type: mongoose.Types.ObjectId,
        ref: 'Faculty'
    },
    students: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Student'
            }
        ],
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Class', classSchema)