const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'LEE HS'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'LEE HS'
    })
})

app.get('/help', (req, res)=> {
    res.render('help',{
        title: 'What is problem',
        text: 'We can help your problem',
        name: 'LEE HS'
    })
})


app.get('/weather',(req,res)=> {
    if (!req.query.address){
        return res.send({
            error: 'You must input address'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{

        if (error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
    
    
    })    
    
    // console.log(req.query.address)
    // res.send({
    //     forecast: res.forecastData,
    //     location: res.location,
    //     address: req.query.address 
    // })
})

app.get('/products', (req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        prodeucts: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 help',
        name: 'LEE HS',
        errorMessage: 'Help article not found'

    })
})
app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'LEE HS',
        errorMessage: 'Page not found'

    })
})
app.listen(port, ()=>{
    console.log('Server is up on port 3000'+ port)
})