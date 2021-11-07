const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    description: {
        type: String,
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

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;