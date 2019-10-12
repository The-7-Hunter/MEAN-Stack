var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

var server = app.listen(8000, () => console.log("running on port 8000!"));

app.get('/', (req, res) => {
    res.render('index');
})

var counter = 0;
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log("connected with id:", socket.id);
    socket.on('add', () => {
        counter++
        io.sockets.emit('show', counter)
    });

    socket.on('reset', () => {
        counter = 0;
        io.sockets.emit('show', counter)
    });
})