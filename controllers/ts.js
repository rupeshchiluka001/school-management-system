const { find, findByIdAndUpdate } = require('../models/course');
const Course = require('../models/course');
const CourseLink = require('../models/courseLink');

const PER_PAGE = 10;

exports.addNewCourse = async (req, res, next) => {
    console.log("Adding New Course...");
    const user = req.user;
    console.log("User",user);
    if (user == undefined) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    const userId = req.body.userId;
    let courseSaved = false, linksSaved = false, course;

    try {
        //we need to extract course from req.body
        course = await new Course({
            name: req.body.courseName,
            professor: req.body.professor,
            professorId: userId,
            description:req.body.description
        }).save();
        //we need to store course
        console.log("Course: ", course);
        courseSaved = true;

        //we need to store each link in links
        req.body.links.forEach(async (element) => {
            const courseLinkRecord = await new CourseLink({
                courseName: course.name,
                courseId: course._id,
                className: element.className,
                classLink: element.classLink
            }).save();

            console.log("Course Link Record: ", courseLinkRecord);
        });

        linksSaved = true;

        res.status(200);
        res.send({"msg": "Course Registered Successfully!"});
    }
    catch (err) {
        console.log("Err: ", err);
        if ( courseSaved && (!linksSaved) ) {
            await Course.findByIdAndDelete(course._id);
        }
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }    
}

exports.getCourseListByProfessor = async (req, res, next) => {
    console.log("Getting list...");
    const user = req.user;
    console.log("User",user);
    if (user == undefined) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    const userId = user.userId
    const page = req.query.page || 1;
    //search with userId in course collections
    try {
        const courses = await Course.find({professorId: userId})
                .skip(PER_PAGE*(page-1))
                .limit(PER_PAGE);

        const count = await Course.find({professorId: userId}).countDocuments();

        res.send({
            courses: courses,
            current: page,
            pages: Math.ceil(count/PER_PAGE)
        });
    }
    catch (err) {
        console.log("Err: ", err);
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
}

exports.getcourseList = async (req, res, next) => {
    console.log("Getting courses list...");
    const user = req.user;
    console.log("User",user);
    if (user == undefined) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    const userId = user.userId
    const page = req.query.page || 1;
    const filter = req.query.filter;
    const value = req.query.value;
    let searchObj = {};

    if ( filter !== '' && value !== '' ) {
        searchObj[filter] = {"$regex": value, "$options": "i"};
    }
    
    //search with userId in course collections
    try {
        const courses = await Course.find(searchObj)
                                    .skip(PER_PAGE*(page-1))
                                    .limit(PER_PAGE);

        const count = await Course.find(searchObj).countDocuments();

        res.send({
            courses: courses,
            current: page,
            pages: Math.ceil(count/PER_PAGE),
            filter: filter,
            value: value,
        });
    }
    catch (err) {
        console.log("Err: ", err);
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
}

exports.getCourseDetails = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    try {
        const user = req.user;
        const userId = user.userId;
        const courseId = req.query.courseId;
        //search for courseId in Course
        const course = await Course.findById(courseId);
        //search for course Id in courseLink
        const courseLinks = await CourseLink.find({courseId: courseId});

        res.status(200);
        res.send({
            name: course.name,
            professor: course.professor,
            description: course.description,
            links: courseLinks
        });
    }
    catch (err) {
        console.log("Err: ", err);
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
}

exports.updateCourse = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    const user = req.user;
    const userId = user.userId;
    let course = req.body.course, previousCourse;
    console.log(req.body);
    let courseUpdated = false, courseLinksUpdated = false;

    try {
        previousCourse = await Course.findById(course._id);
        console.log("Course: ", previousCourse);

        await Course.findByIdAndUpdate(course._id, {
            name: course.courseName,
            professor: course.professor,
            description: course.description 
        });

        courseUpdated = true;
        //we update links
        course.links.forEach(async (element) => {
            await CourseLink.findByIdAndUpdate(element._id, {
                className: element.className,
                classLink: element.classLink
            });
        });

        courseLinksUpdated = true;

        res.status(200);
        res.send({"msg": "Course Updated successfully!"});
    }
    catch (err) {
        console.log("Err: ", err);
        if (courseUpdated && (!courseLinksUpdated)) {
            await Course.findByIdAndUpdate(course._id, {
                name: previousCourse.name,
                professor: previousCourse.professor,
                description: previousCourse.description
            });
        }
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
}