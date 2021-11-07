const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    rollNo: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    Hosteller: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    joined: {
        type: Date,
        default: Date.now(),
    },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;