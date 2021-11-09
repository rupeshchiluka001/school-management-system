const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
var crypto = require('crypto');
// var routes = require('./routes');
// var connection = require('./config/database');

require('dotenv').config;
/*
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/sms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connected Successfully");
});

app.use(Router);

app.listen(3000, () => {
    console.log("Server is running at port 3000...");
});
*/

/*/////////////////////////////////////////////////////*/

const app = express();

// const connection = mongoose.createConnection('mongodb://localhost:27017/sms', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

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

// app.use(routes)

//routes after other middleware, and before error handler

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", () => {
//     console.log("Connected Successfully");
// });

// app.use(Router);

app.get('/', (req, res) => {
    res.send('<h1>Hello World (sessions)!</h1>');
    // console.log(req.session);
    // console.log(req.sessionID);
});

app.listen(3000, () => {
    console.log("Server is running at port 3000...");
});