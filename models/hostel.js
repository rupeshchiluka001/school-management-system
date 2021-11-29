const mongoose = require('mongoose');
const connection = require('../config/database');

const HostelSchema = new mongoose.Schema({
    hostelName: {
        type: String,
        required: true
    },
    noOfRoomsInEachFloor: {
        type: Number,
        required: true
    },
    noOfFloors: {
        type: Number,
        required: true
    },
    lastRoomFilled: {
        type: Number
    },
    lastFloorFilled: {
        type: Number
    },
});

module.exports = connection.model("Hostel", HostelSchema)