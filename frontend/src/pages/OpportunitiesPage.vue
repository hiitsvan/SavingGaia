<template>
  <div class="opportunities-page container-fluid mb-5">
    <div class="row">
      <!-- Filter Panel -->
      <aside class="col-lg-3 col-md-4 filter-panel">
        <div class="sticky-top pt-4">
          <h2 class="mb-3">Apply filters</h2>
          <p class="mb-4 text-light">Filter volunteering opportunities.</p>

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
          <!-- status  -->
          <div class="mb-4">
            <label for="status-filter" class="form-label">Status</label>
            <select id="status-filter" class="form-select" v-model="status">
              <option value="">All</option>
              <option value="saved">Saved</option>
              <option value="unsaved">Unsaved</option>
            </select>
          </div>

          <button @click="searchOpp" class="btn btn-outline-primary">Search</button>
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


        <!-- Sort Controls -->
        <div class="sort-controls mb-4 fade-up delay-2">
          <div class="row align-items-center">
            <div class="col-md-4">
              <div class="d-flex align-items-center">
                <label class="me-3 text-nowrap">Sort by:</label>
                <select class="form-select" v-model="sortOption" @change="handleSort">
                  <option value="">Select sorting option...</option>
                  <option value="nearest">Near Me</option>
                  <option value="totalImpact">Highest Impact Score (Total)</option>
                  <option value="carbonImpact">Highest Impact Score (Carbon)</option>
                  <option value="landImpact">Highest Impact Score (Land)</option>
                  <option value="tempImpact">Highest Impact Score (Temperature)</option>
                  <option value="waterImpact">Highest Impact Score (Water)</option>
                  <option value="upcoming">Upcoming Events</option>
                  <option value="alphabetical-asc">Name (A-Z)</option>
                  <option value="alphabetical-desc">Name (Z-A)</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div v-if="sortOption === 'nearest'" class="location-permission mt-3 mt-md-0 d-flex align-items-center">
                <!-- Text Input Field for Location -->
                <i v-if="isLoadingLocation" class="fas fa-spinner fa-spin me-2"></i><input type="text"
                  class="form-control me-2" v-model="enteredLocation"
                  :placeholder="isLoadingLocation ? 'Getting location...' : 'Enter your location'" />
                <button @click="handleManualLocation" class="btn btn-outline-primary btn-sm">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>


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
                    <img src="/media/time_icon.png" alt="Time Icon" class="icon me-2">
                    <span>{{ formatFirestoreTime(opportunity.startTime) }} - {{ formatFirestoreTime(opportunity.endTime)
                      }}</span>
                  </li>
                  <li class="d-flex align-items-center mb-2">
                    <img src="/media/535239.png" alt="Location Icon" class="icon me-2">
                    <span>{{ formatLocation(opportunity.location) }}</span>
                  </li>
                  <li v-if="opportunity.distance != null" class="d-flex align-items-center mb-2">
                    <i class="fa fa-location-arrow fa-lg" style="font-size: 24px"></i>
                    <span class="px-2">{{ opportunity.distance }} km from me</span>
                  </li>
                  <div class="impact-scores">
                    <h5>Impact Scores:</h5>
                    <div v-for="(value, key) in opportunity.dash" :key="key" class="impact-row">
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
                </ul>
                <button @click.stop="handleSaveToLikes(opportunity)" class="btn btn-primary">
                  {{ opportunity.isLiked ? 'Unsave' : 'Save' }}
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
import { mapGetters } from 'vuex';

const googleMapsApiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;

