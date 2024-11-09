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
    data: [5000, 5200, 5500, 5800, 6000, 6500, 7000, 7500, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 27000, 29000, 31000, 33000, 35000, 37000, 39000, 41000, 43000, 45000, 47000, 49000, 51000, 53000, 55000, 57000, 59000, 61000, 63000, 65000, 67000, 69000, 71000, 73000, 75000, 77000, 79000, 81000, 83000, 85000, 87000, 89000, 91000, 93000, 95000, 97000, 99000, 101000, 103000, 105000, 107000, 109000, 111000, 113000, 115000, 117000, 119000, 121000, 123000, 125000, 127000, 129000, 131000, 133000, 135000, 137000, 139000, 141000, 143000, 145000, 147000, 149000, 151000, 153000, 155000, 157000, 159000, 161000, 163000, 165000],
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