<template>
    <div class="opportunity-details-page fade-up">
        <div v-if="opportunity" class="container py-5">
            <div class="d-flex justify-content-between align-items-center mb-5">

                <h1 class="opportunity-title display-4 mb-0">{{ opportunity.name }}</h1>


                <div class="action-buttons">
                    <button @click.stop="handleSaveToLikes()" class="btn btn-primary">
                        {{ opportunity.isLiked ? 'Unsave' : 'Save' }}
                    </button>
                </div>


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
                            <button @click="learnMore" class="btn btn-outline-primary">
                                Learn More
                            </button>
                        </div>

                    </div>
                </div>

                <div class="details-section mt-5">
                    <h2 class="section-title-2 text-start mb-4">Event Details</h2>
                    <div class="row g-4">
                        <div class="col-md-6">
                            <div class="detail-card">
                                <div class="detail-item">
                                    <span class="detail-label">Organisation</span>
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
                                    <span class="detail-label">Available Roles</span>
                                    <span class="detail-value">
                                        <ul>
                                            <li v-for="(role, index) in formatRoles(opportunity.roles)" :key="index">{{
                                                role }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Impact Level</span>
                                    <span class="detail-value">
                                        <ul>
                                            <li v-for="(impact, index) in formatImpact(this.opportunity.dash)" :key="index">{{ impact }} / 5</li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Location Section with Map -->
                <div class="location-section mt-4">
                    <div class="location-container">
                        <div class="row g-4">
                            <div class="col-md-4">
                                <div class="location-details detail-card">
                                    <span class="detail-label">Address</span>
                                    <p class="location-address">{{ formatLocation(opportunity.location) }}</p>
                                    <button @click="openInGoogleMaps" class="btn btn-outline-primary mt-3">
                                        <i class="fas fa-directions me-2"></i>
                                        Get Directions
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div id="map" class="map-container"></div>
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
/* global google */
import axios from 'axios';
import { mapGetters } from 'vuex';
const googleMapsApiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
export default {
    name: 'OpportunityDetails',
    props: ['opportunityId'],
    data() {
        return {
            opportunity: null,
            isLiked: false,
            map: null,
            marker: null,
        };
    },
    computed: {
        ...mapGetters(['user', 'isAuthenticated']),
    },
    async created() {
        try {
            const response = await axios.get(`http://localhost:8001/opportunities/${this.opportunityId}`);
            this.opportunity = response.data;

            // Check if the opportunity is already liked

            if (this.isAuthenticated) {
                console.log("i am authenticated as" ,this.user.displayName)
                await this.checkLikedStatus();
            }
            else {
                console.log("i am not authenticataed")
            }
            if (this.opportunity.location) {
                const locationString = this.formatLocation(this.opportunity.location);
                if (typeof google !== 'undefined') {
                    this.geocodeLocationAndInitMap(locationString);
                } else {
                    const script = document.createElement('script');
                    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
                    script.async = true;
                    script.defer = true;
                    document.head.appendChild(script);

                    window.initMap = () => {
                        if (this.opportunity.location) {
                            this.geocodeLocationAndInitMap(this.formatLocation(this.opportunity.location));
                        }
                    };
                }
            }
            
        } catch (error) {
            console.error('Error fetching opportunity details:', error);
        }
    },
    methods: {
        async checkLikedStatus() {
            console.log("poop")
            try {
                const userId = this.user ? this.user.uid : null;

                if (!userId) {
                    console.log("User is not logged in, skipping liked opportunities check.");
                    return;
                }
                // Replace with your actual API endpoint
                const response = await axios.get(`http://localhost:8001/likes/${userId}/${this.opportunityId}`);
                console.log("user liked this")
                this.opportunity.isLiked = response.data.isLiked
            } catch (error) {
                console.error('Error checking liked status:', error);
            }
        },
        async handleSaveToLikes() {
            try {
                console.log("Is user logged in:", this.isAuthenticated);
                // Check if user is logged in
                if (!this.isAuthenticated) {
                    // Redirect to login page if not logged in
                    this.$router.push('/auth');
                } else {
                    const userId = this.user.uid;

                    if (this.opportunity.isLiked) {
                        // If already liked, remove from likes
                        await axios.delete(`http://localhost:8001/likes/${userId}/${this.opportunityId}`);
                        this.opportunity.isLiked = false;
                        alert('Opportunity removed from likes!');
                    } else {
                        // If not liked, save to likes
                        await axios.post('http://localhost:8001/likes', {
                            userId: userId,
                            opportunityId: this.opportunityId,
                        });
                        this.opportunity.isLiked = true;
                        alert('Opportunity saved to likes!');
                    }
                }
            } catch (error) {
                console.error('Error saving/removing opportunity to/from likes:', error);
            }
        },
        learnMore() {
            // Open modal or navigate to detailed info page
            window.open(this.opportunity.link, '_blank');
        },
        openInGoogleMaps() {
            const address = encodeURIComponent(this.formatLocation(this.opportunity.location));
            window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
        },
        async geocodeLocationAndInitMap(location) {
            try {
                const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: location,
                        key: googleMapsApiKey,
                    },
                });

                if (response.data.status === 'OK') {
                    const { lat, lng } = response.data.results[0].geometry.location;
                    this.initMap(lat, lng);
                }
            } catch (error) {
                console.error('Error geocoding location:', error);
            }
        },
        initMap(lat, lng) {
            const mapOptions = {
                center: { lat, lng },
                zoom: 17,
                styles: [
                    {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [{ visibility: "off" }]
                    }
                ],
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
            };

            this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            this.marker = new google.maps.Marker({
                position: { lat, lng },
                map: this.map,
                title: this.formatLocation(this.opportunity.location),
                animation: google.maps.Animation.DROP
            });

            // Add info window
            const infoWindow = new google.maps.InfoWindow({
                content: `<div class="info-window">
                    <h3 class="info-window-title">${this.opportunity.name}</h3>
                    <p class="info-window-address">${this.formatLocation(this.opportunity.location)}</p>
                </div>`
            });

            this.marker.addListener('click', () => {
                infoWindow.open(this.map, this.marker);
            });
        },
        formatImpact(dash) {
            return Object.entries(dash).map(([key, value]) => {
                return `${key}: ${value}`;
            });
        },
        formatFirestoreTime(timestamp) {
            if (!timestamp || !timestamp._seconds) return '-';
            const milliseconds = timestamp._seconds * 1000;
            const date = new Date(milliseconds);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        formatFirestoreDate(timestamp) {
            if (!timestamp || (!timestamp.seconds && !timestamp._seconds)) return '-';
            const seconds = timestamp.seconds || timestamp._seconds;
            const milliseconds = seconds * 1000;
            const date = new Date(milliseconds);
            const monthNames = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            const day = date.getDate();
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        },
        formatLocation(locationMap) {
            if (!locationMap || typeof locationMap !== 'object') return '-';
            const locations = Object.values(locationMap);
            return locations.join(', ');
        },
        formatRoles(rolesMap) {
            if (!rolesMap || typeof rolesMap !== 'object') return [];
            return Object.entries(rolesMap).map(([key, value]) => {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                return `${capitalizedKey} (${value})`;
            });
        }
    }
}

