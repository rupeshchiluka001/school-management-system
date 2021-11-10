const router = require('express').Router;
const passport = require('passport');
const { genPassword } = require('../lib/passwordUtils');
const connection = require('../config/database');
const User = connection.models.User;

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/'}));

router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.pwd);

    const newUser = new User({
        name: req.body.uname,
        hash: saltHash.hash,
        salt: saltHash.salt,
        gender: req.body.gender,
        DOB: req.body.dob,
        email: req.body.email,
        role: req.body.role,
    });

    newUser.save()
        .then((user) => {
            console.log("Successfully user registered!!");
            console.log(user);
            console.log("🕺🕺🕺🕺🕺🕺🕺🕺");
        })
});

router.get('logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;