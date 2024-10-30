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
        <input type="text" id="keyword" placeholder="Search by keyword" />
      </div>

      <!-- Time Filter -->
      <div class="filter-group">
        <label>Time</label>
        <label for="start-time">Start Time</label>
        <select id="start-time" class="time-dropdown">
          <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
        </select>

        <label for="end-time">End Time</label>
        <select id="end-time" class="time-dropdown">
          <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
        </select>
      </div>

      <!-- Location Filter -->
      <div class="filter-group">
        <label for="location">Location</label>
        <input type="text" id="location" placeholder="Search by location" />
      </div>

      <!-- Commitment Filter -->
      <div class="filter-group">
        <label>Commitment</label>
        <div class="checkbox">
          <input type="checkbox" id="adhoc" />
          <label for="adhoc">Adhoc</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="long-term" />
          <label for="long-term">Long-term</label>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Header Section -->
      <section class="header-section fade-up delay-2">
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
            <div class="card">
              <div class="card-image">
                <img src="/media/pngtree-the-many-african-kids-picture-image_2781263.jpg" alt="Event Image" />
              </div>
              <div class="card-content">
                <h3 class="card-heading">Collecting Trash @CSC</h3>
                <p class="card-paragraph">
                  Join us for a day of environmental care by collecting trash in your local community park.
                </p>
                <ul class="list">
                  <li class="list-item">
                    <img src="/media/date-71.png" alt="Date Icon" class="icon" />
                    <p>April 10, 2024</p>
                  </li>
                  <li class="list-item">
                    <img src="/media/1035.png_1200.png" alt="Time Icon" class="icon" />
                    <p>10:00 AM - 2:00 PM</p>
                  </li>
                  <li class="list-item">
                    <img src="/media/535239.png" alt="Location Icon" class="icon" />
                    <p>Community Park</p>
                  </li>
                </ul>
              </div>
              <a href="#" class="button">Save to likes</a>
            </div>

            <!-- Card 2 -->
            <div class="card">
              <div class="card-image">
                <img src="/media/pngtree-the-many-african-kids-picture-image_2781263.jpg" alt="Event Image" />
              </div>
              <div class="card-content">
                <h3 class="card-heading">Beach Cleanup @CSC</h3>
                <p class="card-paragraph">
                  Help us restore the beauty of our beaches with this beach cleanup initiative.
                </p>
                <ul class="list">
                  <li class="list-item">
                    <img src="/media/date-71.png" alt="Date Icon" class="icon" />
                    <p>May 15, 2024</p>
                  </li>
                  <li class="list-item">
                    <img src="/media/1035.png_1200.png" alt="Time Icon" class="icon" />
                    <p>8:00 AM - 12:00 PM</p>
                  </li>
                  <li class="list-item">
                    <img src="/media/535239.png" alt="Location Icon" class="icon" />
                    <p>Beach Front</p>
                  </li>
                </ul>
              </div>
              <a href="#" class="button">Save to likes</a>
            </div>

            <!-- Card 3 -->
            <div class="card">
              <div class="card-image">
                <img src="/media/pngtree-the-many-african-kids-picture-image_2781263.jpg" alt="Event Image" />
              </div>
              <div class="card-content">
                <h3 class="card-heading">Tree Planting @CSC</h3>
                <p class="card-paragraph">
                  Join the tree planting movement and contribute to making the city greener!
                </p>
                <ul class="list">
                  <li class="list-item">
                    <img src="/media/date-71.png" alt="Date Icon" class="icon" />
                    <p>June 20, 2024</p>
                  </li>
                  <li class="list-item">
                    <img src="/media/1035.png_1200.png" alt="Time Icon" class="icon" />
                    <p>9:00 AM - 1:00 PM</p>
                  </li>
                  <li class="list-item">
                    <img src="/media/535239.png" alt="Location Icon" class="icon" />
                    <p>City Garden</p>
                  </li>
                </ul>
              </div>
              <a href="#" class="button">Save to likes</a>
            </div>
          </div>
        </div>
        <a href="comparison"><button>Compare </button></a>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'OpportunitiesPage',
  data() {
    return {
      hours: Array.from({ length: 24 }, (_, i) => {
        const hour = String(i).padStart(2, '0');
        return `${hour}:00`;
      })
    };
  }
};
</script>

<style scoped>
@import '../assets/styles/opportunities.css';
</style>
