const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=757fe8ec4d8edcbb18038dd3d329cc13&query='+latitude+','+longitude+'&units=f'
    request({url, json:true}, (error, response)=>{
        const {body} = response
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+". It is currently "+ body.current.temperature+" degrees out. It feels like "+body.current.feelslike +" degrees out. Humidity level is "+ body.current.humidity+".")
        }
    })
}

module.exports = forecast