<template>
  <div class="login">
    <section class="vh-100 d-flex align-items-center justify-content-center">
      <div class="card w-40 h-auto">
        <div class="card-body p-5">
          <img src="../../public/media/Botanic.jpg" alt="">
          <h1 class="text-center mb-4 mt-4 fw-bold">Login</h1>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input type="email" v-model="email" class="form-control form-control-lg p-3"
                placeholder="Enter a valid email address" required />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password:</label>
              <input v-model="password" class="form-control form-control-lg p-3" placeholder="Enter your password"
                :type="showPassword ? 'text' : 'password'" required />
            </div>

            <div class="mb-3 form-check">
              <input 
                id="showPassword" 
                class="form-check-input" 
                type="checkbox" 
                v-model="showPassword"
              />
              <label class="form-check-label" for="showPassword">Show Password</label>
            </div>

            <button type="submit" class="btn btn-primary w-100 p-3">Login</button>
          </form>
          <p v-if="error" class="text-danger text-center">{{ error }}</p>
          <p class="text-center mt-3"><router-link to="/signup" class="text-secondary">Don't have an account yet? Sign up</router-link></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { auth } from '../../../backend/firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      showPassword: false, 
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;
        // Dispatch Vuex action to update the store with user info
        await this.login(user);  
        // Redirect to the homepage after login
        this.$router.push('/');
      } catch (error) {
        this.error = "Error logging in: " + error.message;
        console.error("Error logging in: ", error);
      }
    }
  }
};
</script>

<style scoped>
button {
  background-color: rgb(135, 179, 250);
  border: 0;
}
</style>