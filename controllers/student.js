const Student = require('../models/student');
const PER_PAGE = 5;

exports.getUserDashboard = async(req, res) => {
    let page = req.params.page || 1;
    const studentId = req.student._id;
}