const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);


//middleware
app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('New user connected');

    socket.emit('newEmail', {
                from: 'mike@example.com',
                text: 'Hey, What is going on.',
                createdAt: 123
        });      
    
    
// received from client
    socket.on('createEmail', (newEmail) =>{
        console.log('createEmail', newEmail);
    });
    
    socket.on('createMessage', (message) =>{
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
    
    socket.on('disconnect', () => {
              console.log('User was Disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on Port ${port}`);
});