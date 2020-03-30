const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d6c3045314cdb0ad994d6f1125a2f7ea/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback('Unable to connect to weather service!', undefined)
        else if (body.error)
            callback('Unable to find location', undefined)
        else {
            currently = body.currently
            callback(undefined, body.daily.data[0].summary + " It is currently " + currently.temperature + " degrees out, There is a " + currently.precipProbability * 100 + "% chance of rain. The highest tempature today will be " + body.daily.data[0].temperatureHigh + ", and the lowest tempature today will be " + body.daily.data[0].temperatureLow)
        }
    })
}
module.exports = forecast
