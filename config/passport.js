const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const connection = require('./database');
const student = connection.models.student;
const { validatePassword } = require('../lib/passwordUtils');

const customFields = {
    usernameField: 'uname',
    passwordField: 'pwd'
};

const verifyCallback = (username, password, done) => {
    student.findOne({username: username})
            .then((user) => {
                if (!user) {
                    return done(null, false);
                }
                
                const isValid = validatePassword(password);

                if (isValid) {
                    return done(null, student);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => {
                done(err);
            })
};

const strategy = new localStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    student.findById(userId)
            .then((user) => {
                done(null, user);
            })
            .catch(err => done(err));
});