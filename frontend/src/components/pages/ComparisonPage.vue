<template>
    <div class="container">
        <section id="selectionInfo">
            <h1>Please select 2 of your saved volunteer work</h1>
        </section>

        <section id="allCards" class="cardGrid">
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
                <img src="https://placehold.co/300x200" alt="Volunteer Work 1">
                <h3>Beach Cleanup</h3>
                <p>Type: Environmental</p>
                <p>Date: 2024-03-15</p>
                <p>Duration: 4 hours</p>
                <p>Event Type: Ad-Hoc</p>
                <p>Location: Sunny Beach</p>
                <p>Distance: 5km</p>
            </div>
            <div class="volunteer-card" data-id="3">
                <img src="https://placehold.co/300x200" alt="Volunteer Work 1">
                <h3>Beach Cleanup</h3>
                <p>Type: Environmental</p>
                <p>Date: 2024-03-15</p>
                <p>Duration: 4 hours</p>
                <p>Event Type: Ad-Hoc</p>
                <p>Location: Sunny Beach</p>
                <p>Distance: 5km</p>
            </div>
            <div class="volunteer-card" data-id="4">
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
import "./comparison.js";
export default {
  computed: {
    user() {
      return this.$store.state.user; // Access the user from Vuex state
    }
  }
};



</script>

<style scoped>
@import '../../assets/styles/comparison.css';
</style>