</script>

<style scoped>
.opportunity-details-page {
    background-color: black;
    min-height: 100vh;
    padding: 2rem 0;
    color: black;
}

.opportunity-title {
    font-size: 2.75rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    letter-spacing: -0.5px;
}

.action-buttons {
    display: flex;
    gap: 1rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    border-radius: 2rem;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: white;
    border: none;
    color: black;
}

.btn-primary:hover {
    background-color: green;
}

.btn-outline-primary {
    border: 2px solid black;
    color: black;
}

.btn-outline-primary:hover {
    background-color: green;
    color: black;
}

.btn-outline-primary.liked {
    background-color: black;
    color: black;
}

/* .btn-primary {
  background-color: black;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: green;
  transform: scale(1.02);
} */

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
    color: black;
    margin-bottom: 1.5rem;
    letter-spacing: -0.3px;
}


.section-title-2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
    letter-spacing: -0.3px;
}

.image-container {
    border-radius: 8px;
    border: 2px solid white;
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

.location-section {
    margin-top: 3rem;
}

.location-container {
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
}

.location-details {
    height: 100%;
}

.location-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.location-address {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333333;
    margin-bottom: 1.5rem;
}

.map-container {
    width: 100%;
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-window {
    padding: 0.5rem;
}

.info-window-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.info-window-address {
    font-size: 0.9rem;
    color: #666666;
    margin: 0;
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
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
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

    .action-buttons {
        flex-direction: column;
    }

    .btn {
        width: 100%;
        margin-bottom: 0.5rem;
    }

    .map-container {
        height: 300px;
    }
}
</style>