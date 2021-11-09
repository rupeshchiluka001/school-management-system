const router = require('express').Router;
const passport = require('passport');
// const passwordUtils = require('../lib/passwordUtils');
const connection = require('../config/database');
// const user = connection.models.user;

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/login-success'
}), (req, res, next) => {});