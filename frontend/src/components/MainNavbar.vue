<template>
  <nav class="navbar navbar-expand-lg navbar-light" :style="isHomePage ? navbarStyles : ''">
    <div class="container">
      <router-link to="/" class="navbar-brand">SavingGaia</router-link>
      
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- Left side links -->
        <div class="navbar-left me-auto">

          <!-- Education link without hover dropdown -->
          <div class="nav-link">
            <router-link to="/education" class="nav-link">Education</router-link>
          </div>

          <!-- News link with hover dropdown -->
          <div class="nav-link dropdown">
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
          <div class="nav-link dropdown">
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
          <template v-if="!isLoggedIn">
            <router-link to="/auth" class="nav-link">Login / Sign Up</router-link>
          </template>
          <template v-else>
            <button @click="logout" class="nav-link btn btn-link">Logout</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { auth } from '../../../backend/firebase/firebase'; // Adjust path as necessary

export default {
  name: "MainNavbar",
  computed: {
    ...mapGetters(['isLoggedIn']),
    isHomePage() {
      return this.$route.path === "/";
    }
  },
  methods: {
    ...mapActions(['logoutUser']), // Assuming you have a logoutUser action in Vuex
    async logout() {
      try {
        await signOut(auth); // Sign out from Firebase
        this.$store.dispatch('logout') // Dispatch Vuex action to update the store
        console.log("User signed out successfully.");
        this.$router.push('/'); // Redirect to login page after sign-out
      } catch (error) {
        console.error("Error during logout: ", error);
      }
    }
  },
  data() {
    return {
      navbarStyles: {
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
/* Navbar styles */
.navbar {
  padding: 0.0rem 0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: black; /* Translucent black background */
   /* Default text color */
}

.navbar-sticky {
  background-color: transparent; /* Keep translucent background for sticky navbar */
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: White; /* White text for the brand */
}

.nav-link {
  color: White; /* White text for links */
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  position: relative;
  text-decoration: none;
  display: inline-block;
}

/* Hover effect to change text color */
.nav-link:hover {
  color: #28a745; /* Green hover color */
}

/* Underline animation */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #28a745; /* Green underline */
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Flex layout for left and right alignment */
.navbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Dropdown styling */
.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8); /* Dark translucent dropdown */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  width: 200px;
  border-radius: 8px;
  opacity: 1;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 10;
}

.dropdown:hover .dropdown-content {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

/* Dropdown item styling */
.news-item,
.dropdown-content .news-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.news-item img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 0.75rem;
}

.news-item a,
.news-item router-link {
  color: #ffffff; /* White text for dropdown links */
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

/* Hover effect for dropdown items */
.news-item a:hover,
.news-item router-link:hover {
  color: #28a745; /* Green hover color */
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
  border-bottom: 10px solid rgba(0, 0, 0, 0.8); /* Translucent arrow */
}
</style>
