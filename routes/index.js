const router = require('express').Router();
const passport = require('passport');
const { genPassword } = require('../lib/passwordUtils');
const connection = require('../config/database');
const User = require('../models/user');

router.get('/user-details', (req, res, next) => {
    res.send(req.user);
});

// router.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/'})
router.post('/login', passport.authenticate('local'), (req, res, next) => {
    let role = req.user.role;
    res.status(200);  
    res.cookie('role', role, {maxAge: 604800000});
    res.cookie('id', req.user._id, {maxAge: 604800000});
    res.send({"msg": "Login Successful"});
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
        res.send({"msg": "A user already registered with same email"});
        return;
    }

    if (await User.findOne({email: req.body.email}).exec()) {
        res.status(204);
        res.send({"msg": "A user already registered with same username"});
        return;
    }

    newUser.save()
        .then((user) => {
            res.status(200);
            res.send({"msg": "Successfully user registered!!"});
        })
        .catch(err => {
            res.status(401);
            res.send({"msg": `Not able to create User, try again later.Err: ${err}`});
        })
});

router.get('/logout', (req, res, next) => {
    if ( req.isAuthenticated() ) {
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.clearCookie('role');
        res.status(200);
        res.send({"msg": "User logged Out!!"});
    }
    else {
        res.status(401);
        res.send({"msg": "User not logged In!!"});
    }
});

module.exports = router;