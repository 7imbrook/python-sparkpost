const moment = require('moment'),
      simpleWeather = require('simple-weather')({units: "imperial"}),
      debug = require('debug')('backend:recomend')
;

module.exports = (day, mood) => {
    const now = moment();
    const request_date = moment(day);

    return simpleWeather["v2.5"].current.byCityName("Rochester", "ny").then(res => {
        
        const weather = res.weather.map(forcast => forcast.description).join('/');

        // Same day
        if (now.isSame(request_date, 'day') ) {

            return { 
                message: `Today looks ${weather}, you should where your Vans`,
                image: 'https://s-media-cache-ak0.pinimg.com/originals/ce/c4/24/cec4240b9bd572dffa468969bfaae688.jpg'
            };

        }

        return { message: 'I can\'t seem to help you.' };
    });


}