<template>
    <div class="dashboard-container">
        <h1 class="dashboard-title">Your Volunteer Impact Dashboard</h1>
        
        <!-- Loading and Error States -->
        <div v-if="loading" class="status-message loading">
            Loading your impact data...
        </div>
        <div v-else-if="error" class="status-message error">
            {{ error }}
            <div v-if="errorDetails" class="error-details">
                {{ errorDetails }}
            </div>
        </div>
        <div v-else>
            <!-- Summary Cards -->
            <div class="summary-cards">
                <div class="summary-card">
                    <h3>Total Hours</h3>
                    <p class="number">{{ totalHours }}</p>
                    <p class="label">Hours Contributed</p>
                </div>
                <div class="summary-card">
                    <h3>Activities</h3>
                    <p class="number">{{ completedWorks.length }}</p>
                    <p class="label">Completed Works</p>
                </div>
                <div class="summary-card">
                    <h3>Total Impact</h3>
                    <p class="number">{{ totalImpactScore }}</p>
                    <p class="label">Impact Score</p>
                </div>
            </div>

            <!-- Impact Breakdown -->
            <div class="impact-breakdown">
                <h2>Environmental Impact Breakdown</h2>
                <div class="impact-metrics">
                    <div class="impact-metric">
                        <i class="fa fa-leaf"></i>
                        <h4>Carbon Offset</h4>
                        <p>{{ getTotalForMetric('Carbon Offset') }}</p>
                    </div>
                    <div class="impact-metric">
                        <i class="fa fa-tint"></i>
                        <h4>Water Conserved</h4>
                        <p>{{ getTotalForMetric('Water Conserved') }}</p>
                    </div>
                    <div class="impact-metric">
                        <i class="fa fa-thermometer-full"></i>
                        <h4>Temperature Impact</h4>
                        <p>{{ getTotalForMetric('Temperature Moderated') }}</p>
                    </div>
                    <div class="impact-metric">
                        <i class="fa fa-mountain"></i>
                        <h4>Land Reforested</h4>
                        <p>{{ getTotalForMetric('Land Reforested') }}</p>
                    </div>
                </div>
            </div>

            <!-- Recent Activities -->
            <div class="recent-activities" v-if="completedWorks.length > 0">
                <h2>Recent Completed Activities</h2>
                <div class="activities-list">
                    <div v-for="work in sortedCompletedWorks" :key="work.id" class="activity-card">
                        <img :src="work.image" :alt="work.name" />
                        <div class="activity-details">
                            <h3>{{ work.name }}</h3>
                            <p>Completed on: {{ formatDate(work.completionDate) }}</p>
                            <p>Duration: {{ eventDuration(work.startTime, work.endTime) }}</p>
                            <div class="impact-tags">
                                <span v-for="(value, key) in work.dash" :key="key" class="impact-tag">
                                    {{ key }}: {{ value }}
                                </span>
                            </div>
                            <button @click="markAsIncomplete(work)" class="incomplete-btn">
                                Mark as Incomplete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="no-activities">
                <p>No completed activities yet. Start volunteering to see your impact!</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    name: 'DashboardPage',
    data() {
        return {
            completedWorks: [],
            loading: true,
            error: null,
            errorDetails: null
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'user']),
        
        totalHours() {
            return this.completedWorks.reduce((total, work) => {
                const duration = this.calculateDurationInHours(work.startTime, work.endTime);
                return total + (isNaN(duration) ? 0 : duration);
            }, 0).toFixed(1);
        },

        totalImpactScore() {
            return this.completedWorks.reduce((total, work) => {
                if (!work.dash) return total;
                return total + Object.values(work.dash).reduce((sum, value) => sum + (Number(value) || 0), 0);
            }, 0);
        },

        sortedCompletedWorks() {
            return [...this.completedWorks].sort((a, b) => {
                const dateA = new Date(a.completionDate || 0);
                const dateB = new Date(b.completionDate || 0);
                return dateB - dateA;
            });
        }
    },
    async created() {
        if (!this.isAuthenticated || !this.user) {
            this.error = "Please log in to view your dashboard";
            this.loading = false;
            return;
        }

        try {
            this.loading = true;
            const response = await axios.get(`http://localhost:8001/completed-works/${this.user.uid}`);
            this.completedWorks = response.data || [];
            this.error = null;
            this.errorDetails = null;
        } catch (error) {
            console.error("Error fetching completed works:", error);
            this.error = " You Have No Completed Works Yet";
            if (error.response?.data?.error) {
                this.errorDetails = error.response.data.error;
            }
        } finally {
            this.loading = false;
        }
    },
    methods: {
        async markAsIncomplete(work) {
            try {
                // First, delete from completed works
                await axios.delete(`http://localhost:8001/completed-works/${this.user.uid}/${work.id}`)
                // Then, add back to likes
                await axios.post('http://localhost:8001/likes', {
                    userId: this.user.uid,
                    opportunityId: work.id,
                    opportunity: {
                        id: work.id,
                        name: work.name,
                        image: work.image,
                        organisation: work.organisation || '',
                        location: work.location || {},
                        roles: work.roles || {},
                        desc: work.desc || '',
                        tags: work.tags || [],
                        dash: work.dash || {},
                        startTime: work.startTime,
                        endTime: work.endTime
                    }
                });
                
                // Remove from local state
                this.completedWorks = this.completedWorks.filter(w => w.id !== work.id);
            } catch (error) {
                console.error('Error marking work as incomplete:', error);
                alert('Failed to mark work as incomplete. Please try again.');
            }
        },

        getTotalForMetric(metricName) {
            return this.completedWorks.reduce((total, work) => {
                if (!work.dash) return total;
                return total + (Number(work.dash[metricName]) || 0);
            }, 0);
        },

        calculateDurationInHours(startTime, endTime) {
            if (!startTime?._seconds || !endTime?._seconds) return 0;
            const durationInSeconds = endTime._seconds - startTime._seconds;
            return Math.max(0, durationInSeconds / 3600);
        },

        formatDate(dateString) {
            if (!dateString) return 'Unknown date';
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            } catch (error) {
                return 'Invalid date';
            }
        },

        eventDuration(startTime, endTime) {
            if (!startTime?._seconds || !endTime?._seconds) return '-';

            const durationInSeconds = endTime._seconds - startTime._seconds;
            if (durationInSeconds <= 0) return '-';

            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);

            let durationStr = '';
            if (hours > 0) durationStr += `${hours}h`;
            if (minutes > 0) {
                if (hours > 0) durationStr += ' ';
                durationStr += `${minutes}min`;
            }
            return durationStr || '-';
        }
    }
};
</script>

