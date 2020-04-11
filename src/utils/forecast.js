const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/02e06ad28c839d56d5f2cbde1d4bbe0e/${latitude},${longitude}?units=us&lang=en`;
    // const url = "https://api.darksky.net/forecast/zz02e06ad28c839d56d5f2cbde1d4bbe0e/37.8267,-122.4233?units=us&lang=en";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!")
        } else if (body.error) {
            const { code, error } = body;
            callback(`${code} : ${error}`);
        } else {
            const { temperature, precipProbability } = body.currently;
            const { summary } = body.daily.data[0];
            callback(undefined, `${summary} It is currently ${temperature} degrees out.  There is a ${precipProbability}% chance of rain.`);
        }
    });
}

module.exports = forecast
