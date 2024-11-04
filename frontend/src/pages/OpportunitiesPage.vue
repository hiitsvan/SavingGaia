<template>
  <div class="opportunities-page container-fluid">
    <div class="row">
      <!-- Filter Panel -->
      <aside class="col-lg-3 col-md-4 filter-panel">
        <div class="sticky-top pt-4">
          <h2 class="mb-3">Apply filters</h2>
          <p class="text-muted mb-4">Filter volunteering opportunities.</p>

          <!-- Keyword Filter -->
          <div class="mb-4">
            <label for="keyword" class="form-label">Keyword</label>
            <input type="text" id="keyword" class="form-control" placeholder="Search by keyword" v-model="keywords">
          </div>

          <!-- Time Filter -->
          <div class="mb-4">
            <label class="form-label">Time</label>
            <div class="mb-2">
              <label for="start-time" class="form-label small">Start Time</label>
              <select id="start-time" class="form-select" v-model="startTime">
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select>
            </div>
            <div>
              <label for="end-time" class="form-label small">End Time</label>
              <select id="end-time" class="form-select" v-model="endTime">
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select>
            </div>
          </div>

          <!-- Location Filter -->
          <div class="mb-4">
            <label class="form-label">Location</label>
            <div class="form-check mb-2">
              <input type="checkbox" id="location-central" class="form-check-input" value="central" v-model="locations">
              <label class="form-check-label" for="location-central">Central</label>
            </div>
            <div class="form-check mb-2">
              <input type="checkbox" id="location-east" class="form-check-input" value="east" v-model="locations">
              <label class="form-check-label" for="location-east">East</label>
            </div>
            <div class="form-check mb-2">
              <input type="checkbox" id="location-south" class="form-check-input" value="south" v-model="locations">
              <label class="form-check-label" for="location-south">South</label>
            </div>
            <div class="form-check mb-2">
              <input type="checkbox" id="location-west" class="form-check-input" value="west" v-model="locations">
              <label class="form-check-label" for="location-west">West</label>
            </div>
          </div>

          <!-- Commitment Filter -->
          <div class="mb-4">
            <label for="commitment-filter" class="form-label">Commitment</label>
            <select id="commitment-filter" class="form-select" v-model="commitment">
              <option value="ad-hoc">Adhoc</option>
              <option value="long-term">Long-term</option>
            </select>
          </div>

          <button @click="searchOpp" class="btn btn-primary">Search</button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="col-lg-9 col-md-8 main-content">
        <!-- Header Section -->
        <section class="header-section text-center fade-up delay-2 py-5">
          <h1 class="heading display-4">Start Your Volunteering Journey Today</h1>
          <p class="paragraph lead">
            We have curated the following volunteering opportunities for you!<br>
            Find the opportunity that strikes a chord to kick start your volunteering journey today!
          </p>
        </section>

        <!-- Sort Filter -->
        <!-- <div class="row align-items-end mb-4 fade-up delay-2">
          <div class="col-sm-4">
            <label for="sort-by" class="form-label">Sort By</label>
            <select id="sort-by" class="form-select" v-model="sortBy">
              <option value="">Select...</option>
              <option value="date">Date</option>
              <option value="location">Location</option>
            </select>
          </div>
          <div class="col-sm-4">
            <label for="sort-order" class="form-label">Order</label>
            <select id="sort-order" class="form-select" v-model="sortOrder">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div class="col-sm-4">
            <button @click="sortOpportunities" class="btn btn-primary">Sort</button>
          </div>
        </div> -->

        <!-- Opportunities Grid -->
        <div class="row g-4 fade-up delay-3">
          <div class="col-xl-4 col-md-6" v-for="opportunity in opportunities" :key="opportunity.id">
            <div class="card h-100" @click="goToOpportunityDetails(opportunity.id)">
              <div class="card-image-wrapper">
                <img :src="opportunity.image" class="card-img-top" alt="Event Image">
              </div>
              <div class="card-body">
                <h3 class="card-title">{{ opportunity.name }}</h3>
                <h4 class="card-subtitle mb-3">{{ opportunity.org }}</h4>
                <ul class="list-unstyled">
                  <li class="d-flex align-items-center mb-2">
                    <img src="/media/date-71.png" alt="Date Icon" class="icon me-2">
                    <span>{{ formatFirestoreDate(opportunity.startTime) }}</span>
                  </li>
                  <li class="d-flex align-items-center mb-2">
                    <img src="/media/1035.png_1200.png" alt="Time Icon" class="icon me-2">
                    <span>{{ formatFirestoreTime(opportunity.startTime) }} - {{ formatFirestoreTime(opportunity.endTime) }}</span>
                  </li>
                  <li class="d-flex align-items-center mb-2">
                    <img src="/media/535239.png" alt="Location Icon" class="icon me-2">
                    <span>{{ formatLocation(opportunity.location) }}</span>
                  </li>
                </ul>
                <button @click.stop="handleSaveToLikes(opportunity)" class="btn btn-primary">
                  {{ opportunity.isLiked ? 'Remove from Likes' : 'Save to Likes' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
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
    ...mapGetters(['getUser', 'isLoggedIn']),
  },
  methods: {
    goToOpportunityDetails(opportunityId) {
      this.$router.push({ name: 'OpportunitiesDetailsPage', params: { opportunityId } });
    },
    async created() {
      // Automatically load opportunities when the page loads
      await this.searchOpp();
      // Check which opportunities are already liked
      if (this.isLoggedIn) {
        await this.checkLikedOpportunities();
      }
    },
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

        const response = await axios.get(`http://localhost:8001/opportunities/`, {
          params: filters
        });
        this.opportunities = response.data.map((opportunity) => ({
          ...opportunity,
          isLiked: false, // Initialize isLiked to false
        }));
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
    },
    async checkLikedOpportunities() {
      try {
        const userId = this.getUser.uid;

        for (const opportunity of this.opportunities) {
          const response = await axios.get(`http://localhost:8001/likes/${userId}/${opportunity.id}`);
          opportunity.isLiked = response.data.isLiked;
        }
      } catch (error) {
        console.error('Error checking liked opportunities:', error);
      }
    },
    async handleSaveToLikes(opportunity) {
      try {
        // Check if user is logged in
        if (!this.isLoggedIn) {
          // Redirect to login page if not logged in
          this.$router.push('/auth');
        } else {
          const userId = this.getUser.uid;

          if (opportunity.isLiked) {
            // If already liked, remove from likes
            await axios.delete(`http://localhost:8001/likes/${userId}/${opportunity.id}`);
            opportunity.isLiked = false;
            alert('Opportunity removed from likes!');
          } else {
            // If not liked, save to likes
            await axios.post('http://localhost:8001/likes', {
              userId: userId,
              opportunityId: opportunity.id,
            });
            opportunity.isLiked = true;
            alert('Opportunity saved to likes!');
          }
        }
      } catch (error) {
        console.error('Error saving/removing opportunity to/from likes:', error);
      }
    },

    formatFirestoreTime(timestamp) {
      if (!timestamp || !timestamp._seconds) {
        return '-'; // Return '-' if no timestamp available
      }

      const milliseconds = timestamp._seconds * 1000; // Convert seconds to milliseconds
      const date = new Date(milliseconds);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    },

    formatFirestoreDate(timestamp) {
      if (!timestamp || (!timestamp.seconds && !timestamp._seconds)) {
        return '-'; // Return '-' if no timestamp available
      }

      // Determine the seconds value depending on the property name available
      const seconds = timestamp.seconds || timestamp._seconds;

      // Convert the Firestore timestamp to milliseconds
      const milliseconds = seconds * 1000;
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
  }
};
</script>


