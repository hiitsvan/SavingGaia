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
            <h2>Here are the comparisons between the two:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Criteria</th>
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
                    <!-- Location Row -->
                    <tr>
                        <td>Location</td>
                        <td>{{ formatLocation(selectedCards[0]?.location) || '-' }}</td>
                        <td>{{ formatLocation(selectedCards[1]?.location) || '-' }}</td>
                    </tr>
                    <!-- Roles Row -->
                    <tr>
                        <td>Roles</td>
                        <td>{{ formatRoles(selectedCards[0]?.roles) || '-' }}</td>
                        <td>{{ formatRoles(selectedCards[1]?.roles) || '-' }}</td>
                    </tr>
                </tbody>
            </table>
            <button @click="resetComparison" class="reset-btn">Reset Comparison</button>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            headerText: 'Select 2 of your saved volunteer opportunities to compare',
            volunteerCards: [], // This will be populated by the backend data
            selectedCards: [],
            comparisonFields: [
                { label: 'Date', key: 'date' },
                { label: 'Duration', key: 'duration' },
                { label: 'Event Type', key: 'eventType' },
                { label: 'Location', key: 'location' },
                { label: 'Distance', key: 'distance' },
            ],
            showCardsSection: true,
            showComparisonTable: false,
        };
    },
    computed: {
        ...mapGetters(['isLoggedIn', 'getUser']), // Get user data and logged-in status from Vuex
    },
    async created() {
        if (this.isLoggedIn) {
            try {
                const userId = this.getUser.uid; // Get the logged-in user's ID
                const response = await axios.get(`http://localhost:8001/likes/${userId}`); // Make an API request to fetch saved likes
                console.log(response.data)
                this.volunteerCards = response.data; // Populate volunteerCards with data from the backend
            } catch (error) {
                console.error("Error fetching saved likes:", error);
            }
        }
    },
    methods: {
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
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: white;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

#selection-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    border-radius: 10px;
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#selection-header:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

#selection-header h1 {
    color: #2c3e50;
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
    background: #3498db;
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

#selection-header:hover h1 {
    color: #3498db;
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
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.volunteer-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.volunteer-card.selected {
    border: 3px solid #3498db;
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
    color: #2c3e50;
    margin: 0.5rem 0;
}

.volunteer-card p {
    margin: 0.3rem 0;
    color: #666;
}

#comparison-table {
    margin-top: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
}

#comparison-table.visible {
    opacity: 1;
    transform: translateY(0);
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    background: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
}

th,
td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
}

th {
    background-color:#3898ec;
    color: white;
}

tr:hover {
    background-color: #f5f6fa;
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
.reset-btn {
    display: block;
    margin: 2rem auto;
    padding: 0.8rem 1.5rem;
    background-color: #3898ec;
    border-radius: 25px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}


.reset-btn:hover {
    background-color: #c0392b;
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