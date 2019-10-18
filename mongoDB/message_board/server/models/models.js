const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    comment: {type: String, required: true}
}, {timestamps: true})

const MessageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    message: {type: String, required: true},
    comments: [CommentSchema]
}, {timestamps: true})

mongoose.model('Comment', CommentSchema);
mongoose.model('Message', MessageSchema);
