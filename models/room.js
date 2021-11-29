const mongoose = require('mongoose');
const connection = require('../config/database');

const RoomSchema = new mongoose.Schema({
    roomNo: {
        type: Number,
        required: true
    },
    hostelName: {
        type: String,
        required: true
    },
    allottedTo: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'User'
    },
    allottedOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = connection.model("Room", RoomSchema);