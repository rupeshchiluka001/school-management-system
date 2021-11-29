const router = require('express').Router();
const passport = require('passport');
const { genPassword } = require('../lib/passwordUtils');
const connection = require('../config/database');
const User = require('../models/user');

router.get('/user-details', (req, res, next) => {
    console.log(req.user);
    res.send(req.user);
});

// router.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/'})
router.post('/login', passport.authenticate('local'), (req, res, next) => {
    let role = req.user.role;
    console.log("Login:", req.user);
    res.status(200);    
    console.dir(res.cookie);
    res.cookie('role', role, {maxAge: 604800000});
    res.cookie('id', req.user._id, {maxAge: 604800000});
    res.send(role);
    console.dir(req.cookies);
    console.dir(res.req.session);
});

router.post('/register', async (req, res, next) => {
    const saltHash = genPassword(req.body.password);

    const newUser = new User({
        name: req.body.name,
        hash: saltHash.hash,
        salt: saltHash.salt,
        gender: req.body.gender,
        DOB: req.body.DOB,
        email: req.body.email,
        motherName: req.body.motherName,
        fatherName: req.body.fatherName,
        role: req.body.role,
    });

    if (await User.findOne({email: req.body.email}).exec()) {
        res.status(204);
        res.send("A user already registered with same email");
        return;
    }

    if (await User.findOne({email: req.body.email}).exec()) {
        res.status(204);
        res.send("A user already registered with same username");
        return;
    }

    newUser.save()
        .then((user) => {
            res.status(200);
            res.send("Successfully user registered!!");
        })
        .catch(err => {
            res.status(401);
            res.send("Not able to create User, try again later.Err: ",err);
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