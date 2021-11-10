const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
var routes = require('./routes');
var connection = require('./config/database');

require('dotenv').config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const sessionStore = MongoStore.create({
    // mongoUrl: process.env.DB_STRING,
    mongoUrl: 'mongodb://localhost:27017/sms',
    collectionName: 'sessions'
}, dbOptions);

app.use(session({
    // secret: process.env.SECRET,
    secret: 'y5@@)C`ttM&:xxu9!`8sf[(&6S;M#"B%',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 7*1000*60*60*24 // 7 days
    }
}));

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

//routes after other middleware, and before error handler
app.use(routes)

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.listen(3000, () => {
    console.log("Server is running at port 3000...");
});