<template>
    <div>
      <h1>Welcome, {{ user ? user.email : 'Guest' }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      user() {
        return this.$store.state.user; // Access the user from Vuex state
      }
    }
  };
  </script>
  
