const mongoose = require('mongoose');
const quotes = require('../controllers/quotes');

module.exports = function (app) {
    app.get('/', (req, res) => {
        quotes.index(req, res);
    });

    app.get('/quotes', (req, res) => {
        quotes.find(req, res);
    });

    app.post('/quotes', (req, res) => {
        quotes.create(req, res);
    });

    app.put('/quotes', (req, res) => {
        quotes.edit(req, res);
    });

    app.get('/quotes/:id', (req, res) =>{
        quotes.findByID(req, res);
    });

    app.delete('/quotes', (req, res) =>{
        quotes.delete(req, res);
    });
}