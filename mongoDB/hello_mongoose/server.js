const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quote: {type: String, required: true}
}, {timestamps: { createdAt: true, updatedAt: false }});

const Quote = mongoose.model('Quote', QuoteSchema);

app.get('/', (req, res) => {
    res.render("index")
});

app.get('/quotes', (req, res) => {
    Quote.find().sort({_id: -1})
        .then(data => res.render("quotes", { quotes: data }))
        .catch(err => res.json(err));
});

app.post('/quotes', (req, res) => {
    
    const quote = new Quote(req.body);
    quote.save()
        .then(() => res.redirect('/quotes'))
        .catch((err) => {
            console.log("We have an error!", err);
            res.redirect('/');
        });
});

app.listen(9000, () => console.log("listening on port 9000"));