
<template>
  <div class="opportunities-page">
    <!-- Filter Panel -->
    <aside class="filter-panel">
      <h2>Apply filters</h2>
      <p>Filter volunteering opportunities.</p>

      <!-- Saved Filter Dropdown -->
      <div class="filter-group">
        <label for="saved-filter">Select saved filter</label>
        <select id="saved-filter">
          <option value="">Select saved filter</option>
          <option value="recent">Recently Added</option>
          <option value="popular">Popular</option>
          <option value="nearby">Nearby</option>
        </select>
      </div>

      <!-- Keyword Filter -->
      <div class="filter-group">
        <label for="keyword">Keyword</label>
        <input type="text" id="keyword" placeholder="Search by keyword" v-model="keywords">
      </div>

      <!-- Time Filter -->
      <div class="filter-group">
        <label>Time</label>
        <label for="start-time" style="font-size: 0.7em">Start Time</label>
        <select id="start-time" class="time-dropdown" v-model="startTime">
          <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
        </select>


        <label for="end-time" style="font-size: 0.7em">End Time</label>
        <select id="end-time" class="time-dropdown" v-model="endTime">
          <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
        </select>
      </div>

      <!-- Location Filter -->
      <div class="filter-group">
        <label>Location</label>

        <!-- Central Location Checkbox -->
        <div class="checkbox">
          <input type="checkbox" id="location-central" value="central" v-model="locations" />
          <label for="location-central">Central</label>
        </div>

        <!-- East Location Checkbox -->
        <div class="checkbox">
          <input type="checkbox" id="location-east" value="east" v-model="locations" />
          <label for="location-east">East</label>
        </div>

        <!-- South Location Checkbox -->
        <div class="checkbox">
          <input type="checkbox" id="location-south" value="south" v-model="locations" />
          <label for="location-south">South</label>
        </div>

        <!-- West Location Checkbox -->
        <div class="checkbox">
          <input type="checkbox" id="location-west" value="west" v-model="locations" />
          <label for="location-west">West</label>
        </div>
      </div>


      <!-- Commitment Filter -->
      <div class="filter-group">
        <label for="commitment-filter">Commitment</label>
        <select id="commitment-filter" v-model="commitment">
          <option value="ad-hoc">Adhoc</option>
          <option value="long-term">Long-term</option>
        </select>
      </div>


      <button @click="searchOpp" class="button border border-0">Search</button>

    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Header Section -->
      <section class="header-section fade-up delay-2 d-block">
        <h1 class="heading">Start Your Volunteering Journey Today</h1>
        <p class="paragraph">
          We have curated the following volunteering opportunities for you!<br />
          Find the opportunity that strikes a chord to kick start your volunteering journey today!
        </p>
      </section>

      <!-- Content Section with 3 cards -->
      <section class="section fade-up delay-3">
        <div class="container">
          <div class="row">
            <!-- Card 1 -->
            <div class="card" v-for="opportunity in opportunities" :key="opportunity.id">
              <div class="card-image">
                <img v-bind:src="opportunity.image" alt="Event Image" />
              </div>
              <div class="card-content">
                <h3 class="card-heading">{{ opportunity.name }}</h3>
                <h3 class="card-heading" style="font-size:medium">{{ opportunity.org }}</h3>
                <p class="card-paragraph">
                  {{ opportunity.desc }}
                </p>
                <ul class="list">
                  <li class="list-item">
                    <img src="/media/date-71.png" alt="Date Icon" class="icon" />
                    <p>{{ formatFirestoreDate(opportunity.startTime) }}</p>
                  </li>
                  <li class="list-item">
                    <img src="/media/1035.png_1200.png" alt="Time Icon" class="icon" />
                    <p>{{ formatFirestoreTime(opportunity.startTime) }} - {{ formatFirestoreTime(opportunity.endTime) }}</p>
                  </li>
                  <li class="list-item">
                    <img src="/media/535239.png" alt="Location Icon" class="icon" />
                    <p>{{ formatLocation(opportunity.location) }}</p>
                  </li>
                </ul>
                <a href="#" class="button" @click.prevent="handleSaveToLikes(opportunity)">Save to likes</a>
              </div>
            </div>
          </div>
        
        </div>

      </section>
    </main>
  </div>
</template>



<script>

