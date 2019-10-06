const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/static"));


app.get('/', (request, response) => {
    response.send("Hello Express");
});

app.get('/new', (request, response) => {
    response.send("this is new");
});

app.get('/users', (request, response) => {
    var users_array = [
        {name : "nawaf", email: "nawaf@site.sa"},
        {name : "nawaf", email: "nawaf@site.sa"},
        {name : "nawaf", email: "nawaf@site.sa"},
        {name : "nawaf", email: "nawaf@site.sa"},
        {name : "nawaf", email: "nawaf@site.sa"},
    ];
response.render("users", {"users": users_array})});

app.get('/cars', (request, response) => {
    response.render("cars")
});

app.get('/cats', (request, response) => {
    response.render("cats")
});
app.listen(8000, () => console.log("listening on port 8000"));