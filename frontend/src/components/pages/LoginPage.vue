<template>
  <div class="login">
    <section class="vh-100 d-flex align-items-center justify-content-center">
      <div class="card w-40 h-auto"> <!-- Adjust width as needed -->
        <div class="card-body p-5">
          <img src="../../../public/media/Botanic.jpg" alt="">
          <h1 class="text-center mb-4 mt-4 fw-bold">Login</h1>
          <!-- form -->
          <form @login.prevent="login">

            <!-- email -->
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input type="email" v-model="email" class="form-control form-control-lg p-3"
                placeholder="Enter a valid email address" required />
            </div>

            <!-- password -->
            <div class="mb-3">
              <label for="password" class="form-label">Password:</label>
              <input
                v-model="password" 
                class="form-control form-control-lg p-3" 
                placeholder="Enter your password" 
                :type="showPassword ? 'text' : 'password'" 
                required />
            </div>
 
            <!-- login button -->
            <button type="submit" class="btn btn-primary w-100 p-3">Login</button>
          </form>

          <!-- error msg if any -->
          <p v-if="error" class="text-danger text-center">{{ error }}</p>

          <p class="text-center mt-3"><a href="/signup" class="text-secondary">Don't have an account yet? Sign up</a></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { auth } from '../../../../backend/firebase/index';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Assuming Firebase is already set up


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