const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
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
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;