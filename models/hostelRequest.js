const mongoose = require('mongoose');
const connection = require('../config/database');

const HostelRequestSchema = new mongoose.Schema({
    roomNo: {
        type: Number,
        required: true
    },
    hostelName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'User'
    },
    userName: {
        type: String,
    },
    userEmail: {
        type: String,
    },
    requestedOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = connection.model("HostelRequest", HostelRequestSchema);