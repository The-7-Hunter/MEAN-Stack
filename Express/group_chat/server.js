var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

var server = app.listen(8000, () => console.log("we are running at 8000!"));

app.get('/', (req, res) => {
    res.render('index');
});

var io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log("we are connected with socket and id:", socket.id);
    socket.on('msg', (data) => {
        io.sockets.emit('show', data);
    });
});