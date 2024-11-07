<template>
  <div>
    <MainNavbar v-if="showNavbar" />
    <router-view />
  </div>
</template>
<script>

import MainNavbar from './components/MainNavbar.vue';

export default {
  name: 'App',
  components: {
    MainNavbar,
  },
  // async created() {
  //   const token = localStorage.getItem('authToken');
  //   if (token) {
  //     this.$store.commit('setToken', token);
  //     this.$store.dispatch('verifyToken', token); // Revalidate with backend if needed
  //   }
  // },
  computed: {
    showNavbar() {
      // List of routes where the navbar should not be displayed
      const noNavbarRoutes = ['/', '/deforestation', '/carbonemission', '/risingsealevel']; // Add routes as needed
      return !noNavbarRoutes.includes(this.$route.path);
    }
  }
}
</script>

<style>
/* Add these global styles */
:root {
  background-color: #000000;
}</style>