var express = require('express');
var socket = require('socket.io');

var app = express();

// this is an alternative way to do it using arrow functions
// var server = app.listen(8000, () => console.log("listening on port 8000!"));
// skip it for the sake of readabillity
// setting the server
var server = app.listen(8000, function () {
    console.log("listening on port 8000!");
});

// serve content using express
app.use(express.static('public'));

// pass server to socket, like saying that hey socket work on this server 
var io = socket(server);

// ON means hey server listen to this action then trigger
io.on('connection', function(socket){
    console.log("we are connected to a socket!", socket.id);
    socket.on('form', function(info){
        io.sockets.emit('form', info);
    });
})