<style scoped>
.dashboard-container {
    padding: 2rem;
    background-color: black;
    min-height: 100vh;
    color: white;
}

.dashboard-title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: white;
}

.status-message {
    text-align: center;
    padding: 2rem;
    margin: 2rem 0;
    border-radius: 10px;
    background: #1a1a1a;
}

.status-message.loading {
    color: #4caf50;
}

.status-message.error {
    color: #dc3545;
}

.error-details {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #ff6b6b;
}

.summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.summary-card {
    background: linear-gradient(145deg, #1a1a1a, #222);
    padding: 1.5rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.summary-card h3 {
    color: #888;
    margin-bottom: 1rem;
}

.summary-card .number {
    font-size: 2.5rem;
    font-weight: bold;
    color: #4caf50;
    margin: 0.5rem 0;
}

.summary-card .label {
    color: #666;
}

.impact-breakdown {
    margin: 3rem 0;
}

.impact-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;
}

.impact-metric {
    background: #1a1a1a;
    padding: 1.5rem;
    border-radius: 10px;
    text-align: center;
}

.impact-metric i {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.fa-leaf { color: #4caf50; }
.fa-tint { color: #2196f3; }
.fa-thermometer-full { color: #ff4444; }
.fa-mountain { color: #795548; }

.recent-activities {
    margin-top: 3rem;
}

.activities-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;
}

.activity-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: black;
    transition: transform 0.3s ease;
}

.activity-card:hover {
    transform: translateY(-5px);
}

.activity-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.activity-details {
    padding: 1.5rem;
}

.activity-details h3 {
    margin: 0 0 1rem 0;
    color: #333;
}

.activity-details p {
    color: #666;
    margin: 0.5rem 0;
}

.impact-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

.impact-tag {
    background: #f0f0f0;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.875rem;
    color: #333;
}

h2 {
    color: white;
    margin-bottom: 1.5rem;
}

.no-activities {
    text-align: center;
    padding: 2rem;
    background: #1a1a1a;
    border-radius: 10px;
    margin-top: 2rem;
}

.no-activities p {
    color: #888;
    font-size: 1.1rem;
}

.incomplete-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin-top: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.incomplete-btn:hover {
    background-color: #c82333;
}

@media (max-width: 768px) {
    .dashboard-container {
        padding: 1rem;
    }

    .dashboard-title {
        font-size: 2rem;
    }

    .summary-card .number {
        font-size: 2rem;
    }

    .activities-list {
        grid-template-columns: 1fr;
    }
}
</style>