<template>
    <div class="main-app-education education-page-container">
        <main class="main">
            <section class="globeSelection separated">
                <div class="container">
                    <!-- Title Section -->
                    <div class="container">
                        <div id="title" class="text-white" style="z-index: 999;" >Surface Temperature Anomalies in the Past Century</div>

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
import { ref, onMounted} from 'vue';
import * as THREE from 'three';
import Globe from 'globe.gl';

const selectedYear = ref('1910')

const globe = ref(null)
const years = ref(['1910', '1920', '1930', '1940', '1980', '1990', '2000', '2010'])
const jsonData = ref([])

const globeContainer = ref(null)

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
    /* for the globe body */
    .main {
        overflow-x: hidden;
    }
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

    /* for the globe link */
    a.separated {
    color: #fff;
    text-decoration: none;
    }

    /* for the globe link */
    a:hover.separated {
    text-decoration: underline;
    }


    /* separation here */
    /* globe css code */

    /* New Wrapper */
    .container {
    position: relative;
    padding-top: 0; /* Adjust as needed */
    padding-bottom: 100px;
    }

    #info {
    position: absolute;
    bottom: 140px;
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
    bottom: 180px;
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

</style>