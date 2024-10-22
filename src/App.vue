<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <ComparisonPage/>
  <HomePage/>
  <LoginPage/>
  <SignUpPage/>

</template>

<script>
import ComparisonPage from './components/ComparisonPage.vue';
import HomePage from './components/HomePage.vue';
import LoginPage from './components/LoginPage.vue';
import SignUpPage from './components/SignUpPage.vue';


export default {
  name: 'App',
  components: {
    HomePage,
    ComparisonPage,
    LoginPage,
    SignUpPage

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
