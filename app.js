const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const path = require('path');
const routes = require('./routes');
const libraryRoutes = require('./routes/library');
const hostelRoutes = require('./routes/hostel');
const tsRoutes = require('./routes/ts');
const connection = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config;

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname+'/public'));

app.use(cookieParser());

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    collectionName: 'sessions'
}, dbOptions);

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 604800000 // 7 days
    }
}));

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

//routes after other middleware, and before error handler
app.use('/api', routes)
app.use('/api/library', libraryRoutes);
app.use('/api/hostel', hostelRoutes);
app.use('/api/ts', tsRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'))
});

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000...");
});
