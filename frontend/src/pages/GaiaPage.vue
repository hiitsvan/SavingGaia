<template>
    <div class="main-app-education education-page-container">
        <main class="main">
            <section class="globeSelection separated">
                <div class="container-fluid px-4 px-md-5">
                    <div class="position-relative globe-container">
                        <!-- Title Section -->
                        <div id="title" class="text-white mb-4">Surface Temperature Anomalies in the Past Century</div>

                        <!-- Current Information about the data -->
                        <div id="currentInfo" class="mb-4">
                            <span v-for="year in years" :key="year" :id="'year' + year" class="year"
                                :class="selectedYear == year ? 'active' : ''" @click="handleYearChange(year)">
                                {{ year }}s
                            </span>
                        </div>

                        <!-- Bio Section -->
                        <div id="bio" class="mb-4">
                            The globe shows the average temperature anomalies between 1910 and 2019 (decades). The
                            temperature anomalies are the difference in temperature at that location between a given
                            time period and the average temperature between the years of 1951 and 1980 (selected by
                            NASA).
                        </div>

                        <!-- Globe Container -->
                        <div class="globe-wrapper mb-4">
                            <div ref="globeContainer" id="container"></div>
                        </div>

                        <!-- Key Section -->
                        <div id="key" class="mb-4">
                            The colour and height of the spikes are jointly scaled to show the change in temperature
                            against the average of 1951-1980. Blues and purples symbolize temperatures cooler than the
                            average, while reds, yellows, and oranges symbolize temperatures warmer than the average.
                        </div>

                        <!-- Info Section -->
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

            <div class="container px-4 px-md-5 my-5">
                <div class="row g-4">
                    <div class="col-12 col-md-6 ">
                        <div class="chart-wrapper h-100">
                            <CarbonLevelsChart />
                        </div>
                    </div>
                    <div class="col-12 col-md-6 ">
                        <div class="chart-wrapper h-100">
                            <EnergyConsumptionChart />
                        </div>
                    </div>
                    <div class="col-12 col-md-6 ">
                        <div class="chart-wrapper h-100">
                            <SeaLevelChart />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
// Script remains exactly the same as before
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import * as THREE from 'three';
import Globe from 'globe.gl';
import CarbonLevelsChart from '../components/CarbonLevelsChart.vue';
import EnergyConsumptionChart from '../components/EnergyConsumptionChart.vue';
import SeaLevelChart from '../components/SeaLevelChart.vue';

const selectedYear = ref('1910');
const globe = ref(null);
const years = ref(['1910', '1920', '1930', '1940', '1980', '1990', '2000', '2010']);
const jsonData = ref([]);
const globeContainer = ref(null);
let resizeTimeout = null;

onMounted(async () => {
    await fetchGlobeData();
    await nextTick();
    initGlobe('1910');
    
    window.addEventListener('resize', handleResizeDebounced);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResizeDebounced);
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
});

const handleResizeDebounced = () => {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(handleResize, 250);
};

const handleResize = () => {
    if (!globe.value || !globeContainer.value) return;

    try {
        const containerWidth = globeContainer.value.clientWidth;
        const containerHeight = window.innerHeight < 768 
            ? Math.max(400, window.innerHeight * 0.6)  // Minimum height of 400px
            : Math.max(500, window.innerHeight * 0.8); // Minimum height of 500px

        globe.value.width(containerWidth);
        globe.value.height(containerHeight);
    } catch (error) {
        console.error('Error resizing globe:', error);
    }
};

const initGlobe = async (year) => {
    if (!globeContainer.value) return;

    try {
        const pointsData = preparePointsData(year);
        
        globe.value = Globe()
            .globeImageUrl('BM.jpeg')
            .pointsData(pointsData)
            .pointAltitude(d => d.magnitude * 0.02 + 0.2)
            .pointColor(d => d.color)
            .pointRadius(d => d.size)(globeContainer.value);

        await nextTick();
        handleResize();
    } catch (error) {
        console.error('Error initializing globe:', error);
    }
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
    const c = new THREE.Color();

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
    if (globe.value) {
        const pointsData = preparePointsData(year);
        globe.value.pointsData(pointsData);
    }
};

const fetchGlobeData = async () => {
    try {
        const response = await fetch('temp_anomaly_land.json');
        const data = await response.json();
        jsonData.value = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
</script>

<style scoped>
.main {
    overflow-x: hidden;
}

.globe-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
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

a.separated {
    color: #fff;
    text-decoration: none;
}

a:hover.separated {
    text-decoration: underline;
}

#info {
    font-size: 11px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 3px;
    padding: 10px;
    opacity: 0.7;
    text-align: right;
}

#currentInfo {
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    font: 15px Georgia;
}

.globe-wrapper {
    width: 100%;
    position: relative;
}

#container {
    margin: 0 auto;
    width: 100%;
    position: relative;
    min-height: 400px;
    height: calc(100vh - 200px);
    max-height: 80vh;
}

.globeSelection {
    background-color: black;
    position: relative;
    min-height: 100vh;
}

#key {
    text-align: left;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    font: 15px Georgia;
    padding: 10px;
    max-width: 800px;
    margin: 0 auto;
}

#bio {
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    font: 15px Georgia;
    padding: 10px;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

#title {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    font: 20px Georgia;
    padding: 10px;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
}

.year {
    font: 12px Verdana, Geneva, sans-serif;
    line-height: 30px;
    height: 30px;
    text-align: left;
    float: left;
    width: 150px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.1s ease-out;
    opacity: 0.8;
    display: block;
    margin: 5px 0;
}

.year:hover,
.year.active {
    font-size: 14px;
    color: #fff;
    opacity: 1;
}

.chart-wrapper {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 1rem;
    height: 100%;
}

@media (max-width: 768px) {
    #container {
        height: 60vh;
        min-height: 400px;
    }

    #key, #bio, #title {
        max-width: 100%;
        font-size: 13px;
        padding: 8px;
    }

    #title {
        font-size: 16px;
    }

    .year {
        font-size: 11px;
        line-height: 25px;
        height: 25px;
    }

    .year:hover,
    .year.active {
        font-size: 12px;
    }

    .globeSelection {
        padding: 1rem 0;
    }
}

@media (max-width: 480px) {
    #key, #bio {
        font-size: 12px;
        padding: 8px;
    }

    #title {
        font-size: 14px;
        padding: 8px;
    }
}
</style>