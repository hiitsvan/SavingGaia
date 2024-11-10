<template>
  <nav class="navbar navbar-expand-lg navbar-light" >
    <div class="container">
      <router-link to="/home" class="navbar-brand d-flex align-items-center ms-0">
        <img src="/media/saving_gaia_logo_no_bg2.png" class="logo-image" alt="SavingGaia Logo" />
        <span class="savingGaia ms-2">SavingGaia</span>
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
        <div class="navbar-left">
          <!-- Education link without hover dropdown -->
          <div class="nav-link">
            <router-link to="/gaia" class="nav-link">Gaia</router-link>
          </div>
          <div class="nav-link">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          </div>

          <!-- News link with hover dropdown -->
          <div class="nav-link dropdown">
            <router-link to="/news" class="nav-link">News</router-link>
          </div>

          <!-- Opportunities link with hover dropdown -->
          <div class="nav-link dropdown">
            <router-link to="/opportunities" class="nav-link">Opportunities</router-link>
            <template v-if="isAuthenticated">
              <div class="dropdown-content">
                <div class="news-item">
                  <img src="/media/saved_icon.jpg" alt="Likes" class="dropdown-icon"/>
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
          <template v-if="!isAuthenticated">
            <router-link to="/auth" class="nav-link">Login / Sign Up</router-link>
          </template>
          <template v-else>
            <span v-if="user" class="welcome-message">Welcome back, {{ user.displayName || 'user'}}!</span>
            <button @click="logoutUser" class="nav-link btn btn-link">Logout</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
  name: "MainNavbar",
  data() {
    return {
      navbarStyles: {
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: '1000'
      }
    };
  },
  computed: {
    // Use Vuex's isAuthenticated and user getters
    ...mapGetters(['isAuthenticated', 'user']),
  },
  methods: {
    ...mapActions(['logout']),
    async logoutUser() {
      try {
        await this.logout(); // Call Vuex logout action
        this.$router.push('/auth'); // Redirect to login page after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
};
</script>

<style scoped>
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.savingGaia {
  background-clip: text;
  -webkit-background-clip: text;
  transition: color 0.3s ease;
  color: white;
}

.navbar-brand:hover .savingGaia {
  color: transparent;
  background-image: linear-gradient(45deg, #4CAF50, #2196F3);
  background-size: 200% 200%;
  animation: gradientAnimation 3s ease infinite;
}

.navbar {
  padding: 1rem 0;
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
  color: White !important;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  position: relative;
  text-decoration: none;
  display: inline-block;
}

.nav-link::before {
  content: none;
}

.router-link-active,
a.nav-link {
  position: relative;
}

.router-link-active::before,
a.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #28a745;
  transition: width 0.3s ease, left 0.3s ease;
}

.router-link-active:hover::before,
a.nav-link:hover::before {
  width: 100%;
  left: 0;
}

.nav-link:hover::before {
  width: 100%;
  left: 0;
}

.nav-link:visited,
.router-link-active,
.router-link-exact-active {
  color: White !important;
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
  color: white;
}

.ms-2 {
  margin-left: 0.5rem;
}

.navbar-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Mobile styles */
@media (max-width: 991px) {
  .navbar-collapse {
    text-align: center;
  }

  .navbar-left, .navbar-right {
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-left: 0; /* Reset margin for mobile */
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-link:last-child {
    border-bottom: none;
  }

  .dropdown-content {
    position: static;
    width: 100%;
    margin-top: 0.5rem;
    transform: none;
  }

  .welcome-message {
    margin: 1rem 0;
  }

  .navbar-toggler {
    border-color: rgba(255, 255, 255, 0.5);
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
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