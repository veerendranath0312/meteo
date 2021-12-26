// Selecting elements
const form = document.querySelector('form')
const input = document.getElementById('input-text')

const weatherData = document.querySelector('.weather-data')

const timePeriod = document.getElementById('time-period')
const degree = document.getElementById('degree')
const city = document.getElementById('city')
const country = document.getElementById('country')
const description = document.getElementById('description')
const main = document.getElementById('main')
const feelsLike = document.getElementById('feels-like')
const humidity = document.getElementById('humidity')
const pressure = document.getElementById('pressure')
const windSpeed = document.getElementById('wind-speed')
const image = document.querySelector('img')

// Function to get weather data
const getWeatherData = async () => {
  try {
    if (!input.value) {
      weatherData.classList.add('hide')
      alert('Please enter a valid city....')
    } else {
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=17ae4b810f3162b29f9856950d8457cc`

      const response = await fetch(endpoint)
      const data = await response.json()

      // If we get the data then add it to the page
      if (data.cod !== '404') {
        weatherData.classList.remove('hide')

        const srcPath = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        image.src = srcPath

        const celcius = (data.main.temp - 273.15).toFixed(1)
        degree.textContent = celcius

        city.textContent = data.name
        country.textContent = data.sys.country
        description.textContent = data.weather[0].description
        main.textContent = data.weather[0].main
        feelsLike.textContent = (data.main.feels_like - 273.15).toFixed(1)
        humidity.textContent = data.main.humidity
        pressure.textContent = data.main.pressure
        windSpeed.textContent = data.wind.speed
      }

      // clear the input field
      input.value = ''
    }
  } catch (error) {
    console.log(error)
  }
}

form.addEventListener('submit', e => {
  e.preventDefault()

  getWeatherData()
})

// functionality to print welcome message based on time
const today = new Date()
const hours = today.getHours()

if (hours >= 0 && hours < 12) {
  timePeriod.textContent = 'Good Morning'
} else if (hours >= 12 && hours < 5) {
  timePeriod.textContent = 'Good Afternoon'
} else if (hours >= 5 && hours <= 23) {
  timePeriod.textContent = 'Good Evening'
}
