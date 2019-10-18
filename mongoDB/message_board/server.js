var express = require('express');
var mongoose = require('mongoose');
var app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

mongoose.connect('mongodb://localhost/messages', { useNewUrlParser: true , useUnifiedTopology: true});

require('./server/models/models');
require('./server/config/routes')(app);

app.listen(8000, () => console.log("listening on port 8000"));