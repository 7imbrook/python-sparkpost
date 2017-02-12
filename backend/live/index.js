const debug = require('debug')('backend:live'),
      natural = require('natural')
;

const tokenizer = new natural.WordTokenizer();
natural.LancasterStemmer.attach();

function handleMessage(message) {
    const striped = message.replace(/'/, '');
    
    const tokens = striped.tokenizeAndStem();
    debug(tokens);
}

function onConnection(socket) {
    debug('Connected user ' + socket.id);
    // socket.emit('message', 'Welcome to Sneak Speak.');
    // socket.emit('message', 'Say something');
    socket.on('message', handleMessage);

    // Test classes
    handleMessage('What shoes should I wear today?');
    handleMessage('How are my shoes?');
    handleMessage('I want to run today.');
    handleMessage('I\'m going for a run today');
    handleMessage('I\'ve got a date later');
    handleMessage('Whats new?');
    handleMessage('Let\'s go old school today');
}

module.exports = (io) => {
    debug('Loaded');
    io.of('/socket/message')
        .on('connection', onConnection);
};