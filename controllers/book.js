const Book = require('../models/book');
const PER_PAGE = 10;

exports.getBooks = async(req, res) => {
    const page = req.params.page || 1;
    const filter = req.params.filter;
    const value = req.params.value;
    let searchObj = {};

    if (filter != 'all' && value != 'all') {
        searchObj[filter] = value;
    }

    try {
        const books = await Book
                        .find(searchObj)
                        .skip(PER_PAGE*(page-1))
                        .limit(PER_PAGE);

        const count = await Book.find(searchObj).countDocuments();

        res.render("book", {
            books: books,
            current: page,
            pages: Math.ceil(count/PER_PAGE),
            filter: filter,
            value: value,
            user: req.user,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getBookDetails = async(req, res) => {
    try {
        const book_id = req.params.book_id;
        const book = await Book.findById(book_id);
        res.render("user/bookDetails", {book: book});
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};