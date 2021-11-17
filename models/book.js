const mongoose = require("mongoose");
const connection = require('../config/database');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ISN: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,

    },
    stock: {
        type: Number,
        required: true,
        default: 1,
    },
});

module.exports = connection.model("Book", BookSchema);