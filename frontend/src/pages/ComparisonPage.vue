<template>
    <div class="container">
        <section id="selection-header">
            <h1>{{ headerText }}</h1>
        </section>

        <section id="volunteer-cards" class="cards-grid" v-show="showCardsSection">
            <div class="volunteer-card" v-for="(volunteer, index) in volunteerCards" :key="index"
                :data-id="volunteer.id" @click="selectCard(volunteer)"
                :class="{ selected: selectedCards.includes(volunteer) }">
                <img :src="volunteer.image" />
                <h3>{{ volunteer.name }}</h3>
                <p>Date: {{ formatFirestoreDate(volunteer.startTime) }}</p>
                <p>Time: {{ formatFirestoreTime(volunteer.startTime) }} - {{ formatFirestoreTime(volunteer.endTime) }}
                    ({{ eventDuration(volunteer.startTime, volunteer.endTime) }})
                </p>
                <p>Location: {{ formatLocation(volunteer.location) }}</p>
                <p>Roles: {{ formatRoles(volunteer.roles) }}</p>
            </div>
        </section>

        <section id="comparison-table" v-show="showComparisonTable" :class="{ visible: showComparisonTable }">
            <table>
                <thead>
                    <tr>
                        <th class="criteria-column">Criteria</th>
                        <th>Volunteer Work 1</th>
                        <th>Volunteer Work 2</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Title Row -->
                    <tr>
                        <td>Name</td>
                        <td>{{ selectedCards[0]?.name || '-' }}</td>
                        <td>{{ selectedCards[1]?.name || '-' }}</td>
                    </tr>
                    <!-- Date Row -->
                    <tr>
                        <td>Date</td>
                        <td>{{ formatFirestoreDate(selectedCards[0]?.startTime) || '-' }}</td>
                        <td>{{ formatFirestoreDate(selectedCards[1]?.startTime) || '-' }}</td>
                    </tr>
                    <!-- Duration Row -->
                    <tr>
                        <td>Duration</td>
                        <td>{{ eventDuration(selectedCards[0]?.startTime, selectedCards[0]?.endTime) || '-' }}</td>
                        <td>{{ eventDuration(selectedCards[1]?.startTime, selectedCards[1]?.endTime) || '-' }}</td>
                    </tr>
                    <!-- Roles Row -->
                    <tr>
                        <td>Roles</td>
                        <td>{{ formatRoles(selectedCards[0]?.roles) || '-' }}</td>
                        <td>{{ formatRoles(selectedCards[1]?.roles) || '-' }}</td>
                    </tr>
                    <!-- Location Row -->
                    <tr>
                        <td>Location</td>
                        <td>{{ formatLocation(selectedCards[0]?.location) || '-' }}</td>
                        <td>{{ formatLocation(selectedCards[1]?.location) || '-' }}</td>
                    </tr>
                    <!-- Distance From Me Row -->
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">Distance From Me <i v-if="isLoadingLocation"
                                    class="fas fa-spinner fa-spin me-2"></i><input type="text"
                                    class="form-control me-2 location-input" v-model="enteredLocation"
                                    :placeholder="computedPlaceholder" />
                                <button @click="handleManualLocation" class="btn btn-outline-primary btn-sm">
                                    Go
                                </button>
                            </div>
                        </td>
                        <td>{{ distanceToCard1 || '-' }}</td>
                        <td>{{ distanceToCard2 || '-' }}</td>
                    </tr>
                </tbody>
            </table>
            <button @click="resetComparison" class="reset-btn text-center">Reset Comparison</button>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
const googleMapsApiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;

