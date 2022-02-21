const request = require('request')





//const url = 'http://api.weatherstack.com/current?access_key=11fb95e8d0dda30767e5960b957c6647&query=tokyo'

// request({ url: url,json: true}, (error, response)=> {
//     if(error){
//         console.log('Unable to connect to weather service')
//     } else if(response.body.error){
//         console.log('Unable to find location')
//     }
//     else {
//         console.log(response.body.current.weather_descriptions[0]+ '. It is currently '+response.body.current.temperature+ 'degrees out. But I feel '+ response.body.current.feelslike+' degrees outside')
//     }
    
// })

const forecast = (lat,long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=11fb95e8d0dda30767e5960b957c6647&query='+lat+','+long+'&unit=f'

    request({url, json: true},(error,response)=>{
        if (error){
            callback('Unable to conncet to forecast services!!!', undefined)
        }else if (response.body.error){
            callback('Unable to find forecast', undefined)
        }else {
            callback(undefined, response.body.current.weather_descriptions[0]+ '. It is currently '+response.body.current.temperature+ 'degrees out. But I feel '+ response.body.current.feelslike+' degrees outside'
            )
        }
    })
}

module.exports = forecast