<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { auth } from '../firebase/index';
  import { signInWithEmailAndPassword } from 'firebase/auth' ; // Assuming Firebase is already set up
  
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;
          this.$store.dispatch('login', user);  // Dispatch Vuex action to update the store
          this.$router.push('/home');           // Redirect to home page after login
        } catch (error) {
          console.error("Error logging in: ", error);
        }
      }
    }
  };
  </script>
  