<template>
  <nav class="navbar navbar-expand-lg navbar-light" :style="isHomePage ? navbarStyles : ''">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center ms-0">
        <img src="/media/saving_gaia_logo_no_bg2.png" class="logo-image" alt="SavingGaia Logo" />
        <span class="ms-2">SavingGaia</span>
      </router-link>
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
        <div class="navbar-left ">
          <!-- Education link without hover dropdown -->
          <div class="nav-link">
            <router-link to="/education" class="nav-link">Education</router-link>
          </div>

          <!-- News link with hover dropdown -->
          <div class="nav-link dropdown">
            <router-link to="/news" class="nav-link">News</router-link>
          </div>

          <!-- Opportunities link with hover dropdown -->
          <div class="nav-link dropdown">
            <router-link to="/opportunities" class="nav-link">Opportunities</router-link>
            <template v-if="isLoggedIn">
              <div class="dropdown-content">
                <div class="news-item">
                  <img src="/media/likes-icon.png" alt="Likes" class="dropdown-icon"/>
                  <router-link to="/comparison" class="nav-link">Saved</router-link>
                </div>
                <div class="news-item">
                <img src="/media/opportunities.png" alt="Likes" class="dropdown-icon"/>
                  <router-link to="/opportunities" class="nav-link">All Opportunities</router-link>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Right side links -->
        <div class="navbar-right ms-auto">
          <template v-if="!isLoggedIn">
            <router-link to="/auth" class="nav-link">Login / Sign Up</router-link>
          </template>
          <template v-else>
            <span class="welcome-message">Welcome Back, {{ username }}!</span>
            <button @click="logoutUser" class="nav-link btn btn-link">Logout</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: "MainNavbar",
  computed: {
    ...mapGetters(['isLoggedIn']),
    isHomePage() {
      return this.$route.path === "/";
    },
    username() {
      const user = this.$store.getters.getUser;
      return user ? user.username || user.email?.split('@')[0] || 'User' : 'User';
    }
  },
  methods: {
    ...mapActions(['logoutUser']),
    async logoutUser() {
      try {
        const user = this.$store.getters.getUser;
        const token = this.$store.getters.getUserToken;

        if (!user || !user.uid || !token) {
          console.error("No user information or token found for logout.");
          return;
        }

        console.log("User UID being used for logout:", user.uid);
        console.log("Token being used for logout:", token);

        await axios.post('http://localhost:8001/auth/logout', {
          uid: user.uid,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        await this.$store.dispatch('logout');
        console.log("User signed out successfully.");
        this.$router.push('/auth');
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
.navbar {
  padding: 0.0rem 0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: black;
}

.navbar-sticky {
  background-color: transparent;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-right: 2rem; 
}

.nav-link {
  color: White;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  position: relative;
  text-decoration: none;
  display: inline-block;
}

.nav-link:hover {
  color: #28a745;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #28a745;
  transition: width 0.3s ease, left 0.3s ease;
}

.nav-link:hover::before {
  width: 100%;
  left: 0;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-image {
  width: 40px;
  height: auto;
  display: inline-block;
  vertical-align: middle;
}

.ms-2 {
  margin-left: 0.5rem;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
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

.news-item,
.dropdown-content .news-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.news-item img:not(.dropdown-icon) {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 0.75rem;
}

.dropdown-icon {
  width: 28px !important;
  height: 28px !important;
  border-radius: 4px !important;
  margin-right: 0.4rem !important;
  object-fit: cover;
}

.news-item a,
.news-item router-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.news-item a:hover,
.news-item router-link:hover {
  color: #28a745;
}

.dropdown-content::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid rgba(0, 0, 0, 0.8);
}

.welcome-message {
  color: white;
  font-weight: 500;
  margin-right: 1rem;
}
</style>