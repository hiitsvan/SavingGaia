<template>
    <div class="container">
        <section id="selection-header">
            <h1>Please select 2 of your saved volunteer work</h1>
        </section>

        <section id="volunteer-cards" class="cards-grid">
            <div class="volunteer-card" data-id="1">
                <img src="https://placehold.co/300x200" alt="Volunteer Work 1">
                <h3>Beach Cleanup</h3>
                <p>Type: Environmental</p>
                <p>Date: 2024-03-15</p>
                <p>Duration: 4 hours</p>
                <p>Event Type: Ad-Hoc</p>
                <p>Location: Sunny Beach</p>
                <p>Distance: 5km</p>
            </div>
            <div class="volunteer-card" data-id="2">
                <img src="https://placehold.co/300x200" alt="Volunteer Work 2">
                <h3>Senior Care Center</h3>
                <p>Type: Healthcare</p>
                <p>Date: 2024-03-20</p>
                <p>Duration: 3 hours</p>
                <p>Event Type: Long Term</p>
                <p>Location: Silver Care</p>
                <p>Distance: 2km</p>
            </div>
            <div class="volunteer-card" data-id="3">
                <img src="https://placehold.co/300x200" alt="Volunteer Work 3">
                <h3>Food Bank</h3>
                <p>Type: Community</p>
                <p>Date: 2024-03-25</p>
                <p>Duration: 5 hours</p>
                <p>Event Type: Long Term</p>
                <p>Location: Community Center</p>
                <p>Distance: 3km</p>
            </div>
        </section>

        <section id="comparison-table" class="hidden">
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
                    <tr>
                        <td>Title</td>
                        <td id="title1"></td>
                        <td id="title2"></td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td id="date1"></td>
                        <td id="date2"></td>
                    </tr>
                    <tr>
                        <td>Duration</td>
                        <td id="duration1"></td>
                        <td id="duration2"></td>
                    </tr>
                    <tr>
                        <td>Event Type</td>
                        <td id="type1"></td>
                        <td id="type2"></td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td id="location1"></td>
                        <td id="location2"></td>
                    </tr>
                    <tr>
                        <td>Distance</td>
                        <td id="distance1"></td>
                        <td id="distance2"></td>
                    </tr>
                </tbody>
            </table>
            <button id="reset-comparison" class="reset-btn">Reset Comparison</button>
        </section>
    </div>
    
</template>
<script>
import comparisonScript from "./comparison.js"; // Adjust path as necessary
export default {
  mixins: [comparisonScript], // Use mixins to integrate the JavaScript
  computed: {
    user() {
      return this.$store.state.user; // Access the user from Vuex state
    }
  }
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

th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
}

th {
    background-color: #3498db;
    color: white;
}

tr:hover {
    background-color: #f5f6fa;
}

.hidden {
    display: none;
}

.reset-btn {
    display: block;
    margin: 2rem auto;
    padding: 0.8rem 1.5rem;
    background-color: #e74c3c;
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