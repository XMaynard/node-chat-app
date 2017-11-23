let socket = io();
    
    socket.on('connect', function(){
       console.log('Connected to server'); 
        //send to server from client/web form
        socket.emit('createEmail', {
           to: 'Jen@example.com',
           subject: 'Hey. This is BigO'
        });
        
        socket.emit('createMessage', {
           From: 'Jen@example.com',
           text: 'Hey. This is BigO!'
        });
    });
    
//receive from server
socket.on('newEmail', function(email){
   console.log('New email', email); 
});

socket.on('newMessage', function(message){
   console.log('New Message', message); 
});



socket.on('disconnect', function (){
       console.log('Disconnected from the server'); 
    });