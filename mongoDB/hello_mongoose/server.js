const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

require('./server/models/model');
require('./server/config/routes.js')(app)

app.listen(9000, () => console.log("listening on port 9000"));