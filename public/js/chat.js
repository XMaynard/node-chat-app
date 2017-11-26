let socket = io();
    
function scrollToBottom () {
    //selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();
    
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

    socket.on('connect', function(){
        let params =jQuery.deparam(window.location.search);
        
        socket.emit('join', params, function(err){
            if(err){
                alert(err);
                window.location.href ='/';
            } else{
               console.log('No error'); 
            }
        });
    });

socket.on('disconnect', function (){
       console.log('Disconnected from the server'); 
    });

socket.on('updateUserList', function(users){
    let ol = jQuery('<ol></ol>');
    
    users.forEach(function (user) {
       ol.append(jQuery('<li></li>').text(user));
    });
    
    jQuery('#users').html(ol);
    
});

socket.on('newMessage', function(message){
    let formattedTime = moment(message.createAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createAt: formattedTime
    });
    
    jQuery('#messages').append(html);
    scrollToBottom();

});

socket.on('newLocationMessage', function(message){
    
    formattedTime = moment(message.createAt).format('h:mm a');
   let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});



jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    
    let messageTextBox = jQuery('[name=message]');
    
    socket.emit('createMessage',{
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