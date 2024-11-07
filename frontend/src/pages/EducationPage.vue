<template>
  <div class="main-app-education">
      <header>
          <div class="header-container">
              <div class="brand-date">
                  <h3><a class="text-white">EcoLAH Education</a></h3>
                  <h4><a class="dateMain text-white">{{ formattedDate }}</a></h4>
              </div>
              <div class="search-input-Div">
                  <div class="input-container">
                      <input type="text" v-model="selectedCountry" class="search-input"
                          placeholder="Search for a city..." />
                      <button class="searchIcon" @click="fetchWeatherData">
                          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path
                                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                          </svg>
                      </button>
                  </div>
              </div>
          </div>
      </header>
      <main>
          <section class="dashboard-container topSection">
              <div class="container-fluid">
                  <div class="row">
                      <h2>Today OverViews</h2>
                      <div class="col col-lg-6 col-12 DailyWeather">
                          <div class="countryDiv d-flex">
                              <div class="countryIcon" v-if="countryIcon"><img :src="countryIcon" /></div>
                              <div class="countryNames">
                                  <h2 class="countryName"> {{ countryName }}</h2>
                                  <h4 class="cityName">{{ cityName }}</h4>
                              </div>
                              <div class="tempDiv">
                                  <h2 class="temp">{{ temp }}</h2>
                                  <h4 class="tempDescription">Temperature</h4>
                              </div>
                              <div class="HumidityDiv">
                                  <h2 class="Humidity">{{ humidity }}</h2>
                                  <h4 class="HumidityDescription">Humidity</h4>
                              </div>
                              <div class="windSpeedDiv">
                                  <h2 class="windSpeed">{{ windSpeed }}</h2>
                                  <h4 class="windSpeedDescription">Windspeed</h4>
                              </div>
                          </div>
                          <div class="WeatherDailyList" ref="weatherDailyList"></div>
                      </div>
                      <div class="col col-lg-6 col-12 weatherMapContainer">
                          <div ref="weatherMap" class="weatherMap"></div>
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
                              <div id="humidity"></div>
                          </figure>
                      </div>
                      <div class="col col-lg-6 col-12">
                          <figure class="highcharts-figure">
                              <div id="temperature"></div>
                          </figure>
                      </div>
                      <div class="col col-lg-6 col-12">
                          <figure class="highcharts-figure">
                              <div id="pressure"></div>
                          </figure>
                      </div>
                      <div class="col col-lg-6 col-12">
                          <figure class="highcharts-figure">
                              <div id="overViewAll"></div>
                          </figure>
                      </div>
                  </div>
              </div>
          </section>
          <section class="globeSelection separated">
              <div class="container">
                  <!-- Title Section -->
                  <div class="container">
                      <div id="title">Surface Temperature Anomalies in the Past Century</div>

                      <!-- Globe Container: ref is used to bind it to Vue component -->
                      <!-- This will be the div where the 3D globe will be rendered -->
                      <div ref="globeContainer" id="container"></div>

                      <!-- Current Information about the data -->
                      <div id="currentInfo">
                          <!-- Loop through years array and render a clickable year for each decade -->
                          <span v-for="year in years" :key="year" :id="'year' + year" class="year" :class="selectedYear == year ? 'active' : ''"
                              @click="handleYearChange(year)">
                              {{ year }}s <!-- Display the decade (e.g., "1910s") -->
                          </span>
                      </div>

                      <!-- Bio Section explaining the data -->
                      <div id="bio">
                          The globe shows the average temperature anomalies between 1910 and 2019 (decades). The
                          temperature anomalies are the difference in temperature at that location between a given
                          time period and the average temperature between the years of 1951 and 1980 (selected by
                          NASA).
                      </div>

                      <!-- Key explaining the color and scale of the temperature anomalies -->
                      <div id="key">
                          The colour and height of the spikes are jointly scaled to show the change in temperature
                          against the average of 1951-1980. Blues and purples symbolize temperatures cooler than the
                          average, while reds, yellows, and oranges symbolize temperatures warmer than the average.
                      </div>

                      <!-- Info Section with external links to source data -->
                      <div id="info">
                          <strong>
                              <a href="http://www.chromeexperiments.com/globe" class="separated">WebGL Globe</a>
                          </strong>
                          <span class="bull">&bull;</span>Data acquired from
                          <a href="https://data.giss.nasa.gov/gistemp/" class="separated">NASA-GISTEMPv4</a>
                      </div>
                  </div>
              </div>
          </section>
      </main>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import Highcharts from 'highcharts';
