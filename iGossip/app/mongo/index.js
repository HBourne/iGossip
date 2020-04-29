var express = require("express");
var app = express();

// Establish connection to MongoDB
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connnection error:'));
db.once('open', () => {
    console.log("Connected to MongoDB!");
});

// Start app
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// APIs for comments
var Comment = require("./comment");

app.get("/comment", (req, res, next) => {
    Comment.find({}, (err, result) => {
        if (err) console.log(err);
        res.json(result);
    })
});

app.post("/comment", (req, res, next) => {
    const comment = new Comment({
        user: 1,
        content: "a"
    });

    comment.save((err, result) => {
        if (err) res.json({
            message: err
        });
        else res.sendStatus(200);
    })
});

// APIs for courses
var Course = require("./course");

app.get("/course", (req, res, next) => {
    code = req.query.val;
    Course.find({ Hash_Val: code }, (err, result) => {
        if (err) console.log(err);
        res.json(result)
    })
});