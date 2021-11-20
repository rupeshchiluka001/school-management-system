const { user } = require('../config/database');
const Book = require('../models/book');
const User = require('../models/user');
const Issue = require('../models/issue');
const PER_PAGE = 10;

exports.getBooks = async(req, res, next) => {
    console.log("Getting books...");
    console.log(req.query);
    const page = req.query.page || 1;
    const filter = req.query.filter;
    const value = req.query.value;
    let searchObj = {};

    // if (filter != 'all' && value != 'all') {
    if ( filter !== '' && value !== '' ) {
        searchObj[filter] = {"$regex": value, "$options": "i"};
    }

    try {
        const books = await Book
                        .find(searchObj)
                        .skip(PER_PAGE*(page-1))
                        .limit(PER_PAGE);

        const count = await Book.find(searchObj).countDocuments();

        res.send({
            books: books,
            current: page,
            pages: Math.ceil(count/PER_PAGE),
            filter: filter,
            value: value,
            user: req.user,
        });
        // res.send(books);
    } catch (err) {
        console.log(err);
        console.log(500);
    }
};

exports.getIssuedBooks = (req, res, next) => {

    if (!req.isAuthenticated()) {
        console.log("not authenticated");
        res.status(401);
        res.send("Please login first");
        return;
    }
    Issue.find({'userId': req.session.passport.user})
        .then((issues) => {
            console.log("Issues: ", issues);
            if (issues.length == 0) {
                res.status(200);
                res.send({});
            }
            else {
                console.log("issues: ",issues);
                let bookIds = issues.map(issue => issue.bookId);
                console.log(bookIds);
                Book.find({ '_id': { $in: bookIds} }, (err, books) => {
                    console.log("books: ", books);
                    res.status(200);
                    res.send(books);
                });
            }
        })
        .catch((err) => {
            console.log("geting issued books err: ",err);
            res.status(401);
            res.send("Error during getting issued books, try again later!");
        });
    
};

exports.postIssue = async (req, res, next) => {
    let bookId = req.body.bookId;
    let userId = req.session.passport.user;
    const MAX_ISSUES = 5;

    let book = await Book.findById(bookId);
    let user = await User.findById(userId);

    if (book && user && (book.stock > 0) && (user.bookIssues < MAX_ISSUES)) {
        // a student can issue at max 5 books for a given time
        const newIssue = new Issue({
            bookId: bookId,
            userId: userId,
            bookTitle: book.title,
            userName: user.name
        });
        
        newIssue.save()
            .then((issue) => {
                Book.findByIdAndUpdate(bookId, {$inc: {stock: -1}}, (err, book) => {});
                User.findByIdAndUpdate(userId, {$inc: {bookIssues: 1}}, (err, user) => {});
                res.status(200);
                res.send(issue);
            })
            .catch((err) => {
                console.log("issue err: ",err);
                res.status(401);
                res.send("Error during issuing, try again later!");
            })
    }
    else {
        res.status(200);
        res.send("You are not allowed");
    }
};

exports.getReturnBook = async (req, res, next) => {
    let bookId = req.query.bookId;
    let userId = req.session.passport?.user;

    if (userId && bookId) {
        Issue.findOneAndDelete({bookId: bookId, userId: userId}, function(err, issue) {
            if (err) {
                console.log("Err: ", err);
                res.status(401);
                res.send("Error during returning book. Try again later! Err: ", err);
            }
            else {
                console.log("Deleted Issue: ", issue);
                Book.findByIdAndUpdate(bookId, {$inc: {stock: 1}}, (err, book) => {});
                User.findByIdAndUpdate(userId, {$inc: {bookIssues: -1}}, (err, user) => {});
                res.status(200);
                res.send("Book Returned!!");
            }
        });
    }
};

exports.postNewBook =  (req, res, next) => {
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        ISN: req.body.ISN,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
    });

    newBook.save()
        .then((book) => {
            res.status(200);
            res.send(book);
        })
        .catch((err) => {
            console.log("Err: "+err);
            res.status(500);
            res.send("Error during saving book. Try again later! Err: ", err);
        })
};

exports.getBookDetails = async(req, res) => {
    try {
        const book_id = req.query.id;
        const book = await Book.findById(book_id);
        res.status(200);
        res.send(book);
    } catch (err) {
        console.log(err);
        res.status(401);
        res.send("Unable to find book");
    }
};

exports.deleteBook = async(req, res) => {
    try {
        console.log(req.query);
        const book_id = req.query.bookId;
        const book = Book.findOneAndRemove({_id: book_id}, (err, data) => {
            if (!err) {
                console.log("Deleted");
                res.status(200);
                res.send("Book deleted successfully!!");
            }
            else {
                res.status(500);
                res.send("Unable to delete book!!");
            }
        });
    } catch (err) {
        console.log(err);
        // return res.redirect("back");
    }
};