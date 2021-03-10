const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicGFybTExIiwiYSI6ImNrbG81b2Q1aDBwcXkycW5udTZ4bmcyOGwifQ.KIX7huNEkCGvugO9NqHUeg&limit=1'

    request({url, json: true},(error,response)=>{
        const {features} = response.body
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })

}

module.exports = geocode