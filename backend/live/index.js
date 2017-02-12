const debug = require('debug')('backend:live'),
      apiai = require('apiai')
;

const app = apiai(process.env.APIAI_TOKEN);

// LOL, total hack
let contexts_hold = {};

function handleMessage(message, sessionId) {
    let contexts = contexts_hold[sessionId];
    return new Promise((acc, reject) => {
        const request = app.textRequest(message, {
            sessionId, contexts
        });
        request.on('response', (response) => {
            contexts_hold['sessionId'] = response.result.contexts;
            debug(response.result);
            debug(response.result.parameters);
            debug(response.result.fulfillment);
            switch (response.result.action) {
                case 'display':
                {
                    if (response.result.fulfillment.speech != '') {
                        acc({
                            message: response.result.fulfillment.speech,
                            control: {
                                listen: true
                            }
                        });
                    } else {
                        acc({ message:`Here's are some ${response.result.parameters.brand} that you might like` });
                    }
                }
                case 'recommend':
                {
                    if (response.result) {
                        acc({
                            message: response.result.fulfillment.speech,
                            control: {
                                listen: true
                            }
                        });
                    }
                }
                default:
                    acc({ 
                        message: response.result.fulfillment.speech,
                        control: {
                            listen: response.result.actionIncomplete
                        }
                    });
            }
        });
        request.on('error', reject);
        request.end();
    });
}

function onConnection(socket) {
    debug('Connected user ' + socket.id);
    // socket.emit('message', 'Welcome to Sneak Speak.');
    // socket.emit('message', 'Say something');
    socket.on('message', (msg) => {
        handleMessage(msg, socket.id)
            .then(response => {
                debug(response);
                socket.emit('message', response.message);
                if (response.control) {
                    socket.emit('control', response.control);
                }
            })
            .catch(err => debug.error(err));
    });

}

module.exports = (io) => {
    debug('Loaded');
    io.of('/socket/message')
        .on('connection', onConnection);
};