<template>
    <div class="container">
      <section id="selection-header">
        <h1>{{ headerText }}</h1>
        <p class="text-muted">Select the volunteer work you have completed</p>
      </section>
  
      <section id="volunteer-cards" class="cards-grid" v-show="showCardsSection">
        <div class="volunteer-card" v-for="(volunteer, index) in volunteerCards" :key="index"
          :data-id="volunteer.id" @click="selectCard(volunteer)"
          :class="{ selected: selectedCards.includes(volunteer) }">
          <img :src="volunteer.image" alt="Volunteer work image" />
          <h3>{{ volunteer.name }}</h3>
          <p>Date: {{ formatFirestoreDate(volunteer.startTime) }}</p>
          <p>Time: {{ formatFirestoreTime(volunteer.startTime) }} - {{ formatFirestoreTime(volunteer.endTime) }}
            ({{ eventDuration(volunteer.startTime, volunteer.endTime) }})
          </p>
          <p>Location: {{ formatLocation(volunteer.location) }}</p>
          <p>Roles: {{ formatRoles(volunteer.roles) }}</p>
          <div class="impact-scores">
            <h5>Impact Scores:</h5>
            <div v-for="(value, key) in volunteer.dash" :key="key" class="impact-row">
              <span class="impact-label">{{ key }}:</span>
              <div class="impact-indicators">
                <template v-for="n in 5" :key="n">
                  <i :class="[
                    'impact-icon',
                    {
                      'active': n <= value,
                      'fa': true,
                      'fa-thermometer-full': key === 'Temperature Moderated',
                      'fa-tint': key === 'Water Conserved',
                      'fa-leaf': key === 'Carbon Offset',
                      'fa-mountain': key === 'Land Reforested'
                    }
                  ]"></i>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Complete Work Button -->
      <div class="complete-work-section" v-if="selectedCards.length > 0">
        <button @click="markAsCompleted" class="complete-btn">
          Mark {{ selectedCards.length }} {{ selectedCards.length === 1 ? 'Work' : 'Works' }} as Completed
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        headerText: 'Your Saved Volunteer Work',
        volunteerCards: [],
        selectedCards: [],
        showCardsSection: true
      };
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'user']),
    },
    async created() {
      if (this.isAuthenticated && this.user) {
        try {
          const userId = this.user.uid;
          const response = await axios.get(`http://localhost:8001/likes/${userId}`);
          this.volunteerCards = response.data;
        } catch (error) {
          console.error("Error fetching saved likes:", error);
        }
      } else {
        console.warn("User is not logged in. Cannot fetch saved likes.");
      }
    },
    methods: {
      async markAsCompleted() {
        console.log('Sending completed works:', this.selectedCards);
        if (!this.isAuthenticated) {
          this.$router.push('/auth');
          return;
        }
  
        try {
          console.log('Starting markAsCompleted process');
          const completedWorks = this.selectedCards.map(card => ({
            ...card,
            completionDate: new Date().toISOString()
          }));
  
          console.log('Sending completed works to backend:', completedWorks);
          
          const response = await axios.post('http://localhost:8001/completed-works', {
            userId: this.user.uid,
            works: completedWorks
          }, {
            timeout: 5000,
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          console.log('Backend response:', response.data);
  
          // Remove completed works from likes
          await Promise.all(completedWorks.map(work => 
            axios.delete(`http://localhost:8001/likes/${this.user.uid}/${work.id}`)
          ));
  
          // Navigate to dashboard
          this.$router.push('/dashboard');
        } catch (error) {
          console.error('Error marking works as completed:', error);
          if (error.response) {
            console.error('Server response:', error.response.data);
            alert(`Failed to mark works as completed: ${error.response.data.error}`);
          } else if (error.request) {
            console.error('No response received:', error.request);
            alert('Server is not responding. Please try again later.');
          } else {
            console.error('Error setting up request:', error.message);
            alert('Failed to send request. Please try again.');
          }
        }
      },
  
      selectCard(card) {
        const index = this.selectedCards.indexOf(card);
        if (index === -1) {
          this.selectedCards.push(card);
        } else {
          this.selectedCards.splice(index, 1);
        }
      },
  
      formatFirestoreTime(timestamp) {
        if (!timestamp || !timestamp._seconds) return '-';
        const milliseconds = timestamp._seconds * 1000;
        const date = new Date(milliseconds);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      },
  
      formatFirestoreDate(timestamp) {
        if (!timestamp || !timestamp._seconds) return '-';
        const milliseconds = timestamp._seconds * 1000;
        const date = new Date(milliseconds);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      },
  
      eventDuration(startTime, endTime) {
        if (!startTime || !endTime) return '-';
        const startSeconds = startTime._seconds;
        const endSeconds = endTime._seconds;
        if (!startSeconds || !endSeconds) return '-';
  
        const durationInSeconds = endSeconds - startSeconds;
        if (durationInSeconds <= 0) return '-';
  
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
  
        let durationStr = '';
        if (hours > 0) durationStr += `${hours}h`;
        if (minutes > 0) {
          if (hours > 0) durationStr += ' ';
          durationStr += `${minutes}min`;
        }
        return durationStr;
      },
  
      formatLocation(locationMap) {
        if (!locationMap || typeof locationMap !== 'object') return '-';
        return Object.entries(locationMap)
          .map(([key, value]) => `${value} (${key.charAt(0).toUpperCase() + key.slice(1)})`)
          .join(', ');
      },
  
      formatRoles(rolesMap) {
        if (!rolesMap || typeof rolesMap !== 'object') return '-';
        return Object.entries(rolesMap)
          .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)} (${value})`)
          .join(', ');
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 100%;
    margin: 0 auto;
    padding: 2rem;
    background-color: #000000;
    min-height: 100vh;
    color: white;
  }
  
  #selection-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    border-radius: 10px;
    background: linear-gradient(145deg, #161616, #1a1a1a);
    box-shadow: 0 2px 15px rgba(255, 255, 255, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  #selection-header h1 {
    color: #f0f0f0;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }
  
  .volunteer-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
    padding: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    color: black;
  }
  
  .volunteer-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(255, 255, 255, 0.15);
  }
  
  .volunteer-card.selected {
    border: 3px solid green;
    animation: pulse 1s;
  }
  
  .volunteer-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  .volunteer-card h3 {
    margin: 0.5rem 0;
    color: #333;
  }
  
  .volunteer-card p {
    margin: 0.3rem 0;
    color: #666;
  }
  
  .complete-work-section {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    text-align: center;
  }
  
  .complete-btn {
    background-color: green;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 2rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .complete-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background-color: darkgreen;
  }
  
  .impact-scores {
    margin: 1rem 0;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }
  
  .impact-row {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
    gap: 1rem;
  }
  
  .impact-label {
    min-width: 70px;
    color: #666;
  }
  
  .impact-indicators {
    display: flex;
    gap: 0.5rem;
  }
  
  .impact-icon {
    font-size: 1rem;
    opacity: 0.3;
  }
  
  .impact-icon.active {
    opacity: 1;
  }
  
  .fa-thermometer-full.active { color: #ff4444; }
  .fa-tint.active { color: #2196f3; }
  .fa-leaf.active { color: #4caf50; }
  .fa-mountain.active { color: #795548; }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  
  @media (max-width: 768px) {
    .cards-grid {
      grid-template-columns: 1fr;
    }
    
    .complete-btn {
      width: 90%;
      margin: 0 auto;
    }
  }
  </style>