const mongoose = require('mongoose');
const message = require('../controllers/messages');

module.exports = function (app) {
    app.get('/', (req, res) => {
        message.index(req, res);
    });

    app.post('/message/add', (req, res) => {
        message.addMessage(req, res);
    });

    app.post('/comment/add/:id', (req, res) => {
        message.addComment(req, res);
    });
}