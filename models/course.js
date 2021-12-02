const mongoose = require('mongoose');
const connection = require('../config/database');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    professor: {
        type: String,
    },
    professorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
    }
});

module.exports = connection.model("Course", CourseSchema);