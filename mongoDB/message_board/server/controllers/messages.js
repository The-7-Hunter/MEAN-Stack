const moongoose = require('mongoose');
const Message = moongoose.model('Message');
const Comment = moongoose.model('Comment');

module.exports = {
    index: (req, res) => {
        Message.find().sort({ _id: -1 })
            .then(data => res.render("index", { messages: data }))
            .catch(err => res.json(err));
    },
    addMessage: (req, res) => {
        const message = req.body;
        Message.create(message)
            .then(newMessage => res.redirect("/"))
            .catch(err => res.json(err));
    },
    addComment: (req, res) => {
        const comment = req.body;
        console.log(comment);
        
        Comment.create(comment)
            .then(newComment => {
                Message.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: newComment } })
                    .then(data => res.redirect("/"))
            })
            .catch(err => res.json(err));
    }
}