const request=require('request')

module.exports.geocode =(address,callback)=>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2F0aGlzaDU2IiwiYSI6ImNsNTg5N3FldDAyemkzZ3JvOHR2MGY3N20ifQ.BEb-jLmWt1DRPlLpvk7dvQ&limit=1'
request({url:url,json:true},(error,response)=>
{
    if(error)
    {
        callback("error")
    }
    else if(response.body.features.length === 0)
    {
        callback("Match not found")
    }
    else
    {
        const lati=response.body.features[0].center[0]
        const longi=response.body.features[0].center[1]
        callback({lati,longi})
    }
})
}