import axios from 'axios';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'OpportunitiesPage',
  data() {
    return {
      keywords: '',
      startTime: '',
      endTime: '',
      commitment: '',
      locations: [],
      opportunities: [],
      hours: Array.from({ length: 24 }, (_, i) => {
        const hour = String(i).padStart(2, '0');
        return `${hour}:00`;
      })
    };
  },
  mounted() {
    // Automatically load opportunities when the page loads
    this.searchOpp();
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    handleSearch() {
      // Print or return the current state of filter data when search is clicked
      console.log("Saved Filter:", this.savedFilter);
      console.log("Keyword:", this.keywords);
      console.log("Start Time:", this.startTime);
      console.log("End Time:", this.endTime);
      console.log("Location:", this.location);
      console.log("Commitment:", this.commitment);

      // You can add more logic here to send these filters to an API or process them further
    },
    async searchOpp() {
      try {
        // Make sure to provide a complete URL for the API endpoint
        const filters = {
          keywords: this.keywords,
          locations: this.locations,
          commitment: this.commitment,
          startTime: this.startTime,
          endTime: this.endTime
        };

        const response = await axios.get(`http://localhost:8001/api/match/`, {
          params: filters
        });
        this.opportunities = response.data; // Store the response data in the opportunities array
        console.log(this.opportunities);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
    },
    formatFirestoreTime(timestamp) {
    if (!timestamp || !timestamp.seconds) {
      return '-'; // Return '-' if no timestamp available
    }

    const milliseconds = timestamp.seconds * 1000;
    const date = new Date(milliseconds);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  },
  formatFirestoreDate(timestamp) {
    if (!timestamp || !timestamp.seconds) {
        return '-'; // Return '-' if no timestamp available
    }

    // Convert the Firestore timestamp to milliseconds
    const milliseconds = timestamp.seconds * 1000;
    const date = new Date(milliseconds);

    // Month names array
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Extract the day, month, and year
    const day = date.getDate();
    const month = monthNames[date.getMonth()]; // getMonth() is zero-based, giving values from 0-11
    const year = date.getFullYear();

    // Return formatted date with month name
    return `${day} ${month} ${year}`;
},
formatLocation(locationMap) {
    if (!locationMap || typeof locationMap !== 'object') {
        return '-'; // Return '-' if locationMap is missing or not an object
    }

    // Extract all values from the location map
    const locations = Object.values(locationMap);

    // Join all the location values into a single string, separated by commas
    return locations.join(', ');
},
async handleSaveToLikes(opportunity) {
      try {
        // Check if user is logged in
        if (!this.isLoggedIn) {
          // Redirect to login page if not logged in
          this.$router.push('/auth')
        } else {
          // Save opportunity to likes in the database
          await axios.post(`http://localhost:8001/likes`, {
            userId: this.user.id,
            opportunityId: opportunity.id
          });
          console.log(opportunity.name)
          alert('Opportunity saved to likes!');
        }
      } catch (error) {
        console.error("Error saving opportunity to likes:", error);
      }
    },
}
};
</script>


<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  font-family: 'Montserrat', sans-serif;
  color: #333;
  background-color: #f7f8fa;
  line-height: 1.6;
  display: block;
  overflow-x: hidden; 
}

.opportunities-page {
  display: grid;
  grid-template-columns: 20% 1fr; 
  gap: 20px;
  width: 100%;
}

/* Fade-In Animation with Delay (using opacity) */
.fade-up {
  opacity: 0;
  animation: fadeInOpacity 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.delay-1 {
  animation-delay: 0.3s;
}

.delay-2 {
  animation-delay: 0.6s;
}

.delay-3 {
  animation-delay: 0.9s;
}

/* Keyframes for the fade-up effect (using opacity) */
@keyframes fadeInOpacity {
  to {
    opacity: 1;
  }
}

/* Filter Panel Styles */
.filter-panel {
  width: 250px;
  padding: 20px;
  background-color: #ffffff;
  border-right: 1px solid #ddd;
  position: sticky;
  top: 60px; /* Sticky to stay at the top of the viewport when scrolling */
  overflow-y: auto;
  height: calc(100vh - 60px);
}

.filter-panel h2 {
  font-size: 1.5em;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
}

.filter-panel p {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 20px;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group label {
  font-weight: 600;
  font-size: 0.9em;
  display: block;
  margin-bottom: 5px;
}

.filter-group input[type="text"],
.filter-group select {
  width: 100%;
  padding: 8px;
  font-size: 0.9em;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.checkbox input {
  margin-right: 8px;
}

/* Time Dropdown Styling */
.time-dropdown {
  width: 100%;
  padding: 8px;
  font-size: 0.9em;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-height: 150px;
  /* Limits the dropdown height */
  overflow-y: auto;
  /* Adds scrollbar if options exceed max-height */
}

/* Main Content Adjustments */
.main-content {
  flex-grow: 1; /* Take up remaining space after the filter panel */
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-width: 100%;
}

/* Header Section */
.header-section {
  text-align: center;
  padding: 50px 20px;
  transition: transform 0.3s ease;
  /* Smooth transformation */
}

/* Hover effect for enlarging the text */
.header-section:hover {
  transform: scale(1.05);
  /* Scale up slightly on hover */
}

.heading {
  font-size: 3em;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.paragraph {
  font-size: 1.2em;
  color: #666;
}

/* Card Section */
.section {
  display: flex;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start; /* Align cards starting from the left */
}

.card {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  width: calc(33.333% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Hover Animation for Cards */
.card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 255, 0, 0.5);
  /* Added green glow */
}

/* Card Image */
.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card:hover .card-image img {
  transform: scale(1.1);
}

/* Card Content */
.card-content {
  padding: 20px;
}

.card-heading {
  font-size: 1.5em;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
}

.card-paragraph {
  font-size: 1em;
  color: #666;
  margin-bottom: 20px;
}

/* List Styles */
.list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.list-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #555;
}

.icon {
  width: 24px;
  height: auto;
  margin-right: 10px;
}

/* Button Styles */
.button {
  background-color: #3898ec;
  color: #fff;
  text-align: center;
  padding: 10px 15px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 700;
  margin: 20px;
  transition: background-color 0.3s, transform 0.3s;
  align-self: center;
}

.button:hover {
  background-color: #2679c4;
  transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .opportunities-page {
    flex-direction: column; /* Filter and content stack vertically */
  }

  .row {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 100%;
    margin-bottom: 20px;
  }

  /* Filter Panel becomes full-width on small screens */
  .filter-panel {
    width: 100%;
    position: relative;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }

  /* .main-content {
    margin-left: 0;
    width: 100%;
  } */
}
</style>
