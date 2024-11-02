<template>
    <header>
      <div class="header-container">
        <div class="brand-date">
          <h3><a class="text-dark">EcoLAH Education</a></h3>
          <h4><a class="dateMain text-dark">{{ currentDate }}</a></h4>
        </div>
        <div class="search-input-Div">
          <div class="input-container">
            <input 
              type="text" 
              v-model="searchCity" 
              class="search-input" 
              placeholder="Search for a city..." 
              @keyup.enter="fetchWeatherData"
            />
            <button class="searchIcon" @click="fetchWeatherData">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <section class="dashboard-container topSection">
      <div class="container-fluid">
        <div class="row">
          <h2>Today OverViews</h2>
          <div class="col col-lg-6 col-12 DailyWeather">
            <div class="countryDiv d-flex" v-if="weatherInfo">
              <div class="countryIcon">
                <img :src="`http://openweathermap.org/images/flags/${weatherInfo.country.toLowerCase()}.png`" />
              </div>
              <div class="countryNames">
                <h2 class="countryName">{{ weatherInfo.country }}</h2>
                <h4 class="cityName"> {{ weatherInfo.name }} </h4>
              </div>
              <div class="tempDiv">
                <h2 class="temp">{{ weatherInfo.temp }}°C</h2>
                <h4 class="tempDescription">Temperature</h4>
              </div>
              <div class="HumidityDiv">
                <h2 class="Humidity">{{ weatherInfo.humidity }}%</h2>
                <h4 class="HumidityDescription">Humidity</h4>
              </div>
              <div class="windSpeedDiv">
                <h2 class="windSpeed">{{ weatherInfo.windSpeed }} Km/h</h2>
                <h4 class="windSpeedDescription">Windspeed</h4>
              </div>
            </div>
            <div class="WeatherDailyList">
              <div v-for="(forecast, index) in weatherForecasts" :key="index" class="weatherList">
                <span class="dateSpan"> {{ forecast.time }} </span>
                <span class="weatherIcon">
                  <img :src="`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`" :alt="forecast.icon" />
                </span>
                <span class="tempSpan">{{ forecast.temp.toFixed(1) }}°C</span>
              </div>
            </div>
          </div>
          <div class="col col-lg-6 col-12 weatherMapContainer">
            <div class="weatherMap"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="dashboard-container weeklyCharts">
      <div class="container-fluid">
        <div class="row">
          <div class="d-flex">
            <h3>Weekly OverViews</h3>
            <a href="#temperature" class="text-secondary"> More</a>
          </div>
          <div class="col col-lg-6 col-12">
            <figure class="highcharts-figure humidityChart">
              <div id="humidity" ref="humidityChart"></div>
            </figure>
          </div>
          <div class="col-lg-6 col-12">
            <figure class="highcharts-figure">
              <div id="temperature" ref="temperatureChart"></div>
            </figure>
          </div>
          <div class="col-lg-6 col-12">
            <figure class="highcharts-figure">
              <div id="pressure" ref="pressureChart"></div>
            </figure>
          </div>
          <div class="col-lg-6 col-12">
            <figure class="highcharts-figure">
              <div id="overViewAll" ref="overviewChart"></div>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section class="globeSelection separated">
      <div id="globe-container" class="container">
        <div id="title">Surface Temperature Anomalies in the Past Century</div>
        <div ref="globeContainer" id="container"></div>
        <div id="currentInfo">
          <span id="year1910" class="year">1910s</span>
          <span id="year1920" class="year">1920s</span>
          <span id="year1930" class="year">1930s</span>
          <span id="year1940" class="year">1940s</span>
          <span id="year1980" class="year">1980s</span>
          <span id="year1990" class="year">1990s</span>
          <span id="year2000" class="year">2000s</span>
          <span id="year2010" class="year">2010s</span>
        </div>
        <div id="bio">
            The globe shows the average temperature anomalies between 1910 and 2019 
            (decades). The temperature anomalies are the difference in
            temperature at that location between a given time period and
            the average temperature between the years of 1951 and 1980 (selected by NASA).
        </div>
        <div id="key" >
            The colour and height of the spikes are jointly scaled to show the change in temperature 
            against the average of 1951-1980. 
            Blues and purples symbolises temperatures cooler than the average while
            reds, yellows and oranges symbolises temperatures warmer than the average.
        </div>
        <div id="info">
          <strong><a href="http://www.chromeexperiments.com/globe" class="separated">WebGL Globe</a></strong> 
          <span class="bull">&bull;</span>Data acquired from <a href="https://data.giss.nasa.gov/gistemp/" class="separated">NASA-GISTEMPv4</a>
        </div>
      </div>
    </section>
    
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

</template>



<script setup>
import { ref, onMounted, watch } from 'vue'
import Highcharts from 'highcharts'
import L from 'leaflet'
import $ from 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';