import 'highcharts/modules/series-label';
import 'highcharts/modules/exporting';
import 'highcharts/modules/export-data';
import 'highcharts/modules/accessibility';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as THREE from 'three';
import Globe from 'globe.gl';




const endpoints = {
  weather: {
      baseUrl: 'https://api.openweathermap.org/data/2.5/forecast',
      apiKey: '00191a8734faf64d30ef489904bbe0bd', // insert your API key here
  },
};

const selectedCountry = ref('Singapore');
const mymap = ref(null);
const weatherMap = ref(null);
const countryIcon = ref(null);
const countryName = ref(null);
const cityName = ref(null);
const temp = ref(null);
const humidity = ref(null);
const windSpeed = ref(null);
const weatherDailyList = ref([]);
const selectedYear = ref('1910')

const globe = ref(null)
const years = ref(['1910', '1920', '1930', '1940', '1980', '1990', '2000', '2010'])
const jsonData = ref([])

const globeContainer = ref(null)


const formattedDate = ref('');
const mainDate = () => {
  const currentDate = new Date();
  const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const month = monthNames[currentDate.getMonth()];
  const day = ('0' + currentDate.getDate()).slice(-2);
  const year = currentDate.getFullYear().toString().slice(-2);
  formattedDate.value = `${month} ${day}, ${year}`;
};

const fetchWeatherData = () => {
  const weatherURL = `${endpoints.weather.baseUrl}?q=${selectedCountry.value}&appid=${endpoints.weather.apiKey}&units=metric`;
  fetch(weatherURL)
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
          weatherData(data);
      })
      .catch((error) => {
          console.log('Error:', error);
      });
};

const weatherData = (data) => {
  const listOfWeatherData = data.list;
  const startDate = fixDateInterval(data.list[0].dt_txt);
  const humidityArray = [];
  const tempArray = [];
  const windArray = [];
  const iconArray = [];
  const pressureArray = [];
  const xAxis = data.city.coord.lat;
  const yAxis = data.city.coord.lon;

  listOfWeatherData.forEach((item) => {
      const temp = item.main.temp;
      const humidity = item.main.humidity;
      const wind = item.wind.speed;
      const icons = item.weather[0].icon;
      const pressure = item.main.pressure;
      humidityArray.push(humidity);
      tempArray.push(temp);
      windArray.push(wind);
      iconArray.push(icons);
      pressureArray.push(pressure);
  });

  createMap(xAxis, yAxis);
  createWeatherList(iconArray, tempArray, humidityArray, windArray, startDate, data);
  createHumidityChart(humidityArray, startDate);
  createPressureChart(pressureArray, startDate);
  createTempChart(tempArray, startDate);
  createOverAllChart(tempArray, pressureArray, humidityArray, startDate);
};

const createHumidityChart = (allDataValues, date) => {
  // chartCreator1(
  //   'humidity', 'spline', 'Average Weekly Humidity', ' ', 'datetime',
  //   'Humidity %', '%', 3, date, 'Humidity', allDataValues
  // );
  chartCreator1("humidity", "spline", "Average Weekly Humidity", " ", "datetime", "Wind speed (m/s)", "%", 3, date, "Humidity", allDataValues, '#2caffe');
};

const createPressureChart = (allDataValues, date) => {
  chartCreator1(
      'pressure', 'areaspline', 'Average Weekly Pressure', ' ', 'datetime',
      'Pressure hPa', 'hPa', 3, date, 'Pressure', allDataValues, '#800000'
  );
};

const createTempChart = (allDataValues, date) => {
  chartCreator1(
      'temperature', 'areaspline', 'Average Weekly Temperature', ' ', 'datetime',
      'Temperature °C', '°C', 3, date, 'Temperature', allDataValues, '#A01E5F'
  );
};

const createOverAllChart = (tempArray, pressureArray, humidityArray, date) => {
  chartCreator2(
      'overViewAll', 'spline', 'Weekly Overview', '', 'datetime', 'Consolidated Chart', '',
      3, date, 'Temperature', tempArray, '#A01E5F', 'Pressure', pressureArray, '#800000', 'Humidity', humidityArray
  );
};

