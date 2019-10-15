var express = require('express');
var mongoose = require('mongoose');
var app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

mongoose.connect('mongodb://localhost/messages', { useNewUrlParser: true , useUnifiedTopology: true});

const CommentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    comment: {type: String, required: true}
}, {timestamps: true})

const MessageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    message: {type: String, required: true},
    comments: [CommentSchema]
}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema);
const Message = mongoose.model('Message', MessageSchema);

app.get('/', (req, res) => {
    Message.find().sort({ _id: -1 })
        .then(data => res.render("index", { messages: data }))
        .catch(err => res.json(err));
});

app.post('/message/add', (req, res) => {
    const message = req.body;
    Message.create(message)
        .then(newMessage => res.redirect("/"))
        .catch(err => res.json(err));
});

app.post('/comment/add/:id', (req, res) => {
    const comment = req.body;
    Comment.create(comment)
        .then(newComment => {
            Message.findOneAndUpdate({_id: req.params.id}, {$push: {comments: newComment}})        
            .then(data => res.redirect("/"))
        })
        .catch(err => res.json(err));
});

app.listen(8000, () => console.log("listening on port 8000"));