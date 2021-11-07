const mongoose = require('mongoose');
const express = require('express');
const Router = require('./routes');

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