const createMap = (xAxis, yAxis) => {
  if (mymap.value) {
      mymap.value.remove(); // Remove existing map
  }

  mymap.value = L.map(weatherMap.value).setView([xAxis, yAxis], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(mymap.value);
};



const createWeatherList = (iconArray, tempArray, humidityArray, windArray, startDate, data) => {
  const listContainer = weatherDailyList.value;
  const flag = data.city.country.toLowerCase();
  countryIcon.value = `http://openweathermap.org/images/flags/${flag}.png`
  cityName.value = data.city.name
  temp.value = tempArray[0]
  humidity.value = humidityArray[0] + "%"
  windSpeed.value = windArray[0].toFixed(1) + " Km/h"
  listContainer.innerHTML = '';
  for (let i = 0; i < data.list.length; i++) {
      const weatherItem = document.createElement('div');
      weatherItem.classList.add('weatherList');

      const iconUrl = `https://openweathermap.org/img/wn/${iconArray[i]}@2x.png`;
      let date = data.list[i].dt_txt;
      date = date.split(" ")[1].split(":")[0];

      weatherItem.innerHTML = `
    <span class="dateSpan">${date}</span>
    <span class="weatherIcon"><img src="${iconUrl}" alt="weather icon"></span>
    <span class="tempSpan">${tempArray[i]}</span>
  `;
      listContainer.appendChild(weatherItem);
  }
};
const fixDateInterval = (date) => {
  const [datePart, timePart] = date.split(' ');
  const [year, month, day] = datePart.split('-');
  const [hour, min, sec] = timePart.split(':');
  const newDateTime = Date.UTC(year, month - 1, day, hour, min, sec);
  return newDateTime;
};

const chartCreator1 = (chartId, chartType, title, subtitle, xAxisType, Ytitle, yAxisUnit, dataPointInterval, pointIntervalStart, seriesName, seriesData, color = '#000') => {
  console.log(pointIntervalStart)
  Highcharts.chart(chartId, {
      chart: {
          type: chartType,
          scrollablePlotArea: {
              minWidth: 400,
              scrollPositionX: 1
          },
          backgroundColor: '#0d121c',
          borderRadius: 15
      },
      title: {
          text: title,
          align: 'left',
          style: {
              color: '#FFFFFF'
          }
      },
      subtitle: {
          text: subtitle,
          align: 'left',
          style: {
              color: '#FFFFFF'
          }
      },
      xAxis: {
          type: xAxisType,
          // categories: xAxisCategories,
          // tickInterval: dataPointInterval,
          labels: {
              overflow: 'justify',
              style: {
                  color: '#FFFFFF'
              }
          }
      },
      yAxis: {
          title: {
              text: Ytitle,
          },
          labels: {
              style: {
                  color: '#FFFFFF'
              }
          },
          minorGridLineWidth: 0,
          gridLineWidth: 0,
          alternateGridColor: null,
          plotBands: []
      },
      tooltip: {
          valueSuffix: yAxisUnit,
      },
      plotOptions: {
          series: {
              lineWidth: 5,
              states: {
                  hover: {
                      lineWidth: 5
                  }
              },
              marker: {
                  enabled: false
              },
              pointInterval: dataPointInterval * 3600000,
              pointStart: pointIntervalStart
          }
      },

      series: [
          {
              name: seriesName,
              data: seriesData,
              color: color,
          },
      ],
      navigation: {
          menuItemStyle: {
              fontSize: '10px',
              style: {
                  background: '#0d121c',
                  color: '#FFFFFF'
              }
          }
      }
  });
};

const chartCreator2 = (chartId, chartType, title, subtitle, xAxisType, seriesLabel, yAxisUnit, dataPointInterval, xAxisCategories, seriesName1, seriesData1, color1, seriesName2, seriesData2, color2, seriesName3, seriesData3, color3) => {
  Highcharts.chart(chartId, {
      chart: {
          type: chartType,
          scrollablePlotArea: {
              minWidth: 400,
              scrollPositionX: 1
          },
          backgroundColor: '#0d121c',
          borderRadius: 15
      },
      title: {
          text: title,
          align: 'left',
          style: {
              color: '#FFFFFF'
          }
      },
      subtitle: {
          text: subtitle,
          align: 'left',
          style: {
              color: '#FFFFFF'
          }
      },
      xAxis: {
          type: xAxisType,
          // categories: xAxisCategories,
          // tickInterval: dataPointInterval,
          labels: {
              overflow: 'justify',
              style: {
                  color: '#FFFFFF'
              }
          }
      },
      yAxis: {
          title: {
              text: seriesLabel,
          },
          labels: {
              style: {
                  color: '#FFFFFF'
              }
          },
          minorGridLineWidth: 0,
          gridLineWidth: 0,
          alternateGridColor: null,
          plotBands: []
      },
      tooltip: {
          valueSuffix: yAxisUnit,
      },
      plotOptions: {
          series: {
              lineWidth: 5,
              states: {
                  hover: {
                      lineWidth: 5
                  }
              },
              marker: {
                  enabled: false
              },
              pointInterval: dataPointInterval * 3600000,
              pointStart: xAxisCategories
          }
      },
      series: [
          {
              name: seriesName1,
              data: seriesData1,
              color: color1,
          },
          {
              name: seriesName2,
              data: seriesData2,
              color: color2,
          },
          {
              name: seriesName3,
              data: seriesData3,
              color: color3,
          },
      ],
      navigation: {
          menuItemStyle: {
              fontSize: '10px',
              style: {
                  background: '#0d121c',
                  color: '#FFFFFF'
              }
          }
      }
  });
};

onMounted(() => {
  mainDate();
  fetchWeatherData();
});


onMounted(async () => {
  await fetchGlobeData()
  initGlobe('1910');
});

const initGlobe = (year) => {
  const pointsData = preparePointsData(year);

  globe.value = Globe()
      .globeImageUrl('BM.jpeg')
      .pointsData(pointsData)
      .pointAltitude(d => {
          return d.magnitude * 0.02 + 0.2;  // Adjust altitude based on magnitude
      })
      .pointColor(d => d.color)  // Use color returned by colorFn
      .pointRadius(d => d.size)  // Set radius based on magnitude
      (globeContainer.value);
};

const preparePointsData = (year) => {
  const yearData = jsonData.value.find(([y]) => y === year);
  if (!yearData) return [];

  const [yearName, coords] = yearData;

  // Transform the coordinates into points
  return coords.reduce((acc, _, i, arr) => {
      if (i % 3 === 0) {
          const lat = arr[i];
          const lng = arr[i + 1];
          const magnitude = arr[i + 2];  // Use magnitude as the third value
          acc.push({
              lat,
              lng,
              magnitude,
              year: yearName,
              color: colorFn(magnitude),  // Apply color based on magnitude
              size: sizeFn(magnitude),    // Apply size based on magnitude
          });
      }
      return acc;
  }, []);
};

const colorFn = (x) => {
  var c = new THREE.Color();

  if (x > 0.0) {
      c.setHSL(0.2139 - (x / 1.619) * 0.5, 1.0, 0.5);

  }
  else if (x < 0.0) {
      c.setHSL(0.5111 - (x / 1.619), 1.0, 0.6);

  }
  else {
      c.setRGB(1.0, 1.0, 1.0);
  }

  const color = c.getHexString()
  console.log(color)
  return '#' + color
};


// Size function based on magnitude
const sizeFn = (magnitude) => {
  return magnitude * 0.7;  // Adjust this scale factor as needed
};


const handleYearChange = (year) => {
  selectedYear.value = year
  // Destroy the old globe instance
  if (globe.value) globe.value = null

  // Initialize the globe with data for the selected year
  initGlobe(year);
};

const fetchGlobeData = async () => {
  await fetch('temp_anomaly_land.json')
      .then(response => response.json())
      .then(data => {
          jsonData.value = data;
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

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

.main-app-education {
  font-family: var(--ff-primary);
 color: var(--clr--grey-1);
 line-height: 1.5;
 font-size: 0.875rem;
 background: #061021;
 color: #f8f8f8;
 overflow-y: scroll;
}


/* for the globe body */
.separated {
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
 /* background-color: var(--clr-grey-10); Use the same background as below */
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
 min-width: 8%;
 padding: 15px;
 margin-bottom: 2%;
 border-radius: 15px;
 text-align: center;
 margin-left: 1%;
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
 .weatherMap {width: 100%; height: 200px; border-radius: 25px; margin-top: 25px;}
}







/* separation here */
/* globe css code */

/* New Wrapper */
.container {
 position: relative;
 padding-top: 20px; /* Adjust as needed */
 padding-bottom: 100px;
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