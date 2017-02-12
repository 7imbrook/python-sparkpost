const debug = require('debug')('backend:live'),
      natural = require('natural'),
      NGrams = natural.NGrams,
      metaphone = natural.Metaphone,
      fs = require('fs');
;

const tokenizer = new natural.WordTokenizer(),
      nounInflector = new natural.NounInflector()
;

// Load in brands
const brands = fs.readFileSync(__dirname + '/../data/brands.txt')
    .toString('utf8')
    .split('\n')
    .filter(b => b)
    .map(b => nounInflector.singularize(b));

function handleMessage(message) {
    const striped = message.replace(/'/, '');
    const tokens = tokenizer.tokenize(striped);

    const found_brands = brands.filter(brand => {
        return tokens
            .map(token => natural.JaroWinklerDistance(nounInflector.singularize(token), brand))
            .reduce((acc, cur) => acc || cur > 0.9, false);
    });

    if (found_brands.length > 0) {
        return found_brands;
    }

    // rank
    return 'I didn\'t understand that';
}

function onConnection(socket) {
    debug('Connected user ' + socket.id);
    // socket.emit('message', 'Welcome to Sneak Speak.');
    // socket.emit('message', 'Say something');
    socket.on('message', (msg) => {
        const response = handleMessage(msg);
        debug(response);
        socket.emit('message', response);
    });

    // Test classes
    [
        'What shoes should I wear today?',
        'How are my shoes?',
        'I want to run today.',
        'I\'m going for a run today',
        'I\'ve got a date later',
        'Whats new?',
        'Let\'s go old school today',
        'What vans should I wear?',
        'Show me vans.',
    ].forEach((test) => debug(handleMessage(test)));
}

module.exports = (io) => {
    debug('Loaded');
    io.of('/socket/message')
        .on('connection', onConnection);
};