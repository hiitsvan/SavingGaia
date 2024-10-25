<!-- src/components/Navbar.vue -->
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">MyApp</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="ms-auto"> 
            <router-link to="/" class="btn btn-light mx-2">Home</router-link>
            <router-link to="/signup" class="btn btn-light mx-2">Sign Up</router-link>
            <router-link to="/login" class="btn btn-light mx-2">Login</router-link>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "MainNavbar",
  };
  </script>
  
  <style scoped>
  /* Optional: You can add custom styles here */
  </style>
  