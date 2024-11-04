<template>
    <div class="opportunity-details-page fade-up">
      <div v-if="opportunity" class="container py-5">
        <div class="header-section text-start mb-5">
          <h1 class="opportunity-title display-4">{{ opportunity.name }}</h1>
        </div>
  
        <div class="content-section">
          <div class="row g-4">
            <div class="col-lg-7">
              <div class="image-container">
                <img :src="opportunity.image" alt="Opportunity Image" class="opportunity-image" />
              </div>
            </div>
            <div class="col-lg-5">
              <div class="description-container">
                <h2 class="section-title">About This Initiative</h2>
                <p class="description-text">{{ opportunity.desc }}</p>
              </div>
            </div>
          </div>
  
          <div class="details-section mt-5">
            <h2 class="section-title text-start mb-4">Event Details</h2>
            <div class="row g-4">
              <div class="col-md-6">
                <div class="detail-card">
                  <div class="detail-item">
                    <span class="detail-label">Organization</span>
                    <span class="detail-value fw-bold">{{ opportunity.org }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Date</span>
                    <span class="detail-value">{{ formatFirestoreDate(opportunity.startTime) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Time</span>
                    <span class="detail-value">{{ formatFirestoreTime(opportunity.startTime) }} - {{
                      formatFirestoreTime(opportunity.endTime) }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="detail-card">
                  <div class="detail-item">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">{{ formatLocation(opportunity.location) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Available Roles</span>
                    <span class="detail-value">{{ formatRoles(opportunity.roles) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading-container">
        <div class="spinner"></div>
        <p>Loading opportunity details...</p>
      </div>
    </div>
  </template>
  

<script>
import axios from 'axios';

export default {
    name: 'OpportunityDetails',
    props: ['opportunityId'], // Accept the opportunityId as a prop
    data() {
        return {
            opportunity: null,
        };
    },
    async created() {
        try {
            const response = await axios.get(`http://localhost:8001/opportunities/${this.opportunityId}`);
            this.opportunity = response.data;
        } catch (error) {
            console.error('Error fetching opportunity details:', error);
        }
    },
    methods: {
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
        formatRoles(rolesMap) {
            if (!rolesMap || typeof rolesMap !== 'object') {
                return '-'; // Return '-' if locationMap is missing or not an object
            }

            // Extract all values from the location map
            const formattedRoles = Object.entries(rolesMap).map(([key, value]) => {
                // Capitalize the first letter of the key
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                return `${capitalizedKey} (${value})`;
            });

            // Join all the formatted key-value pairs into a single string, separated by commas
            return formattedRoles.join(', ');
        },
    },
};
</script>

<style scoped>
.opportunity-details-page {
  background-color: #ffffff;
  min-height: 100vh;
  padding: 2rem 0;
}

.opportunity-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.opportunity-subtitle {
  font-size: 1.25rem;
  color: #666666;
  font-weight: 400;
}

.fade-up {
  opacity: 0;
  animation: fadeInOpacity 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes fadeInOpacity {
  to {
    opacity: 1;
  }
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 1.5rem;
  letter-spacing: -0.3px;
}

.image-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.opportunity-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
}

.description-container {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  height: 100%;
  border: 1px solid #eaeaea;
}

.description-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333333;
}

.detail-card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  height: 100%;
  border: 1px solid #eaeaea;
  transition: transform 0.2s ease;
}

.detail-card:hover {
  transform: translateY(-2px);
}

.detail-item {
  padding: 1rem 0;
  border-bottom: 1px solid #eaeaea;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  display: block;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  display: block;
  color: #333333;
  font-size: 1.1rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #eaeaea;
  border-top: 3px solid #000000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .opportunity-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .opportunity-image {
    height: 300px;
  }

  .description-container,
  .detail-card {
    padding: 1.25rem;
  }
}
</style>