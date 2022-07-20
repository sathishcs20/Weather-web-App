const request=require('request')

module.exports.weatherStack=(lati,longi,callback)=>
{
    const url ='http://api.weatherstack.com/current?access_key=acfd2c865cbe9c09420bdac3a1bc48be&query='+longi+','+lati
    request({url:url,json:true},(error,response)=>
{
    if(error)
    {
        callback(error)
    }
    else if(response.error)
    {
        callback(undefined,'match not found')
    }
    else
    {
        callback({
            temp:response.body.current.temperature,
            description:response.body.current.weather_descriptions[0]
        })
    }
})
}

