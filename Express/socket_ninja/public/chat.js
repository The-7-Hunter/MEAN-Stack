// make connection
var socket = io.connect("http://localhost:8000");

// Query DOM
var name = document.getElementById('name');
var location = document.getElementById('location');
var language = document.getElementById('language');
var comments = document.getElementById('comments');
var btn = document.getElementById('btn');
var output = document.getElementById('output');

// Emit events, to emit somthing to the server, 
// Basically EMIT = send to the server
btn.addEventListener('click', function(){
    socket.emit('form', {
        name: name.value,
        location: location.value,
        language: language.value,
        comments: comments.value,
    })
})

// handle events 
socket.on('form', function(info){
    output.innerHTML += info.name + " " + info.location + " " + info.language + " " + info.comments ;
})