const API_KEY = '00191a8734faf64d30ef489904bbe0bd'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast'

const searchCity = ref("")
const weatherInfo = ref(null)
const weatherForecasts = ref([])
const currentDate = ref('')

const humidityChart = ref(null)
const temperatureChart = ref(null)
const pressureChart = ref(null)
const overviewChart = ref(null)

let mymap;

const formatDate = () => {
  const currentDate = new Date()
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]
  const month = monthNames[currentDate.getMonth()]
  const day = ("0" + currentDate.getDate()).slice(-2)
  const year = currentDate.getFullYear().toString().slice(-2)
  return `${month} ${day}, ${year}`
}

const fetchWeatherData = async () => {
  const searchValue = searchCity.value.trim() ?  searchCity.value : 'Singapore';

  try {
    const response = await fetch(`${BASE_URL}?q=${searchValue}&appid=${API_KEY}&units=metric`)
    const data = await response.json()
    weatherData(data)
  } catch (error) {
    console.error("Error fetching weather data:", error)
  }
}

const weatherData = (data) => {
  const firstItem = data.list[0]
  
  weatherInfo.value = {
    country: data.city.country,
    name: data.city.name,
    temp: firstItem.main.temp,
    humidity: firstItem.main.humidity,
    windSpeed: firstItem.wind.speed.toFixed(1)
  }

  weatherForecasts.value = data.list.map(item => ({
    time: item.dt_txt.split(" ")[1].split(":")[0],
    icon: item.weather[0].icon,
    temp: item.main.temp
  }))

  createMap(data.city.coord.lat, data.city.coord.lon)
  createCharts(data.list)
}

const createMap = (xAxis, yAxis) => {
  if (mymap) {
    mymap.remove()
  }
  mymap = L.map($('.weatherMap')[0]).setView([xAxis, yAxis], 10);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(mymap);
}

const createCharts = (listOfWeatherData) => {
  const humidityData = listOfWeatherData.map(item => item.main.humidity)
  const tempData = listOfWeatherData.map(item => item.main.temp)
  const pressureData = listOfWeatherData.map(item => item.main.pressure)

  const startDate = Date.UTC(
    ...listOfWeatherData[0].dt_txt.split(/[- :]/).slice(0, 5).map(Number)
  )

  createHighChart(humidityChart.value, 'Humidity', humidityData, startDate, '%', '#800080')
  createHighChart(temperatureChart.value, 'Temperature', tempData, startDate, '°C', '#A01E5F')
  createHighChart(pressureChart.value, 'Pressure', pressureData, startDate, 'hPa', '#800000')
  createMultiSeriesChart(overviewChart.value, startDate, tempData, pressureData, humidityData)
}

const createHighChart = (container, name, data, startDate, suffix, color) => {
  Highcharts.chart(container, {
    chart: {
      type: 'areaspline',
      scrollablePlotArea: { minWidth: 400 },
      backgroundColor: '#0d121c',
      borderRadius: 15
    },
    title: { 
      text: `Average Weekly ${name}`, 
      align: 'left',
      style: { color: '#FFFFFF' }
    },
    xAxis: {
      type: 'datetime',
      labels: { style: { color: '#FFFFFF' } }
    },
    yAxis: {
      title: { text: `${name} ${suffix}` },
      labels: { style: { color: '#FFFFFF' } },
      gridLineWidth: 0
    },
    series: [{
      name: name,
      data: data,
      color: color,
      pointStart: startDate,
      pointInterval: 3 * 3600 * 1000  // 3 hours
    }],
    plotOptions: {
      series: {
        marker: { enabled: false }
      }
    }
  })
}

const createMultiSeriesChart = (container, startDate, tempData, pressureData, humidityData) => {
  Highcharts.chart(container, {
    chart: {
      type: 'spline',
      backgroundColor: '#0d121c',
      borderRadius: 15
    },
    title: { 
      text: 'Weekly Overview', 
      align: 'left', 
      style: { color: '#FFFFFF' } 
    },
    series: [
      { name: 'Temperature', data: tempData, color: '#FF0000' },
      { name: 'Pressure', data: pressureData, color: '#00FF00' },
      { name: 'Humidity', data: humidityData, color: '#0000FF' }
    ],
    xAxis: {
      type: 'datetime',
      labels: { style: { color: '#FFFFFF' } },
      pointStart: startDate,
      pointInterval: 3 * 3600 * 1000
    },
    yAxis: {
      labels: { style: { color: '#FFFFFF' } },
      gridLineWidth: 0
    }
  })
}

onMounted(() => {
  currentDate.value = formatDate()
  fetchWeatherData()
})

watch(searchCity, fetchWeatherData)
</script>

<style>
@import '../assets/styles/EducationPage.css';
</style>