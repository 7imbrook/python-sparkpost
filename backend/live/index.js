require('isomorphic-fetch');
const debug = require('debug')('backend:live'),
      apiai = require('apiai'),
      querystring = require('querystring').stringify,
      flatMap = require('flatmap')
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
                        debug('fulfillment');
                        acc({
                            message: response.result.fulfillment.speech,
                            control: {
                                listen: true
                            }
                        });
                    } else {
                        debug('searching');
                        const query = querystring({
                            q: response.result.parameters.brand + ' shoe',
                            key: 'AIzaSyBLFZunayhJJv_opd5endbUJROby0c9N90',
                            cx: '003527602726096819603:zhnvulhmery',
                            fields: 'items/pagemap/imageobject(description,contenturl,name)',
                        });
                        fetch(`https://www.googleapis.com/customsearch/v1?${query}`)
                            .then(res => res.json())
                            .then(images => {
                                const image_urls = flatMap(images.items, item => item.pagemap.imageobject.map(image => image));
                                const soft_filter = image_urls.filter(img => img.contenturl);
                                const hard_filter = image_urls.filter(img => img.contenturl && (img.description || img.name));
                                return hard_filter.length > 0 ? hard_filter : soft_filter;
                            })
                            .then(res => {
                                if (res.length > 0) {
                                    return res[0]
                                } else {
                                    throw 'No Results';
                                }
                            })
                            .then(result => {
                                acc({
                                    message: result.description || result.name || 'Here is what I found',
                                    image: result.contenturl,
                                });
                            })
                            .catch(err => {
                                debug(err);
                                acc({
                                    message: 'I\'m sorry I couldn\'t help you',
                                });
                            });
                    }
                } break;
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
                } break;
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
                if (response.image) {
                    socket.emit('image', response.image);
                }
                if (response.message) {
                    socket.emit('message', response.message);
                }
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