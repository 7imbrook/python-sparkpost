var debug = require('debug')('backend:live');

let match_functions;

function greeting(message, res) {
    debug('Hello');
    res('Hello');
}

function sayCurrentTime(message, res) {
    debug('time');
    const now = new Date();
    res(`It is currently ${now.getHours()}:${now.getMinutes()}`);
}

const matching = {
    
    time: sayCurrentTime,
    time_match(message) {
        return message.match(/.*(time).*/);
    },

    hello: greeting,
    hello_match(message) {
        return message.match(/(hi|hello)/);
    }

}

function onConnection(socket) {
    debug('Connected user');
    socket.emit('message', 'How can I help you?');
    socket.emit('control', { listen: true });

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