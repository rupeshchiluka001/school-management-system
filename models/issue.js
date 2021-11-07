const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
    bookInfo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
        },
        category: {
            type: String,
        },
    },
    userInfo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'onUser',
        },
        name: String,
    },
    onUser: {
        type: String,
        required: true,
        enum: ['Student', 'Professor', 'Librarain'],
    },
    issueDate : {
        type: Date,
        default: Date.now(),
    },
    returnDate: {
        type: Date,
        default: Date.now() + 10*24*60*60*1000,
    },
    isRenewed: {
        type: Boolean,
    }
});

const Issue = mongoose.model("Issue", IssueSchema);

module.exports = Issue;