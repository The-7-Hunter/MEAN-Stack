//connect to socket.io on the backend

var socket = io.connect('http://localhost:8000');

//get and store the front end comms
var output = document.getElementById('output');
var message = document.getElementById('message');
var message1 = document.getElementById('message1');
var message2 = document.getElementById('message2');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var feedback = document.getElementById('feedback');

//Emit events

btn.addEventListener('click', function(){
    //send to web front_socket
    socket.emit('chat',{
        message: message.value,
        message1: message1.value,
        message2: message2.value,
        handle: handle.value,
        
    });
});

//Listen for events (incoming messages)
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>' + data.message1 + data.message2;
});
