<template>
    <header>
      <div class="header-container">
        <div class="brand-date">
          <h3><a class="dateMain text-dark">{{ currentDate }}</a></h3>
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
                <span class="tempSpan">{{ forecast.temp.toFixed(1) }}</span>
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
  // Group data by day to get daily averages
  const dailyData = listOfWeatherData.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = {
        humidity: [],
        temperature: [],
        pressure: []
      };
    }
    acc[date].humidity.push(item.main.humidity);
    acc[date].temperature.push(item.main.temp);
    acc[date].pressure.push(item.main.pressure);
    return acc;
  }, {});

  // Calculate daily averages and format data for charts
  const formattedData = Object.entries(dailyData).map(([date, values]) => {
    const timestamp = new Date(date).getTime();
    return {
      humidity: [
        timestamp,
        values.humidity.reduce((a, b) => a + b) / values.humidity.length
      ],
      temperature: [
        timestamp,
        values.temperature.reduce((a, b) => a + b) / values.temperature.length
      ],
      pressure: [
        timestamp,
        values.pressure.reduce((a, b) => a + b) / values.pressure.length
      ]
    };
  });

  const formattedHumidityData = formattedData.map(d => d.humidity);
  const formattedTempData = formattedData.map(d => d.temperature);
  const formattedPressureData = formattedData.map(d => d.pressure);

  createHighChart(humidityChart.value, 'Humidity', formattedHumidityData, '%', '#800080');
  createHighChart(temperatureChart.value, 'Temperature', formattedTempData, '°C', '#A01E5F');
  createHighChart(pressureChart.value, 'Pressure', formattedPressureData, 'hPa', '#800000');
  createMultiSeriesChart(overviewChart.value, formattedTempData, formattedPressureData, formattedHumidityData);
};

const createHighChart = (container, name, data, suffix, color) => {
  Highcharts.chart(container, {
    chart: {
      type: 'areaspline',
      scrollablePlotArea: { minWidth: 400, scrollPositionX: 1 },
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
      labels: { 
        overflow: 'justify',
        style: { color: '#FFFFFF' },
        format: '{value:%d %b}' // Show day and month
      },
      tickInterval: 24 * 3600 * 1000 // One day intervals
    },
    yAxis: {
      title: { text: `${name} ${suffix}` },
      labels: { style: { color: '#FFFFFF' } },
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      alternateGridColor: null,
      plotBands: []
    },
    series: [{
      name: name,
      data: data,
      color: color
    }],
    plotOptions: {
      areaspline: {
        fillOpacity: 0.3,
        marker: { enabled: false }
      }
    },
    tooltip: {
      xDateFormat: '%d %b',
      shared: true
    }
  });
};

const createMultiSeriesChart = (container, tempData, pressureData, humidityData) => {
  Highcharts.chart(container, {
    chart: {
      type: 'spline',
      scrollablePlotArea: {
        minWidth: 400,
        scrollPositionX: 1
      },
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
      { name: 'Pressure', data: pressureData, color: '#0000FF' },
      { name: 'Humidity', data: humidityData, color: '#00FF00' }
    ],
    xAxis: {
      type: 'datetime',
      labels: { 
        overflow: 'justify',
        style: { color: '#FFFFFF' },
        format: '{value:%d %b}'
      },
      tickInterval: 24 * 3600 * 1000 // One day intervals
    },
    yAxis: {
      title: { text: 'Consolidated Chart' },
      labels: { style: { color: '#FFFFFF' } },
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      alternateGridColor: null,
      plotBands: []
    },
    tooltip: {
      xDateFormat: '%d %b',
      shared: true
    }
  });
};

onMounted(() => {
  currentDate.value = formatDate()
  fetchWeatherData()
})

watch(searchCity, fetchWeatherData)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');