export default {
    data() {
        return {
            headerText: 'Select 2 of your saved volunteer opportunities to compare',
            volunteerCards: [],
            showCardsSection: true,
            showComparisonTable: false,
            enteredLocation: '',
            userLocation: null,
            isLoadingLocation: false,
            distanceToCard1: '-',
            distanceToCard2: '-',
            computedPlaceholder: 'Enter location',
            selectedCards: [],
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'user']),
    },
    watch: {
        // Watch for changes in showComparisonTable and trigger location retrieval
        showComparisonTable(newValue) {
            if (newValue) {
                this.getUserLocation();
            }
        },
    },
    async created() {
        if (this.isAuthenticated && this.user) {
            try {
                const userId = this.user.uid; // Make sure getUser is not null
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
        async getUserLocation() {
            this.isLoadingLocation = true;
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                this.userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Update the placeholder with the user's readable location
                await this.getUserLocationName(this.userLocation.lat, this.userLocation.lng);
                this.computedPlaceholder = this.userLocationName || 'Enter location';
                this.enteredLocation = this.computedPlaceholder;
            } catch (error) {
                console.error('Error getting location:', error);
                alert('Unable to get your location. Please enable location services and try again.');
            } finally {
                this.isLoadingLocation = false;
            }
        },
        async getUserLocationName(lat, lng) {
            try {
                const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        latlng: `${lat},${lng}`,
                        key: googleMapsApiKey,
                    },
                });

                if (response.data.status === 'OK' && response.data.results.length > 0) {
                    let readableAddress = '';
                    for (let result of response.data.results) {
                        // Look for street_address or route type results for more meaningful addresses
                        if (result.types.includes('street_address') || result.types.includes('route')) {
                            readableAddress = result.formatted_address;
                            break;
                        }
                    }

                    // If no specific address type is found, fallback to the first result
                    if (!readableAddress) {
                        readableAddress = response.data.results[0].formatted_address;
                    }

                    // Set the more readable address as the user's location name
                    this.userLocationName = readableAddress;

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
                        this.userLocation = coordinates;
                        this.calculateDistances();
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
        async calculateDistances() {
            if (this.userLocation && this.selectedCards.length > 0) {
                try {
                    // Get coordinates for Card 1 if available
                    if (this.selectedCards[0]?.location) {
                        const card1Coordinates = await this.getLocationCoordinates(this.formatLocationName(this.selectedCards[0].location));
                        if (card1Coordinates) {
                            this.distanceToCard1 = this.calculateDistance(
                                this.userLocation.lat,
                                this.userLocation.lng,
                                card1Coordinates.lat,
                                card1Coordinates.lng
                            );
                        } else {
                            this.distanceToCard1 = '-';
                        }
                    }

                    // Get coordinates for Card 2 if available
                    if (this.selectedCards[1]?.location) {
                        const card2Coordinates = await this.getLocationCoordinates(this.formatLocationName(this.selectedCards[1].location));
                        if (card2Coordinates) {
                            this.distanceToCard2 = this.calculateDistance(
                                this.userLocation.lat,
                                this.userLocation.lng,
                                card2Coordinates.lat,
                                card2Coordinates.lng
                            );
                        } else {
                            this.distanceToCard2 = '-';
                        }
                    }
                } catch (error) {
                    console.error('Error calculating distances:', error);
                }
            }
        },

        calculateDistance(lat1, lon1, lat2, lon2) {
            if (!lat1 || !lat2 || !lon1 || !lon2) {
                return '-';
            }
            const R = 6371; // Radius of the Earth in km
            const dLat = this.deg2rad(lat2 - lat1);
            const dLon = this.deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return (R * c).toFixed(2) + ' km';
        },
        deg2rad(deg) {
            return deg * (Math.PI / 180);
        },

        eventDuration(startTime, endTime) {
            if (!startTime || !endTime) {
                return '-'; // Return '-' if either time is not available
            }

            // Extract seconds from Firebase Admin timestamp
            const startSeconds = startTime._seconds;
            const endSeconds = endTime._seconds;

            if (!startSeconds || !endSeconds) {
                return '-';
            }

            // Calculate duration in seconds
            const durationInSeconds = endSeconds - startSeconds;

            if (durationInSeconds <= 0) {
                return '-'; // Return '-' if end time is before start time
            }

            // Convert duration into hours and minutes
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);

            // Format the duration as hours and minutes
            let durationStr = '';
            if (hours > 0) {
                durationStr += `${hours}h`;
            }
            if (minutes > 0) {
                if (hours > 0) {
                    durationStr += ' ';
                }
                durationStr += `${minutes}min`;
            }

            return durationStr;
        },
        selectCard(card) {
            if (this.selectedCards.length < 2 && !this.selectedCards.includes(card)) {
                this.selectedCards.push(card);
                this.updateHeader();
                if (this.selectedCards.length === 2) {
                    this.updateComparisonTable();
                }
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
            const formattedLocations = Object.entries(locationMap).map(([key, value]) => {
                // Capitalize the first letter of the key
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                return `${value} (${capitalizedKey})`;
            });

            // Join all the formatted key-value pairs into a single string, separated by commas
            return formattedLocations.join(', ');
        },
        formatLocationName(locationMap) {
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
        updateHeader() {
            if (this.selectedCards.length === 0) {
                this.headerText = 'Please select 2 of your saved volunteer work';
            } else if (this.selectedCards.length === 1) {
                this.headerText = 'Please select one more';
            } else {
                this.headerText = 'Here are the comparisons between the two:';
            }
        },
        updateComparisonTable() {
            if (this.selectedCards.length === 2) {
                this.showCardsSection = false;
                this.showComparisonTable = true;
            }
        },
        resetComparison() {
            this.selectedCards = [];
            this.showComparisonTable = false;
            this.showCardsSection = true;
            this.updateHeader();
        },
    },
};
</script>


<style scoped>

.html, .body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: black;
    color: #ccc;
    height: 100%;
    min-height: 100vh
    /* Changed from #333 to make the text more readable on a dark background */
}

