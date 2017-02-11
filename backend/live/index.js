var debug = require('debug')('backend:live');

module.exports = (io) => {
    debug('Loaded');
    io.of('/api/message')
        .on('connection', (socket) => {
            socket.emit('message', 'Hello my fellow shoe lover');
        });
};