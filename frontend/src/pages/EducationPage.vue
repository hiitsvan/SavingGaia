<template>
    <div class="main-app-education">
        <!-- Main Navbar -->
  
        <main>
            <!-- Globe Section -->
            <section class="globeSelection separated">
                <div class="container">
                    <div id="title">Surface Temperature Anomalies in the Past Century</div>
                    <div ref="globeContainer" id="container"></div>
                    <div id="currentInfo">
                        <span v-for="year in years" :key="year" :id="'year' + year" class="year" 
                            :class="selectedYear == year ? 'active' : ''"
                            @click="handleYearChange(year)">
                            {{ year }}s
                        </span>
                    </div>
                    <div id="bio">
                        The globe shows the average temperature anomalies between 1910 and 2019 (decades). The
                        temperature anomalies are the difference in temperature at that location between a given
                        time period and the average temperature between the years of 1951 and 1980 (selected by
                        NASA).
                    </div>
                    <div id="key">
                        The colour and height of the spikes are jointly scaled to show the change in temperature
                        against the average of 1951-1980. Blues and purples symbolize temperatures cooler than the
                        average, while reds, yellows, and oranges symbolize temperatures warmer than the average.
                    </div>
                    <div id="info">
                        <strong>
                            <a href="http://www.chromeexperiments.com/globe" class="separated">WebGL Globe</a>
                        </strong>
                        <span class="bull">&bull;</span>Data acquired from
                        <a href="https://data.giss.nasa.gov/gistemp/" class="separated">NASA-GISTEMPv4</a>
                    </div>
                </div>
            </section>
        </main>
  
        <!-- Footer -->
        <footer class="footer">
            <div class="footer__container">
                <div class="footer__logo">
                    <h2 class="logo__text">SavingGaia</h2>
                    <p class="logo__description">Join us in our mission to protect and preserve our planet for future generations.</p>
                    <div class="social__links">
                        <a href="https://www.instagram.com/zwayz_/" target="_blank" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.instagram.com/sebestbestebst/" target="_blank" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.instagram.com/kangyan_yang/" target="_blank" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.instagram.com/hiitsvan/" target="_blank" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.instagram.com/notsamuelchua_/" target="_blank" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="footer__column">
                    <h3 class="footer__heading">Directory</h3>
                    <ul class="footer__links">
                        <li><a href="home" class="footer__link">Home</a></li>
                        <li><a href="education" class="footer__link">Education</a></li>
                        <li><a href="news" class="footer__link">News</a></li>
                        <li><a href="opportunities" class="footer__link">Opportunities</a></li>
                    </ul>
                </div>
                <div class="footer__column">
                    <h3 class="footer__heading">Contact Us</h3>
                    <ul class="footer__contact">
                        <li class="contact__item"><i class="fas fa-map-marker-alt"></i>  &nbsp; SebHouse, 576422 </li>
                        <li class="contact__item"><i class="fas fa-phone"></i> +65 8888 88888</li>
                        <li class="contact__item"><i class="fas fa-envelope"></i> &nbsp;goodteam@savinggaia.com</li>
                    </ul>
                </div>
            </div>
            <div class="footer__bottom">
                <p>&copy; 2024 SavingGaia. All rights reserved.</p>
            </div>
        </footer>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import Globe from 'globe.gl';

const formattedDate = ref('');
const selectedYear = ref('1910');
const globe = ref(null);
const years = ref(['1910', '1920', '1930', '1940', '1980', '1990', '2000', '2010']);
const jsonData = ref([]);
const globeContainer = ref(null);

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

const initGlobe = (year) => {
    const pointsData = preparePointsData(year);

    globe.value = Globe()
        .globeImageUrl('BM.jpeg')
        .pointsData(pointsData)
        .pointAltitude(d => d.magnitude * 0.02 + 0.2)
        .pointColor(d => d.color)
        .pointRadius(d => d.size)(globeContainer.value); // Fixed function call syntax
};

