function greeting(message, res) {
    debug('Hello');
    res('Hello');
}

function sayCurrentTime(message, res) {
    debug('time');
    const now = new Date();
    res(`It is currently ${now.getHours()}:${now.getMinutes()}`);
}

module.exports = {
    
    time: sayCurrentTime,
    time_match(message) {
        return message.match(/.*(time).*/);
    },

    hello: greeting,
    hello_match(message) {
        return message.match(/(hi|hello)/);
    },

    dank(msg, res) {
        const re = /I'm (.*)/;
        const matches = re.exec(msg);
        const response = `Hi ${matches[1]}! I'm shoe advisor.`;
        res(response);
    },
    dank_match(message) {
        return message.match(/I'm (.*)/);
    },

}