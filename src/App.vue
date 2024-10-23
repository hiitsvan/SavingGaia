<!-- <template>
  <div class="row">
    <nav>
      <div class="col-lg-6"></div>
      <div class="col-lg-6">
        <router-link to='/' class="btn btn-light mx-4">Home</router-link>
        <router-link to='/signup' class="btn btn-light mx-4">Sign Up</router-link>
        <router-link to='/login' class="btn btn-light mx-4">Login</router-link>
      </div>
    </nav>
  </div> -->
  <!-- <template>
  <div class="row">
    <nav>
    <div class="col-6"></div>
    <div class="col-4">
    
      <router-link to='/' style="text-decoration: none;" class="text-dark mx-4">Home</router-link>
      <router-link to='/login' style="text-decoration: none;" class="text-dark mx-4">Login</router-link>
      <router-link to='/signup' style="text-decoration: none;" class="text-dark mx-4">Sign Up</router-link>
    </div>
    <div class="col-2"></div>
    </nav>
  </div> -->


<template>
  <div>
    <MainNavbar/>
    <router-view></router-view>
  </div>


</template>

<script>

import MainNavbar from './components/MainNavbar.vue';
export default {
  name: 'App',
  components:{
    MainNavbar,
  }
}
</script>

