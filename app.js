const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const path = require('path');
const routes = require('./routes');
const libraryRoutes = require('./routes/library');
const connection = require('./config/database');
const cors = require('cors');

require('dotenv').config;

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname+'/public'));

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
app.use('/api', routes)
app.use('/api/library', libraryRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'))
});

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000...");
});
