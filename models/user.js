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
    }
});

module.exports = connection.model("User", UserSchema);