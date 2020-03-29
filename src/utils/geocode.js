const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXZpbG9sIiwiYSI6ImNrN3VmM2ZtMDA0NGIzZW8yY2w2Yjlvc2EifQ.4geHeBeDchiPyfimPA3kkg&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback('Unabale to connect to location services!', undefined)
        else if (body.features.length === 0)
            callback('Unable to find location. Try another search', undefined)
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}
module.exports = geocode