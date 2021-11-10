const Student = require('../models/student');
const PER_PAGE = 5;

exports.getUserDashboard = async(req, res) => {
    let page = req.params.page || 1;
    const studentId = req.student._id;
}

exports.getUserProfile = (req, res, next) => {
    let student = req.user.obj;
    res.send({
        "studentName": student.name,
        "studentAge": student.age,
        "studentGender": student.gender,
        "studentRollNo": student.rollNo,
        "studentDateOfBirth": student.DOB,
        "studentEmail": student.email,
        "isHosteller": student.Hosteller,
        "studentJoinedOn": student.joined
    });
    next();
}