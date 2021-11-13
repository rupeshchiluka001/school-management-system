const Book = require('../models/book');
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
        console.log(req.user);

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

exports.postNewBook =  (req, res, next) => {

    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.author);
    console.log(req.body.ISN);
    console.log(req.body.description);
    console.log(req.body.category); 

    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        ISN: req.body.ISN,
        description: req.body.description,
        category: req.body.category,
        stock: 1,
    });

    newBook.save()
        .then((book) => {   
            console.log(book);
            console.log("📖📖📖📖📖📖📖");
            res.status(200);
        })
        .catch((err) => {
            console.log("Err: "+err);
            res.status(500);
        })
    res.send(newBook);
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