const express = require('express');
const StudentModel = require('./student');
const app = express();

app.post("/addStudent", async (req, res) => {
    const student = new StudentModel(req.body);
    
    try {
        await student.save();
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/students", async (req, res) => {
    const students = await StudentModel.find({});

    try {
        res.send(students);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;