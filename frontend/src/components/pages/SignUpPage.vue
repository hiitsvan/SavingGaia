<template>
  <div class="signup">
    <section class="vh-100 d-flex align-items-center justify-content-center">
      <div class="card w-40 h-auto"> <!-- Adjust width as needed -->
        <div class="card-body p-5">
          <img src="../../../public/media/Botanic.jpg" alt="">
          <h1 class="text-center mb-4 mt-4 fw-bold">Sign Up</h1>
          <!-- form -->
          <form @submit.prevent="handleSignUp">

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

            <!-- confirm password -->
            <div class="mb-3">
              <label for="confirmpassword" class="form-label">Confirm Password:</label>
              <input 
                v-model="confirmpassword" 
                class="form-control form-control-lg p-3" 
                placeholder="Confirm your password" 
                :type="showPassword ? 'text' : 'password'" 
                required />
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

            <!-- sign up button -->
            <button type="submit" class="btn btn-primary w-100 p-3">Sign Up</button>
          </form>

          <!-- error msg if any -->
          <p v-if="error" class="text-danger text-center">{{ error }}</p>

          <p class="text-center mt-3"><a href="/login" class="text-secondary">Already have an account? Log in</a></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { auth } from '../../../../backend/firebase/index'; // Adjust the path as necessary
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      fullname: '',
      email: '',
      password: '',
      confirmpassword: '',
      showPassword: false, 
      error: null,
    };
  },
  methods: {
    async handleSignUp() {
      // Clear any previous error messages
      this.error = null;

      // Validate that passwords match
      if (this.password !== this.confirmpassword) {
        this.error = "Passwords do not match.";
        return; // Stop the sign-up process
      }

      try {
        // Proceed with sign-up logic
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.error = null; // Clear any previous errors
        // Optionally, redirect to another page after successful sign-up
        this.$router.push('/LoginPage');
      } catch (err) {
        this.error = err.message; // Show Firebase error messages
      }
    }
  }
}
</script>


<style scoped>
.signup {
  font-family: 'Montserrat', sans-serif;
  color: #333;
  background-color: #ffffff;
  line-height: 1.6;
}

button {
  background-color: rgb(135, 179, 250);
  border: 0;
}
</style>
