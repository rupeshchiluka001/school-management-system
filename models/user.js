const mongoose = require("mongoose");
const connection = require('../config/database');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    DOB: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
    },
    fatherName: {
        type: String,
    },
    hash: {
        type: String,
    },
    salt: {
        type: String,
    },
    joined: {
        type: Date,
        default: Date.now(),
    },
    role: {
        type: String,
        required: true,
    },
    bookIssues: {
        type: Number,
        required: false,
        default: 0,
    },
    hosteller: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'Room',
        required: false
    }
});

module.exports = connection.model("User", UserSchema);