const preparePointsData = (year) => {
    const yearData = jsonData.value.find(([y]) => y === year);
    if (!yearData) return [];

    const [yearName, coords] = yearData;

    return coords.reduce((acc, _, i, arr) => {
        if (i % 3 === 0) {
            const lat = arr[i];
            const lng = arr[i + 1];
            const magnitude = arr[i + 2];
            acc.push({
                lat,
                lng,
                magnitude,
                year: yearName,
                color: colorFn(magnitude),
                size: sizeFn(magnitude),
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
    return '#' + c.getHexString();
};

const sizeFn = (magnitude) => {
    return magnitude * 0.7;
};

const handleYearChange = (year) => {
    selectedYear.value = year;
    if (globe.value) globe.value = null;
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
};

onMounted(async () => {
    mainDate();
    await fetchGlobeData();
    initGlobe('1910');
});
</script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');
  
  :root {
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
  
  .main-app-education {
      font-family: var(--ff-primary);
      color: var(--clr--grey-1);
      line-height: 1.5;
      font-size: 0.875rem;
      background: #061021;
      color: #f8f8f8;
      overflow-y: scroll;
  }
  
  /* Header Styles */
  
  .brand-date h3, .brand-date h4 {
      margin: 0;
      color: var(--clr-grey-10);
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
  
  /* Globe Section Styles */
  .globeSelection {
      min-height: 100vh;
      background-color: black;
  }
  
  .container {
      position: relative;
      padding-top: 20px;
      padding-bottom: 100px;
  }
  
  #container {
      margin: 0 auto;
      height: 100vh;
      width: 100%;
      position: relative;
      min-height: 400px;
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
      color: white;
  }
  
  #currentInfo {
      width: 70px;
      position: absolute;
      left: 20px;
      top: 140px;
      padding: 10px;
      background-color: rgba(0.9,0.9,0.9,0.3);
      border-radius: 3px;
      font: 15px Georgia;
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
  
  #bio {
      position: absolute;
      top: 20px;
      width: 350px;
      right: 20px;
      color: white;
      background-color: rgba(0.9,0.9,0.9,0.3);
      border-radius: 3px;
      font: 15px Georgia;
      padding: 10px;
      text-align: right;
  }
  
  #key {
      position: absolute;
      bottom: 60px;
      left: 20px;
      width: 350px;
      text-align: left;
      opacity: 0.7;
      color: white;
      background-color: rgba(0.9,0.9,0.9,0.3);
      border-radius: 3px;
      font: 15px Georgia;
      padding: 10px;
  }
  
  #info {
      position: absolute;
      bottom: 20px;
      right: 10px;
      font-size: 11px;
      background-color: rgba(0,0,0,0.8);
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
  
  /* Footer Styles */
  .footer {
      background: linear-gradient(to right, #1a1a1a, #2a2a2a);
      color: #fff;
      padding: 4rem 0 2rem;
      position: relative;
  }
  
  .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #4CAF50, #2196F3, #9C27B0);
  }
  
  .footer__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 4rem;
  }
  
  .footer__logo {
      grid-column: span 1;
  }
  
  .logo__text {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(45deg, #4CAF50, #2196F3);
      display: inline-block;
      padding: 0.5vh 1.5vw;
  }
  
  .logo__description {
      color: #aaa;
      line-height: 1.6;
      margin-bottom: 1.5rem;
  }
  
  .social__links {
      display: flex;
      gap: 1rem;
  }
  
  .social__link {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      text-decoration: none;
      transition: all 0.3s ease;
  }
  
  .social__link:hover {
      background: #4CAF50;
      transform: translateY(-3px);
  }
  
  .footer__column {
      grid-column: span 1;
  }
  
  .footer__heading {
      color: #fff;
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      position: relative;
      padding-bottom: 0.5rem;
  }
  
  .footer__heading::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background: #4CAF50;
  }
  
  .footer__links, .footer__contact {
      list-style: none;
      padding: 0;
      margin: 0;
  }
  
  .footer__link, .contact__item {
      color: #aaa;
      text-decoration: none;
      display: block;
      margin-bottom: 0.8rem;
      transition: all 0.3s ease;
  }
  
  .footer__link:hover, .contact__item:hover {
      color: #4CAF50;
  }
  
  .footer__bottom {
      text-align: center;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .footer__bottom p {
      color: #aaa;
      font-size: 0.9rem;
  }
  
  @media (max-width: 992px) {
      .footer__container {
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
      }
      
      .footer__logo {
          grid-column: 1 / -1;
      }
  }
  
  @media (max-width: 576px) {
      .footer__container {
          grid-template-columns: 1fr;
          gap: 2rem;
      }
  }
  </style>