<style scoped>
/* Retain existing animations and custom styles */
.fade-up {
  opacity: 0;
  animation: fadeInOpacity 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.delay-1 { animation-delay: 0.3s; }
.delay-2 { animation-delay: 0.6s; }
.delay-3 { animation-delay: 0.9s; }

@keyframes fadeInOpacity {
  to { opacity: 1; }
}

/* Custom styling on top of Bootstrap */
.filter-panel {
  background-color: #ffffff;
  border-right: 1px solid #eaeaea;
  min-height: 100vh;
}

.heading {
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.paragraph {
  color: #666;
}

.card {
  border-radius: 15px;
  border: none;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  cursor: pointer;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 5px 5px 20px #a4a3a3
}

.card-image-wrapper {
  overflow: hidden;
  height: 200px;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card:hover .card-img-top {
  transform: scale(1.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
}

.card-subtitle {
  font-size: 1rem;
  color: #666;
}

.icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* Bootstrap button customization */
.btn-primary {
  background-color: black;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: green;
  border-color: #2679c4;
  transform: scale(1.02);
}


/* Responsive adjustments */
@media (max-width: 991.98px) {
  .filter-panel {
    border-right: none;
    border-bottom: 1px solid #eaeaea;
    min-height: auto;
  }

  .sticky-top {
    position: relative !important;
    top: 0 !important;
  }

  .heading {
    font-size: 2.5rem;
  }
}

@media (max-width: 767.98px) {
  .heading {
    font-size: 2rem;
  }

  .card-image-wrapper {
    height: 180px;
  }
}
</style>