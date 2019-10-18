const mongoose = require('mongoose');
const Quote = mongoose.model('Quote');

module.exports = {
    index: (req, res) => {
        res.render('index')
    },
    find: (req, res) => {
        Quote.find().sort({ _id: -1 })
            // .then(data => res.render("quotes", { quotes: data }))
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        const quote = new Quote(req.body);
        quote.save()
            .then(() => res.redirect('/quotes'))
            .catch((err) => {
                console.log("We have an error!", err);
                res.redirect('/');
            });
    },
}