export default {
  name: 'OpportunitiesPage',
  data() {
    return {
      myLocation: '',
      sortOption: '',
      keywords: '',
      startTime: '',
      endTime: '',
      commitment: '',
      locations: [],
      opportunities: [],
      isLoadingLocation: false,
      userLocation: null,
      enteredLocation: '',
      userLocationName: '',
      status: '',
      impacts: null,
      hours: Array.from({ length: 24 }, (_, i) => {
        const hour = String(i).padStart(2, '0');
        return `${hour}:00`;
      }),
    };
  },
  watch: {
    // Watch for changes in userLocationName to ensure placeholder updates properly
    userLocationName(newVal) {
      if (newVal && !this.enteredLocation) {
        this.enteredLocation = newVal; // Automatically set enteredLocation to userLocationName
      }
    },
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
  },
  async mounted() {
    try {
      // Fetch all opportunities when the page loads
      await this.searchOpp();
      await this.requestLocation(); // This will calculate distance for each opportunity
      // Check if the user is logged in and opportunities are loaded before checking likes
      if (this.isAuthenticated && this.opportunities.length > 0) {
        console.log(this.user)
        await this.checkLikedOpportunities();
      }
    } catch (error) {
      console.error('Error during mounted hook:', error);
    }
  },
  methods: {
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


        if (this.opportunities.length) {
          await this.checkLikedOpportunities();
        }
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
    },
    async checkLikedOpportunities() {
      if (!this.user || !this.user.uid) {
        console.warn("User is not logged in, skipping liked opportunities check.");
        return;
      }

      try {
        const userId = this.user.uid;
        console.log(`Checking liked opportunities for user ID: ${userId}`);

        for (let opportunity of this.opportunities) {
          try {
            const response = await axios.get(`http://localhost:8001/likes/${userId}/${opportunity.id}`);
            opportunity.isLiked = response.data.isLiked || false;
            console.log(`Opportunity ${opportunity.id} is liked: ${opportunity.isLiked}`);
          } catch (innerError) {
            console.error(`Error checking like status for opportunity ${opportunity.id}:`, innerError);
          }
        }
        if (this.status === 'saved') {
          this.opportunities = this.opportunities.filter(opportunity => opportunity.isLiked);
        } else if (this.status === 'unsaved') {
          this.opportunities = this.opportunities.filter(opportunity => !opportunity.isLiked);
        }
        console.log("Updated opportunities with liked status:", this.opportunities);
      } catch (error) {
        console.error('Error checking liked opportunities:', error);
      }
    },
    async handleSort() {
      if (this.sortOption === 'nearest') {
        // Only recalculate distances if a new location is manually entered
        if (this.enteredLocation) {
          await this.handleManualLocation(); // Uses the manually entered location and recalculates distances
        } else {
          // If no manual location is entered, use the pre-calculated distances to sort
          this.sortOpportunities(); // Sort using existing opportunity.distance values
        }
      } else {
        // Handle other sorting options
        this.sortOpportunities();
      }
    },

    async requestLocation() {
      console.log("Requesting user's location...");
      this.isLoadingLocation = true; // Set loading status to true
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        console.log(position);
        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(this.userLocation)

        // Calculate distance for each opportunity after fetching location
        if (this.userLocation) {
          // Get location coordinates for opportunities if they are missing lat/lng
          await Promise.all(this.opportunities.map(async (opportunity) => {
            if (!opportunity.lat || !opportunity.lng) {
              console.log(`Fetching coordinates for opportunity: ${opportunity.name}`);
              const coordinates = await this.getLocationCoordinates(this.formatLocation(opportunity.location));
              if (coordinates) {
                opportunity.lat = coordinates.lat;
                opportunity.lng = coordinates.lng;
                console.log(`Coordinates for ${opportunity.name}:`, coordinates);
              } else {
                console.warn(`Skipping distance calculation for ${opportunity.name} due to missing lat/lng.`);
                return;
              }
            }

            // Calculate distance for each opportunity and keep it persistently updated
            if (opportunity.lat && opportunity.lng) {
              opportunity.distance = this.calculateDistance(
                this.userLocation.lat,
                this.userLocation.lng,
                opportunity.lat,
                opportunity.lng
              );
              console.log(`Opportunity ${opportunity.name}: Distance calculated as ${opportunity.distance} km`);
            }
          }));
        }
      } catch (error) {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enable location services and try again.');
      } finally {
        this.isLoadingLocation = false; // Set loading status to false after location is fetched or on error
      }
    },

    async getUserLocationName(lat, lng) {
      try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: { latlng: `${lat},${lng}`, key: googleMapsApiKey },
        });

        if (response.data.status === 'OK' && response.data.results.length > 0) {
          this.userLocationName = response.data.results[0].formatted_address || 'Unknown location';
          console.log('User location name:', this.userLocationName);
        } else {
          console.error('Error getting user location name:', response.data.status);
        }
      } catch (error) {
        console.error('Error getting user location name:', error);
      }
    },


    async handleManualLocation() {
      if (this.enteredLocation) {
        try {
          const coordinates = await this.getLocationCoordinates(this.enteredLocation);
          if (coordinates) {
            console.log(coordinates)
            this.userLocation = coordinates;

            if (this.userLocation) {
              // Get location coordinates for opportunities if they are missing lat/lng
              await Promise.all(this.opportunities.map(async (opportunity) => {
                if (!opportunity.lat || !opportunity.lng) {
                  console.log(`Fetching coordinates for opportunity: ${opportunity.name}`);
                  const coordinates = await this.getLocationCoordinates(this.formatLocation(opportunity.location));
                  if (coordinates) {
                    opportunity.lat = coordinates.lat;
                    opportunity.lng = coordinates.lng;
                    console.log(`Coordinates for ${opportunity.name}:`, coordinates);
                  } else {
                    console.warn(`Skipping distance calculation for ${opportunity.name} due to missing lat/lng.`);
                    return;
                  }
                }

                // Calculate distance for each opportunity and keep it persistently updated
                if (opportunity.lat && opportunity.lng) {
                  opportunity.distance = this.calculateDistance(
                    this.userLocation.lat,
                    this.userLocation.lng,
                    opportunity.lat,
                    opportunity.lng
                  );
                  console.log(`Opportunity ${opportunity.name}: Distance calculated as ${opportunity.distance} km`);
                }
              }));

              // Sort the opportunities based on the newly calculated distances
              this.sortOpportunities();
            }
          } else {
            alert('Unable to determine the coordinates for the entered location. Please try again.');
          }
        } catch (error) {
          console.error('Error geocoding entered location:', error);
        }
      } else {
        alert('Please enter a valid location.');
      }
    },

    async getLocationCoordinates(address) {
      try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: address,
            key: googleMapsApiKey,
          },
        });

        if (response.data.status === 'OK') {
          return response.data.results[0].geometry.location;
        }
        return null;
      } catch (error) {
        console.error('Error geocoding address:', error);
        return null;
      }
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
        return; // Return null if any coordinate is missing
      }

      const R = 6371; // Radius of the Earth in km
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = (R * c).toFixed(2); // Distance in km

      return parseFloat(distance); // Return distance as a number
    },

    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    async sortOpportunities() {
      switch (this.sortOption) {
        case 'nearest':
          if (this.userLocation) {
            // Sort the opportunities array in place by distance from nearest to furthest
            this.opportunities.sort((a, b) => {
              // Ensure distances are not undefined
              if (a.distance == null && b.distance == null) {
                return 0; // Both are null, keep the same order
              } else if (a.distance == null) {
                return 1; // Place items with no distance at the end
              } else if (b.distance == null) {
                return -1; // Place items with a distance before those without
              } else {
                // Sort by distance if both distances are valid (nearest first)
                return a.distance - b.distance;
              }
            });

            // Log each opportunity to confirm distance values after sorting
            this.opportunities.forEach((opportunity, index) => {
              console.log(`Opportunity ${index + 1} - ${opportunity.name}: Distance after sorting = ${opportunity.distance} km`);
            });
          }
          break;

        case 'totalImpact':
          console.log("sorting by total impact")
          this.opportunities.sort((a, b) => {
            const totalImpactA = Object.values(a.dash).reduce((sum, value) => sum + value, 0);
            const totalImpactB = Object.values(b.dash).reduce((sum, value) => sum + value, 0);

            return totalImpactB - totalImpactA; // Sort by total impact from highest to lowest
          });
          this.opportunities.forEach((opportunity, index) => {
            const totalImpact = Object.values(opportunity.dash).reduce((sum, value) => sum + value, 0);
            console.log(`Opportunity ${index + 1} - ${opportunity.name}: Total Impact = ${totalImpact}`);
          });
          break;

        case 'carbonImpact':
          this.opportunities.sort((a, b) => {
            const carbonOffsetA = a.dash["Carbon Offset"] ?? 0; // Use 0 if value is undefined or missing
            const carbonOffsetB = b.dash["Carbon Offset"] ?? 0; // Use 0 if value is undefined or missing

            return carbonOffsetB - carbonOffsetA; // Sort by Carbon Offset from highest to lowest
          });
          this.opportunities.forEach((opportunity, index) => {
            console.log(`Opportunity ${index + 1} - ${opportunity.name}: Carbon Offset = ${opportunity.dash["Carbon Offset"]}`);
          });
          break;

        case 'tempImpact':
          this.opportunities.sort((a, b) => {
            const tempOffsetA = a.dash["Temperature Moderated"] ?? 0; // Use 0 if value is undefined or missing
            const tempOffsetB = b.dash["Temperature Moderated"] ?? 0; // Use 0 if value is undefined or missing

            return tempOffsetB - tempOffsetA; // Sort by Carbon Offset from highest to lowest
          });
          this.opportunities.forEach((opportunity, index) => {
            console.log(`Opportunity ${index + 1} - ${opportunity.name}: Temperature Moderated = ${opportunity.dash["Temperature Moderated"]}`);
          });
          break;

        case 'landImpact':
          this.opportunities.sort((a, b) => {
            const landOffsetA = a.dash["Land Reforested"] ?? 0; // Use 0 if value is undefined or missing
            const landOffsetB = b.dash["Land Reforested"] ?? 0; // Use 0 if value is undefined or missing

            return landOffsetB - landOffsetA; // Sort by Carbon Offset from highest to lowest
          });
          this.opportunities.forEach((opportunity, index) => {
            console.log(`Opportunity ${index + 1} - ${opportunity.name}: Land Reforested = ${opportunity.dash["Land Reforested"]}`);
          });
          break;

        case 'waterImpact':
          this.opportunities.sort((a, b) => {
            const waterOffsetA = a.dash["Water Conserved"] ?? 0; // Use 0 if value is undefined or missing
            const waterOffsetB = b.dash["Water Conserved"] ?? 0; // Use 0 if value is undefined or missing

            return waterOffsetB - waterOffsetA; // Sort by Carbon Offset from highest to lowest
          });
          this.opportunities.forEach((opportunity, index) => {
            console.log(`Opportunity ${index + 1} - ${opportunity.name}: Water Conserved = ${opportunity.dash["Water Conserved"]}`);
          });
          break;

        case 'upcoming':
          // Sort opportunities by start time in ascending order
          this.opportunities.sort((a, b) => {
            const timeA = a.startTime && a.startTime._seconds ? a.startTime._seconds : Number.MAX_SAFE_INTEGER;
            const timeB = b.startTime && b.startTime._seconds ? b.startTime._seconds : Number.MAX_SAFE_INTEGER;
            return timeA - timeB;
          });
          break;

        case 'alphabetical-asc':
          // Sort opportunities alphabetically in ascending order
          this.opportunities.sort((a, b) => a.name.localeCompare(b.name));
          break;

        case 'alphabetical-desc':
          // Sort opportunities alphabetically in descending order
          this.opportunities.sort((a, b) => b.name.localeCompare(a.name));
          break;

        default:
          console.warn('Unknown sort option:', this.sortOption);
          break;
      }
    },

    goToOpportunityDetails(opportunityId) {
      this.$router.push({ name: 'OpportunitiesDetailsPage', params: { opportunityId } });
    },
    async handleSaveToLikes(opportunity) {
      try {
        // Check if user is logged in
        if (!this.isAuthenticated) {
          // Redirect to login page if not logged in
          this.$router.push('/auth');
        } else {
          const userId = this.user.uid;

          if (opportunity.isLiked) {
            // If already liked, remove from likes
            await axios.delete(`http://localhost:8001/likes/${userId}/${opportunity.id}`);
            opportunity.isLiked = false;
            alert('Opportunity unsaved!');
          } else {
            // If not liked, save to likes
            await axios.post('http://localhost:8001/likes', {
              userId: userId,
              opportunityId: opportunity.id,
            });
            opportunity.isLiked = true;
            alert('Opportunity saved!');
          }
        }
      } catch (error) {
        console.error('Error saving/removing opportunity to/from likes:', error);
      }
    },
    formatImpact(dash) {
      return Object.entries(dash).map(([key, value]) => {
        return `${key}: ${value}`;
      });
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
.opportunities-page {
  background-color: black;
  color: white;
}

/* Retain existing animations and custom styles */
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

@keyframes fadeInOpacity {
  to {
    opacity: 1;
  }
}

/* Custom styling on top of Bootstrap */
.filter-panel {
  background-color: black;
  border-right: 1px solid grey;
  min-height: 100vh;
  color: white;
}

.sticky-top {
  max-height: 100vh;
  overflow-y: auto;
}

.heading {
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.paragraph {
  color: white;
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

.btn {
  background-color: black;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: green;
  transform: scale(1.02);
}

.btn-outline-primary {
  background-color: white;
  border: 2px solid black;
  color: black;

}

.btn-outline-primary:hover {
  background-color: green;
  color: white;
}

.impact-scores {
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}

.impact-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.impact-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.impact-label {
  min-width: 70px;
  text-transform: capitalize;
  color: #666;
}

.impact-indicators {
  display: flex;
  gap: 0.5rem;
}

.impact-icon {
  font-size: 1.2rem;
  transition: all 0.3s ease;
  opacity: 0.3;
  transform: scale(0.9);
}

.impact-icon.active {
  opacity: 1;
  transform: scale(1);
}

/* Color schemes for different impact types */
.fa-thermometer-full.active {
  color: #ff4444;
}

.fa-tint.active {
  color: #2196f3;
}

.fa-leaf.active {
  color: #4caf50;
}

.fa-mountain.active {
  color: #795548;
}

/* Hover animations */
.card:hover .impact-icon {
  animation: bounce 0.5s ease;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}

/* Add slight delay to each icon's animation */
.impact-icon:nth-child(1) {
  animation-delay: 0s;
}

.impact-icon:nth-child(2) {
  animation-delay: 0.1s;
}

.impact-icon:nth-child(3) {
  animation-delay: 0.2s;
}

.impact-icon:nth-child(4) {
  animation-delay: 0.3s;
}

.impact-icon:nth-child(5) {
  animation-delay: 0.4s;
}

impact-scores {
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}

.impact-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.impact-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.impact-label {
  min-width: 70px;
  text-transform: capitalize;
  color: #666;
}

.impact-indicators {
  display: flex;
  gap: 0.5rem;
}

.impact-icon {
  font-size: 1.2rem;
  transition: all 0.3s ease;
  opacity: 0.3;
  transform: scale(0.9);
}

.impact-icon.active {
  opacity: 1;
  transform: scale(1);
}

/* Color schemes for different impact types */
.fa-thermometer-full.active {
  color: #ff4444;
}

.fa-tint.active {
  color: #2196f3;
}

.fa-leaf.active {
  color: #4caf50;
}

.fa-mountain.active {
  color: #795548;
}

/* Hover animations */
.card:hover .impact-icon {
  animation: bounce 0.5s ease;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}

/* Add slight delay to each icon's animation */
.impact-icon:nth-child(1) {
  animation-delay: 0s;
}

.impact-icon:nth-child(2) {
  animation-delay: 0.1s;
}

.impact-icon:nth-child(3) {
  animation-delay: 0.2s;
}

.impact-icon:nth-child(4) {
  animation-delay: 0.3s;
}

.impact-icon:nth-child(5) {
  animation-delay: 0.4s;
}
</style>
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