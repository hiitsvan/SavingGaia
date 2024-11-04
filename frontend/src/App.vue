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
  computed: {
    showNavbar() {
      // List of routes where the navbar should not be displayed
      const noNavbarRoutes = ['/','/deforestation','/carbonemission','/risingsealevel']; // Add routes as needed
      return !noNavbarRoutes.includes(this.$route.path);
    }
  }
}
</script>