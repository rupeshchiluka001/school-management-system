const mongoose = require("mongoose");
const connection = require('../config/database');

const IssueSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    bookTitle: {
        type: String,
    },
    userName: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'User',
    },
    issueDate : {
        type: Date,
        default: Date.now(),
    },
    returnDate: {
        type: Date,
        default: Date.now() + 864000000, //10 days
    },
    isRenewed: {
        type: Boolean,
        default: false,
    }
});

module.exports = connection.model("Issue", IssueSchema);