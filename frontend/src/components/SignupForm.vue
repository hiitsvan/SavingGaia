<template>
  <div class="card-body p-5">
    <img src="/media/Botanic.jpg" alt="Botanic" class="logo">
    <h1 class="text-center mb-4 mt-4 fw-bold">Sign Up</h1>

    <form @submit.prevent="signup">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input type="text" v-model="name" class="form-control form-control-lg p-3" placeholder="Enter your name"
          required />
      </div>
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

      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password:</label>
        <input v-model="confirmPassword" class="form-control form-control-lg p-3" placeholder="Confirm your password"
          :type="showPassword ? 'text' : 'password'" required />
      </div>

      <div class="mb-3 form-check">
        <input id="showPassword" class="form-check-input" type="checkbox" v-model="showPassword" />
        <label class="form-check-label" for="showPassword">Show Password</label>
      </div>

      <button type="submit" class="btn btn-primary w-100 p-3">Sign Up</button>
    </form>

    <p v-if="error" class="text-danger text-center">{{ error }}</p>
    <p class="text-center mt-3">
      <a href="#" @click.prevent="$emit('toggle')" class="text-secondary">
        Already have an account? Login
      </a>
    </p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'SignupForm',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      error: '',
      showPassword: false
    };
  },
  methods: {
    async signup() {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords don't match";
        return;
      }

      try {
        console.log({ email: this.email, password: this.password, name: this.name });
        const response = await axios.post('http://localhost:8001/auth/register', {
          email: this.email,
          password: this.password,
          name: this.name
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log(response.data);
        this.$router.push('/login');
      } catch (err) {
        this.error = "Error signing up: " + err.message;
      }
    }
  }
};
</script>

<style scoped>
.btn-primary {
  background-color: rgb(135, 179, 250);
  border: 0;
}

.logo {
  max-width: 100%;
  height: auto;
}
</style>