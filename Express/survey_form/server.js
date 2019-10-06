const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render("index");
}); 

app.post('/show', (req, res) => {
    res.render("show", {
        name: req.body.name, 
        location: req.body.location,
        language: req.body.language,
        comments: req.body.comments,
    })
})
app.listen(8000, () => console.log("listening on port 8000"));