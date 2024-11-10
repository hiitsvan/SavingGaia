<script setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const data = {
  labels: Array.from({ length: 101 }, (_, i) => 1922 + i),
  datasets: [{
    label: 'Atmospheric CO₂ (ppm)',
    data: [
  300, 302, 304, 306, 308, 310, 312, 314, 316, 318, 320, 324, 328, 332,
  336, 340, 345, 350, 355, 360, 370, 380, 402, 410, 413, 418, 421, 426,
  431, 436, 441, 445, 451, 456, 458, 466, 474, 480, 481, 485, 490, 495,
  500, 505, 517, 525, 525, 525, 530, 535, 540, 545, 550, 556, 561, 565,
  570, 575, 580, 585, 590, 595, 600, 620, 640, 660, 680, 700, 720, 740, 790, 840, 854, 862, 874, 882, 890, 900, 912, 924, 934, 944, 950, 969, 973, 978, 982, 985, 991, 998, 1012, 1022, 1024, 1032, 1040, 1041, 1048
],
    borderColor: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.5)',
    fill: true,
    tension: 0.4,
  }]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 2000,
    easing: 'easeInOutQuart'
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#FFFFFF',
        font: {
          size: 14
        }
      }
    },
    title: {
      display: true,
      text: 'Atmospheric CO₂ Levels (1922-2023)',
      color: '#FFFFFF',
      font: {
        size: 24,
        weight: 'bold'
      },
      padding: {
        top: 20,
        bottom: 20
      }
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true
        },
        mode: 'xy'
      },
      pan: {
        enabled: true,
        mode: 'xy'
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#FFFFFF',
        font: {
          size: 12
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#FFFFFF',
        font: {
          size: 12
        }
      }
    }
  }
};
</script>

<template>
  <div class="chart-container">
    <Line :data="data" :options="options" />
  </div>
</template>

<style scoped>
.chart-container {
  height: 450px;
  position: relative;
  margin: 40px 0;
}
</style>