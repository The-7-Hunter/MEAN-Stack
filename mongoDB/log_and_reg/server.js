var express = require('express');
var app = express();

const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8000, () => {
    console.log("we are at port 8000!");
});
