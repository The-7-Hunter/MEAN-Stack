var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

var server = app.listen(8000, () => {
    console.log("running on port 8000!");
})
app.get('/', (req, res) => {
    res.render('index');
})

var io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log("Connected to socket with id:", socket.id);

    // emit the value passed by the user to the server
    // in this case it is either 1, 2, or 3 
    // each one coresponds to the button indicating each color
    socket.on('click', (data) => {
        io.sockets.emit('change', data);
    });

});