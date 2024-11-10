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
    label: 'Global Energy Consumption (TWh)',
    data: [
  5000, 5100, 5200, 5300, 5400, 5500, 5700, 5900, 6100, 6300, 6500, 6800, 7100, 
  7400, 7700, 8000, 8300, 8600, 8900, 9300, 9700, 10200, 10800, 11500, 12200, 
  13000, 13800, 14600, 15500, 16400, 17300, 18200, 19100, 20000, 21000, 22000, 
  23000, 24000, 25000, 26200, 27400, 28600, 29800, 31000, 32300, 33600, 34900, 
  36200, 37500, 38800, 40200, 41600, 43000, 44500, 46000, 47500, 49000, 50500, 
  52000, 53500, 55000, 56500, 58000, 59500, 61000, 62500, 64000, 65500, 67000, 
  68500, 70000, 71500, 73000, 74500, 76000, 77500, 79000, 80500, 82000, 83500, 
  85000, 86500, 88000, 89500, 91000, 92500, 94000, 95500, 97000, 98500, 100000, 
  101500, 103000, 104500, 106000, 107500, 109000, 110500, 112000, 113500, 115000, 
  116500, 118000, 119500, 121000, 122500, 124000, 125500, 127000, 128500, 130000
],
    borderColor: '#4ECDC4',
    backgroundColor: 'rgba(78, 205, 196, 0.5)',
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
      text: 'Global Energy Consumption (1922-2023)',
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