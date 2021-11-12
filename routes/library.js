const router = require('express').Router();
const libraryMethods = require('../controllers/library');



router.post('/add-new-book', libraryMethods.postNewBook);

router.get('/', libraryMethods.getBooks);

module.exports = router;