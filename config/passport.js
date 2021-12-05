const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = require('../models/user');
const { validatePassword } = require('../lib/passwordUtils');

const verifyCallback = ((username, password, done) => {
    User.findOne({name: username})
        .then((user) => {
            if (!user) return done(null, false);

            const isValid = validatePassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
        .catch(err => done(err))
});

const strategy = new localStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err));
});