const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hvbmdtYSIsImEiOiJjazhmcWFkbG0wMG5lM21vdnk1N3RocDdhIn0.PJgUI6f9l03kjmzAoefZ6g&limit=1`;
    // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=zzpk.eyJ1IjoiY2hvbmdtYSIsImEiOiJjazhmcWFkbG0wMG5lM21vdnk1N3RocDdhIn0.PJgUI6f9l03kjmzAoefZ6g&limit=1`;
    // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/xvchvhc.json?access_token=pk.eyJ1IjoiY2hvbmdtYSIsImEiOiJjazhmcWFkbG0wMG5lM21vdnk1N3RocDdhIn0.PJgUI6f9l03kjmzAoefZ6g&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the map service");
        } else if (body.message) {
            callback(body.message);
        } else if (body.features.length == 0) {
            callback("Unable to find location.  Try another search.");
        } else {
            const location = body.features[0].place_name;
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            callback(undefined, { location, latitude, longitude })
        }
    });
};

module.exports = geocode