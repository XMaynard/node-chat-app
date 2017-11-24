let socket = io();
    
    socket.on('connect', function(){
       console.log('Connected to server');   
    });

socket.on('disconnect', function (){
       console.log('Disconnected from the server'); 
    });

socket.on('newMessage', function(message){
    let formattedTime = moment(message.createAt).format('h:mm a');
   console.log('New Message', message); 
    let li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    formattedTime = moment(message.createAt).format('h:mm a');
   let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    
    li.append(a);
    jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    
    let messageTextBox = jQuery('[name=message]');
    
    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('')
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    
    locationButton.attr('disabled', 'disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
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