<template>
    <div class="signup">
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSignUp">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  
  import { auth } from '../../../../backend/firebase/index'; // Adjust the path as necessary
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async handleSignUp() {
        try {
          await createUserWithEmailAndPassword(auth, this.email, this.password);
          this.error = null; // Clear any previous errors
          // Optionally, redirect to another page after successful sign-up
          this.$router.push('/LoginPage'); 
        } catch (err) {
          this.error = err.message;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .signup {
    max-width: 400px;
    margin: auto;
  }
  .error {
    color: red;
  }
  </style>
  