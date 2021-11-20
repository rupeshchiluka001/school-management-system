const router = require('express').Router();
const libraryMethods = require('../controllers/library');

router.post('/add-new-book', libraryMethods.postNewBook);

router.get('/delete-book', libraryMethods.deleteBook);

router.get('/get-book', libraryMethods.getBookDetails);

router.get('/get-issued-books', libraryMethods.getIssuedBooks);

router.post('/post-issue', libraryMethods.postIssue);

router.get('/return-book', libraryMethods.getReturnBook);

router.get('/', libraryMethods.getBooks);

module.exports = router;