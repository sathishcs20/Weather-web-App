const express=require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app=express()
const geo=require('./geocode')
const weather=require('./weatherstack')

const port =process.env.POERT || 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('D:/vs code/Node JS Udemy/Weather App -Final/public')) //to access static files

app.set('view engine','hbs')
app.set('views','D:/vs code/Node JS Udemy/Weather App -Final/templates/views')


app.get('/',(req,res)=>
{
    res.render('index')
})
app.get('/weather',(req,res)=>
{
    if(!req.query.search)
    {
        return res.send({err:"cannot found"})
    }
    const add=req.query.search
    geo.geocode(add,(data)=>
{
    if(data === 'error')
    {
        res.send({err:"unable to connect"})
    }
    else if(data === 'Match not found')
    {
        res.send({err:'match not found'})
    }
    else{
        weather.weatherStack(data.lati,data.longi,(response)=>
{
    if(response === 'error')
    {
        res.send({err:'unable to connect'})
    }
    else if(response === 'match not found')
    {
        res.send({err:"match not found"})
    }
    else{
        res.send({err:undefined,temp:response.temp,des:response.description})
    }
})
    }
})
    
})


app.listen(port)