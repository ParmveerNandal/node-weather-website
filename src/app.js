const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Parmveer Nandal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Parmveer Nandal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Happy to help!",
        title: 'Help',
        name: 'Parmveer Nandal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address?'
        })
    }

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        //console.log(location)
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            //console.log(forecastdata)
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})




app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Parmveer Nandal',
        errorMsg: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Parmveer Nandal',
        errorMsg: 'Page note found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})