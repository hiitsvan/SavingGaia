<template>
  <nav :class="['navbar', { 'navbar-sticky': isHomePage }]" :style="isHomePage ? navbarStyles : ''">
    <div class="container">
      <!-- Left side links -->
      <div class="navbar-left">
        <router-link to="/" class="navbar-brand">EcoLah</router-link>
        <router-link to="/" class="nav-link">Home</router-link>

        <!-- News link with hover dropdown -->
        <div class="nav-link news-dropdown">
          <router-link to="/news" class="nav-link">News</router-link>
          <div class="dropdown-content">
            <div class="news-item">
              <img src="/media/nature1.jpg" alt="News 1" />
              <router-link to="/news">Join WWF!</router-link>
            </div>
            <div class="news-item">
              <img src="/media/nature2.jpg" alt="News 2" />
              <router-link to="/news">Join NParks!</router-link>
            </div>
          </div>
        </div>

        <!-- Opportunities link with hover dropdown -->
        <div class="nav-link opportunities-dropdown">
          <router-link to="/opportunities" class="nav-link">Opportunities</router-link>
          <div class="dropdown-content">
            <div class="news-item">
              <img src="https://via.placeholder.com/100" alt="Opportunity 1" />
              <a href="https://example.com/opportunity1" target="_blank">Opportunity 1</a>
            </div>
            <div class="news-item">
              <img src="https://via.placeholder.com/100" alt="Opportunity 2" />
              <a href="https://example.com/opportunity2" target="_blank">Opportunity 2</a>
            </div>
            <div class="news-item">
              <img src="https://via.placeholder.com/100" alt="Opportunity 3" />
              <a href="https://example.com/opportunity3" target="_blank">Opportunity 3</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side links -->
      <div class="navbar-right">
        <template v-if="!loggedIn">
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/signup" class="nav-link">Sign Up</router-link>
        </template>
        <template v-else>
          <button @click="logout" class="nav-link btn btn-link">Logout</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "MainNavbar",
  computed: {
    ...mapState(['loggedIn']), // Access loggedIn state from Vuex
    isHomePage() {
      return this.$route.path === "/";
    }
  },
  methods: {
    ...mapActions(['logout']),
  },
  data() {
    return {
      navbarStyles: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: '1000'
      }
    };
  }
};
</script>

<style scoped>
.navbar {
  padding: 1rem 0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.navbar-sticky {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-right: 1rem;
}

.nav-link {
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #007bff;
}

/* Flex layout for left and right alignment */
.container {
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Align left side links */
.navbar-left {
  display: flex;
  align-items: center;
}

/* Align right side links */
.navbar-right {
  display: flex;
  gap: 1rem;
}

/* Dropdown styling for News */
.news-dropdown {
  position: relative;
}

.news-dropdown .dropdown-content,
.opportunities-dropdown .dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 320px; /* Increased width for larger content */
  border-radius: 8px;
  z-index: 10;
}

.news-dropdown:hover .dropdown-content,
.opportunities-dropdown:hover .dropdown-content {
  display: block;
}

/* Dropdown styling for Opportunities */
.opportunities-dropdown {
  position: relative;
}

.news-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.news-item img {
  width: 70px; /* Increased image size */
  height: 70px;
  border-radius: 8px;
  margin-right: 0.75rem;
}

.news-item a,
.news-item router-link {
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
}

.news-item a:hover,
.news-item router-link:hover {
  color: #007bff;
}

/* Optional additional styling for dropdown arrow */
.dropdown-content::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
}
</style>
