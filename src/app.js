const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Eden Binyamin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Eden Binyamin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Eden Binyamin'
    })
})

app.get('/weather', (req, res) => {
    address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error)
            return res.send({ error })
        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
                return res.send({ error })
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help artictle was not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'My 404 page'
    })
})

app.listen(port, () => {
    console.log('Server is up on ' + port +'.')
})