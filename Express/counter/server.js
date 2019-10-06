const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/static"));

const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.get('/', (req, res) => {
    if ('counter' in req.session) {
        req.session.counter += 1;
        // res.render("index", {counter: req.session.counter });

    }
    else {
        req.session.counter = 0;
        // res.render("index", {counter: req.session.counter });

    }
    res.render("index", {counter: req.session.counter });
    console.log("Value of name in session: ", req.session.counter);
});

app.listen(8000, () => console.log("listening on port 8000"));