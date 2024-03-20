const express = require('express')
const app = express()
const port = 3000

app.use('/', express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/weather', async(req, res) => {
    let lat = req.query.lat 
    let lon = req.query.lon
    let resWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=88c8615836512d39e3e7687d2ede5e1f&lang=ru`)
    let resWeatherJson = await resWeather.json()

    res.json({
        'city' : resWeatherJson.name,
        'temp' : Math.round(resWeatherJson.main.temp - 273),
        'feels_like' : Math.round(resWeatherJson.main.feels_like - 273),
        'description' : resWeatherJson.weather[0].description,
        'wind' : resWeatherJson.wind.speed,
        'icon' : resWeatherJson.weather[0].icon
    })
  })
  

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})