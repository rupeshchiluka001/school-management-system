const mongoose = require('mongoose');
const connection = require('../config/database');

const CourseLinkSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'Course'
    },
    className: {
        type: String,
        required: true,
    },
    classLink: {
        type: String,
        required: true
    }
});

module.exports = connection.model("CourseLink", CourseLinkSchema);