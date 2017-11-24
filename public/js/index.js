let socket = io();
    
    socket.on('connect', function(){
       console.log('Connected to server');   
    });

socket.on('disconnect', function (){
       console.log('Disconnected from the server'); 
    });

socket.on('newMessage', function(message){
   console.log('New Message', message); 
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text:jQuery('[name=message]').val()
    }, function(){
        
    });
});

//receive from server
//socket.on('newEmail', function(email){
//   console.log('New email', email); 
//});

//send to server from client/web form
//    socket.emit('createEmail', {
//           to: 'Jen@example.com',
//           subject: 'Hey. This is BigO'
//        });

//Automatically send message
//socket.emit('createMessage', {
//    from: 'Frank',
//    text: 'Hello'
//}, function(data){
//    console.log('Got it', data);
//});