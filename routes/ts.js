const router = require('express').Router();
const tsMethods = require('../controllers/ts');

router.post('/add-new-course', tsMethods.addNewCourse);

router.get('/course-list-by-professor', tsMethods.getCourseListByProfessor);

router.get('/courses', tsMethods.getcourseList);

router.post('/update-course', tsMethods.updateCourse);

router.get('/course', tsMethods.getCourseDetails);

module.exports = router;