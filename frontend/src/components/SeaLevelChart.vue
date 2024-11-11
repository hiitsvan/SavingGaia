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
    label: 'Global Sea Level Rise (mm)',
    data: Array.from({ length: 101 }, (_, i) => i * 3.4),
    borderColor: '#8A2BE2', // Changed to purple
    backgroundColor: 'rgba(138, 43, 226, 0.5)', // Changed to purple with transparency
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
      text: 'Global Sea Level Rise (1922-2023)',
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