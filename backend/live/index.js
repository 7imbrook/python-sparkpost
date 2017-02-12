const   debug = require('debug')('backend:live'),
        matching = require('./simple_matches');

let match_functions;

function onConnection(socket) {
    debug('Connected user');
    socket.emit('message', 'How can I help you?');
    
    let isSpeaking = false;
    socket.on('isSpeaking', (change) => isSpeaking = change);

    function sendResponse(response) {
        if (!isSpeaking) {
            socket.emit('message', response);
        } else {
            setTimeout(() => sendResponse(response), 200);
        }
    }

    // Standard message control
    socket.on('message', (message) => {
        socket.emit('control', { listen: false });
        debug(message);
        for (const matcher in match_functions) {
            if (match_functions[matcher](message)) {
                matching[matcher](message, (response) => {
                    sendResponse(response);
                });
                break;
            }
        }
    });
}


module.exports = (io) => {
    match_functions = Object.keys(matching)
        .filter(key => !key.match(/.*_match/))
        .reduce((acc, fn_name) => {
            acc[fn_name] = matching[fn_name + '_match'];
            return acc;
        }, {});
    debug('Loaded');
    debug(match_functions);
    io.of('/socket/message')
        .on('connection', onConnection);
};