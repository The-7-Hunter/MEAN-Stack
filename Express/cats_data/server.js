const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/static"));


app.get('/', (request, response) => {
    response.send("Hello Express");
});

app.get('/cats', (request, response) => {
    response.render("cats_data");
});

app.get('/data1', (request, response) => {
    var info = { name: "Ash", age: 3, img: "cat1", sleep: ["earth", "sky", "hell"] };
    response.render("data", cat_info = info);
});

app.get('/data2', (request, response) => {
    var info = { name: "Spark", age: 10, img: "cat2", sleep: ["water", "bed"] };
        response.render("data", cat_info = info);
});

app.listen(8000, () => console.log("listening on port 8000"));