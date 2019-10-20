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

    findByID: (req, res) => {
        Quote.find({ _id: req.params.id })
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
    edit: (req, res) => {
        console.log("data updated", req.body);
        Quote.updateOne({ _id: req.body._id }, { name: req.body.name, quote: req.body.quote })
            .then(data => {
                console.log("data updated", data);
                res.json({ data: data })
            })
            .catch(err => res.json(err));
    },
    delete: (req, res) => {
        Quote.findOneAndDelete({ _id: req.query._id })
            .then(data => {
                res.json(data);
            })
            .catch(err => res.json(err));
    }
}