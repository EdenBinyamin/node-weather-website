const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const { request } = require('http')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectionPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static diractory to serve
app.use(express.static(publicDirectionPath))
app.get('', async (req, res)=>{
    firstMainCityforecastData = await geocode('tel-aviv, israel')
    secondMainCityForcastData = await geocode('new-york, usa')
    res.render('index',{
        firstMainCityName: firstMainCityforecastData.name,
        firstMainCityHumidity: firstMainCityforecastData.humadity,
        firstMainCityWindSpeed: firstMainCityforecastData.windSpeed,
        firstMainCityWeather: firstMainCityforecastData.weather,
        firstMainCityIconWeather: firstMainCityforecastData.iconWeather,
        secondMainCityName: secondMainCityForcastData.name,
        secondMainCityHumidity: secondMainCityForcastData.humadity,
        secondMainCityWindSpeed: secondMainCityForcastData.windSpeed,
        secondMainCityWeather: secondMainCityForcastData.weather,
        secondMainCityIconWeather: secondMainCityForcastData.iconWeather
    })
})

app.get('/weather', async (req, res) => {
    address = req.query.address
    forecastData = await geocode(address)
    if(forecastData.error)
    {
        return res.send({
            error: forecastData.error.substring(0,14) + '. Please try writing the address in a city, country form.'
        })
    }
    if(address === ','){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    return res.send({
        name: forecastData.name,
        humidity: forecastData.humadity,
        windSpeed: forecastData.windSpeed,
        temperature: forecastData.weather,
        iconWeather: forecastData.iconWeather,
        firstLink: forecastData.firstLink,
        firstLinkName: forecastData.firstLinkName,
        secondLink: forecastData.secondLink,
        secondLinkName: forecastData.secondLinkName,
        thirdLink: forecastData.thirdLink,
        thirdLinkName: forecastData.thirdLinkName,
        citiesNearByMessage: forecastData.citiesNearByMessage
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'My 404 page'
    })
})

app.listen(port, () => {
})