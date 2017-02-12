const moment = require('moment'),
      simpleWeather = require('simple-weather')({units: "imperial"}),
      debug = require('debug')('backend:recomend')
;

module.exports = (day, mood) => {
    const now = moment();
    const request_date = moment(day);

    return simpleWeather["v2.5"].current.byCityName("Rochester", "ny").then(res => {
        debug(res);

        // Same day
        if (now.isSame(request_date, 'day') ) {

            return { message: 'How about your Vans' };

        }

        return { message: 'I can\'t seem to help you.' };
    });


}