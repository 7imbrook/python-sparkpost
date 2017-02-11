var debug = require('debug')('backend:live');

module.exports = (io) => {
    debug('Loaded');
    io.of('/api/message')
        .on('connection', (socket) => {
            socket.emit('message', 'Hello Shoe Person, Say something.');
            socket.emit('control', { listen: true });
            socket.on('message', (message) => {
                debug(message);
                socket.emit('control', { listen: false });
                socket.emit('message', 'Thanks, you said ' + message);
            });
        });
};