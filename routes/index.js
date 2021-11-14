const router = require('express').Router();
const passport = require('passport');
const { genPassword } = require('../lib/passwordUtils');
const connection = require('../config/database');
const User = connection.models.User;

// router.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/'})
router.post('/login', passport.authenticate('local'), (req, res, next) => {
    let role = req.user.role;
    res.status(200);    
    console.dir(res.cookie);
    res.cookie('role', role, {maxAge: 604800000, httpOnly: false});
    res.send(role);
    console.dir(req.cookies);
    console.dir(res.req.session);
});

router.post('/register', (req, res, next) => {
    console.log(req.body);
    const saltHash = genPassword(req.body.password);

    const newUser = new User({
        name: req.body.name,
        hash: saltHash.hash,
        salt: saltHash.salt,
        gender: req.body.gender,
        DOB: req.body.DOB,
        email: req.body.email,
        role: req.body.role,
    });

    newUser.save()
        .then((user) => {
            console.log("Successfully user registered!!");
            console.log(user);
            console.log("🕺🕺🕺🕺🕺🕺🕺🕺");
            res.status(200);
            res.send("Successfully user registered!!");
        })
});

router.get('/logout', (req, res, next) => {
    console.log("Checking");
    console.log(res.req.session);
    console.log(res.req.sessionID);
    if ( req.isAuthenticated() ) {
        console.log("logged in");
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.clearCookie('role');
        res.status(200);
        res.send("User logged In!!");
    }
    else {
        console.log("not logged");
        res.status(401);
        res.send("User not logged In!!");
    }
});

module.exports = router;