.container {
    max-width: 100%;
    max-height: 100vw;
    margin: 0 auto;
    padding: 2rem;
    background-color: #000000
}

#selection-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    border-radius: 10px;
    background: linear-gradient(145deg, #161616, #1a1a1a);
    /* Inverted colors */
    box-shadow: 0 2px 15px rgba(255, 255, 255, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#selection-header:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}

#selection-header h1 {
    color: #f0f0f0;
    /* Inverted color for text */
    font-size: 2rem;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
}

#selection-header h1::after {
    content: '';
    position: absolute;
    width: 0;
    height: 3px;
    bottom: -5px;
    left: 50%;
    background: green;
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

#selection-header:hover h1 {
    color: green;
    transform: scale(1.02);
}

#selection-header:hover h1::after {
    width: 100%;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
}

.volunteer-card {
    background: white;
    /* Dark background for the card */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
    padding: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    color: black;
}

.volunteer-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 5px 5px 20px #a4a3a3
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
    color: black;
    /* Light text color */
    margin: 0.5rem 0;
}

.volunteer-card p {
    margin: 0.3rem 0;
    color: black;
    /* Lighter text color */
}

.criteria-column {
    width: 30%;
    /* Adjust this value to control the size of the first column */
}

#comparison-table {
    margin-top: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    width: 80%; /* Set the desired width of the table */
    margin: 2rem auto;
}

#comparison-table.visible {
    opacity: 1;
    transform: translateY(0);
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    background-color: #1a1a1a;
    /* Dark background for the table */
    box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    overflow: hidden;
}

th,
td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #444;
    /* Lighter border */
    color: white
}

th {
    background-color: #006400;
    /* Dark green color for headers */
    color: white;
}

tr:hover {
    background-color: #333;
    /* Darker color on hover */
}

.hidden {
    display: none;
}

.button {
    background-color: #3898ec;
    color: #fff;
    text-align: center;
    padding: 10px 15px;
    border: 0;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 700;
    margin: 20px;
    transition: background-color 0.3s, transform 0.3s;
    display: block;
    cursor: pointer;
}

.btn-outline-primary {
    padding: 0.5rem 1.25rem;
    font-weight: 500;
    border-radius: 2rem;
    transition: all 0.3s ease;
    background-color: white;
    border: none;
    color: black;
}
.btn-outline-primary:hover {
    background-color: green;
}
.reset-btn {
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    border-radius: 2rem;
    transition: all 0.3s ease;
    background-color: white;
    /* Changed from black */
    border: none;
    color: black;
    /* Changed from white */
    position: absolute;
    margin-top: 2rem;
    left: 50%;
    transform: translateX(-50%);
}

.reset-btn:hover {
    background-color: green;
    color: white;
    /* Update hover text color for contrast */
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.02);
    }

    100% {
        transform: scale(1);
    }
}
</style>
