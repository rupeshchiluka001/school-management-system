const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
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
    DOB: {
        type: Date,
        required: true,
    },
    SSN: {
        type: String,
        required: true,
    },
    email: {
        type: String,
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

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;