:root {
   /* --clr-primary: #dedde2; */
   --clr-primary: #ffff;
   --clr-primary-light: #f2f2f2;
   --clr-grey-1: #0d0d0d;
   --clr-grey-5: #bdbbbe;
   --clr-grey-10: #f1f5f8;
   --ff-primary: "Space Grotesk", sans-serif;
   --ff-secondary: "Grand Hotel", cursive;
   --transition: all 0.3s linear;
   --spacing: 0.15rem;
   --radius: 0.5rem;
   --container-padding: 2% 3% 2%;
 }

 body{
   font-family: var(--ff-primary);
   color: var(--clr--grey-1);
   line-height: 1.5;
   font-size: 0.875rem;
   background: #061021;
   color: #f8f8f8;
   overflow-y: scroll;
 }
 

 /* for the globe body */
 body .separated {
   font-family: sans-serif;
   line-height: 20px;
   font-size: 13px;
   background: black;
   margin: 0;
   padding: 0;
   color: #ffffff;
   height: 100%;
 }
 
 h1,
 h2,
 h3,
 h4 {
   letter-spacing: var(--spacing);
   text-transform: capitalize;
   line-height: 1;
   margin-bottom: 0.75rem;
   color: var(--clr-grey-10);
 }
 
 img {
   width: 100%;
   display: block;
 }
 
 a {
   text-decoration: none;
   color: var(--clr-grey-10);
 }

 /* for the globe link */
 a.separated {
   color: #fff;
   text-decoration: none;
 }

 /* for the globe link */
 a:hover.separated {
   text-decoration: underline;
 }
 
 
 h1 {
   font-size: 3rem;
   font-weight: bolder;
 }
 
 h2 {
   font-size: 2rem;
   font-weight: bolder;
 }
 
 h3 {
   font-weight: bolder;
   font-size: 1.5rem;
 }
 
 h4 {
   font-size: 0.875rem;
   font-weight: lighter;
 }
 
 p {
   text-transform: capitalize;
   line-height: 1.5;
   margin-bottom: 0.75rem;
   color: var(--clr-grey-5);
   font-size: 0.875rem;
 }
 
 /* Nav bar */
 .header-container{
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 1% 3%;
   background-color: var(--clr-grey-10); /* Use the same background as below */
 }

 .brand-date h3, .brand-date h4 {
   margin: 0;
   color: var(--clr-grey-1); /* Adjust text color to match */
 }

 .search-input-Div {
   display: flex;
  align-items: center;
}
 
 .input-container {
   position: relative;
   height: 100%;
 }
 
 .search-input {
   outline: none;
   border: 2px solid #3e61d0;
   padding: 8px 15px;
   border-radius: 15px;
   background-color: var(--clr-grey-10);
   padding-right: 35px;
 }

 .search-input:focus {
   outline: none;
   box-shadow: none;
 }
 
 .searchIcon {
   position: absolute;
   top: 50%;
   right: 10px;
   transform: translateY(-50%);
   background: none;
   border: none;
   cursor: pointer;
   color: #3e61d0;
 }
 

 /* Location */
 .topSection {
   padding: var(--container-padding);
 }

 .DailyWeather {
   background: rgba(255, 255, 255, 0.4);
   border-radius: 25px;
   backdrop-filter: blur(7px);
   -webkit-backdrop-filter: blur(7px);
   flex-wrap: wrap;
   align-items: center;
   border: 0.5px solid black;
 }
 
 .countryDiv {
   justify-content: space-between;
   padding: 2%;
 }
 
 /* weather list */
 .countryIcon {
   width: 13%;
   height: 15%;
 }
 .countryIcon img {
   width: 100%;
   height: 100%;
   border-radius: 25px;
 }
 
 .weeklyCharts {
   padding: var(--container-padding);
 }
 .WeatherDailyList {
   overflow-x: auto;
   width: 100%;
   display: flex;
   flex-wrap: nowrap;
 }
 
 .WeatherDailyList::-webkit-scrollbar {
   color: transparent;
   font-size: 5px;
 }
 
 .weatherList {
   background: var(--clr-grey-5);
   width: fit-content;
   padding: 15px;
   margin-bottom: 2%;
   border-radius: 15px;
   text-align: center;
   margin-left: 1%;
   border: 0.01px solid black;

 }
 .weatherList span {
   display: block;
 }
 .weatherList .weatherIcon {
   width: 100%;
 }
 
 .weatherMap {
   width: 100%;
   height: 100%;
   border-radius: 25px;
   border: 0.1px solid black;
 }
 
 /* HighCharts */
 .highcharts-figure,
 .highcharts-data-table table {
   min-width: 310px;
   max-width: 800px;
   margin: 1em auto;
 }
 
 .highcharts-data-table table {
   font-family: var(--ff-primary);
   border-collapse: collapse;
   border: 1px solid #ebebeb;
   margin: 10px auto;
   text-align: center;
   width: 100%;
   max-width: 500px;
 }
 
 .highcharts-data-table caption {
   padding: 1em 0;
   font-size: 1.2em;
   color: #555;
 }
 
 .highcharts-data-table th {
   font-weight: 600;
   padding: 0.5em;
 }
 
 .highcharts-data-table td,
 .highcharts-data-table th,
 .highcharts-data-table caption {
   padding: 0.5em;
 }
 
 .highcharts-data-table thead tr,
 .highcharts-data-table tr:nth-child(even) {
   background: #f8f8f8;
 }
 
 .highcharts-data-table tr:hover {
   background: #f1f7ff;
 }
 
 @media (max-width: 600px){
   img {object-fit: cover;}
   h1 {font-size: 2rem;}
   h2 {font-size: 1.5rem; font-weight: bolder;}
   h3 {font-weight: bolder;font-size: 1rem;}
   h4 {font-size: 0.5rem;}
   .DailyWeather h2 {font-size: 1rem;}
   .DailyWeather h4 {font-size: 0.4rem; font-weight: bolder;}
   .countryDiv {padding: 4% 2% 4%;}
   .weatherList {min-width: 15%;}
   .brandName {text-align: center; align-items: center; margin-bottom: 10px;}
 }
 






 /* separation here */
 /* globe css code */

 /* New Wrapper */
 .container {
   position: relative;
 }
 
 html {
   height: 100%;
 }
 
 #info {
   position: absolute;
   bottom: 20px;
   right: 10px;
   /* left: 20px; */
   font-size: 11px;
   background-color: rgba(0, 0, 0, 0.8);
   border-radius: 3px;
   padding: 10px;
   opacity: 0.7;
 }

 #info a {
   color: white;
   text-decoration: none;
}

