var express = require('express');
var app = express();

app.use(express.static(__dirname + "public"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// this is an alternative way to do it using arrow functions
// var server = app.listen(8000, () => console.log("listening on port 8000!"));
// skip it for the sake of readabillity
// setting the server
var server = app.listen(8000, function () {
    console.log("listening on port 8000!");
});


app.get('/', function(req, res){
    res.render('index');
})


const io = require('socket.io')(server);
io.on('connection', function(socket){
    console.log("we are connected to a socket!", socket.id);
    socket.on('post_form', function(data){
        io.sockets.emit('show', {info: data.info})
    })
});

