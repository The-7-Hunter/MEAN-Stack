var mongoose = require('mongoose')
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

mongoose.connect('mongodb://localhost/animals', { useNewUrlParser: true });

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    habitat: { type: String, required: true },
});

const Animal = mongoose.model('Animal', AnimalSchema);

// Main page with all animals listed
app.get('/', (req, res) => {
    Animal.find()
        .then(data => res.render('index', { animals: data }))
        .catch(err => res.json(err));
});

// add new animal 
app.get('/new_form', (req, res) => {

    res.render('new_animal');
});

// post handler for new animal
app.post('/new', (req, res) => {
    const new_animal = new Animal(req.body);
    new_animal.save()
        .then(() => {
            console.log("animal added with info:", req.body.name,
                req.body.type, req.body.habitat);
            res.redirect('/');
        })
        .catch(err => {
            res.json(err);
            res.redirect('/new_form')
        });
});

// display single animal along with its information
app.get('/:id', (req, res) => {
    // if we use find method, it well return an array containing single object
    // findOne returns one opject which is much easier to access
    Animal.findOne({ _id: req.params.id })
        .then(data => {
            res.render('animal', { animal: data });
        })
        .catch(err => {
            res.json(err);
            res.redirect('/');
        });
});

// edit animal info 
app.get('/:id/edit', (req, res) => {
    Animal.findOne({ _id: req.params.id })
    .then(data => {        
        res.render('edit_form', { animal: data });
    })
    .catch(err => {
        res.json(err);
        res.redirect('/:id');
    })
});

// post handler for editting animal info
app.post('/:id/edit_process', (req, res) => {
    console.log(req.params.id);
    Animal.findOne({_id: req.params.id})
    .then(animal =>{
        animal.name = req.body.name;
        animal.type = req.body.type;
        animal.habitat = req.body.habitat;
        
        return animal.save();
    })
    .then((animal) => res.redirect('/' + animal.id))
    .catch(err => json(err));
})

// post handler fo deleting animal :(
app.post('/:id/delete', (req, res) => {
    Animal.findOne({_id: req.params.id})
    .then((animal) => {
        animal.remove();
        console.log("removed");
        res.redirect('/');
    })
    .catch(err => res.json(err));
});

app.listen(8000, () => {
    console.log("we are running at port 8000!");
});