#info a:hover {
 text-decoration: underline;
}

 #currentInfo {
   width: 70px;
   position: absolute;
   left: 20px;
   top: 140px;
   padding: 10px;
   background-color: rgba(.9,0.9,0.9,0.3);
   border-radius: 3px;
   font: 15px Georgia;
 }

 #dataSelectDropdown {
   width: 350px;
   position: absolute;
   left: 20px;
   top: 85px;
   border-top: 1px solid rgba(255,255,255,0.4);
   border-bottom: 1px solid rgba(255,255,255,0.4);
   padding: 10px;
 }

 
 .bull {
   color: #555;
   margin: 0 5px;
 }
 #container {
   margin: 0 auto;
   height: 100vh;
   width: 100%;
   position: relative;
   min-height: 400px; 
}

/* Ensure the section takes up full viewport height */
.globeSelection {
   min-height: 100vh;
   background-color: black;
}

/* Link styling within the globe section */
.separated {
   color: white;
   text-decoration: none;
}

.separated:hover {
   text-decoration: underline;
}
 #key {
   position: absolute;
   bottom: 60px;
   left: 20px;
   width: 350px;
   text-align: left;
   opacity: 0.7;
   color: white;
   background-color: rgba(0.9, 0.9, 0.9, 0.3);
   border-radius: 3px;
   font: 15px Georgia;
   padding: 10px;
 }

 #bio {
   position: absolute;
   top: 20px;
   width: 350px;
   right: 20px;
   color: white;
   background-color: rgba(.9,.9,.9,0.3);
   border-radius: 3px;
   font: 15px Georgia;
   padding: 10px;
   text-align: right;
 }

 #title {
   position: absolute;
   top: 20px;
   width: 380px;
   left: 20px;
   background-color: rgba(0,0,0,0.2);
   border-radius: 3px;
   font: 20px Georgia;
   padding: 10px;
 }

 .year {
   font: 11px Verdana, Geneva, sans-serif;
   line-height: 30px;
   height: 30px;
   text-align: left;
   float: left;
   width: 150px;
   color: rgba(255, 255, 255, 0.4);
   cursor: pointer;
   transition: all 0.1s ease-out;
   opacity: 0.4;
   display: block;
   margin: 5px 0;
 }

 .year:hover, .year.active {
   font-size: 13px;
   color: #fff;
   opacity: 1;
 }

 #dataSelection option {
     background: #466c41;
 }


 select {
     background: #466c41;
     border: 1px #CCCCCC;
     color: #FFF;
     line-height:25px;
     width:220px;
 }
</style>