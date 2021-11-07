const passport = require('passport');

const Admin = require('../models/admin');
const Librarian = require('../models/librarian');
const Professor = require('../models/professor');
const Student = require('../models/student');

exports.getAdminLogout = (req, res) => {
    req.logout();
    res.redirect("/");
};

exports.postAdminSignup =  async (req, res) => {
    //
}