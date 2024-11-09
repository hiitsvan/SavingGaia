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
    data: [305, 307, 309, 311, 313, 315, 318, 320, 323, 325, 328, 330, 333, 335, 338, 340, 343, 345, 348, 350, 353, 355, 358, 360, 363, 365, 368, 370, 373, 375, 378, 380, 383, 385, 388, 390, 393, 395, 398, 400, 403, 405, 408, 410, 413, 415, 418, 420, 423, 425, 428, 430, 433, 435, 438, 440, 443, 445, 448, 450, 453, 455, 458, 460, 463, 465, 468, 470, 473, 475, 478, 480, 483, 485, 488, 490, 493, 495, 498, 500, 503, 505, 508, 510, 513, 515, 518, 520, 523, 525, 528, 530, 533, 535, 538, 540, 543, 545, 548, 550],
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