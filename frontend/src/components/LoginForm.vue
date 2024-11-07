<template>
  <div class="form-container">
    <h1 class="title">Login</h1>
    <p class="subtitle">Access your account</p>

    <form @submit.prevent="loginUser" class="auth-form">
      <div class="input-group">
        <input type="email" v-model="email" placeholder="Email" required class="form-input" />
      </div>
      <div class="input-group">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" required
          class="form-input" />
        <span class="input-icon clickable" @click="togglePassword">
          <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
        </span>
      </div>
      <button type="submit" class="submit-btn">Login</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>

    <p class="switch-prompt">
      Don’t have an account?
      <a @click.prevent="$emit('toggle')" href="#" class="switch-link">Sign up here</a>
    </p>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';

export default {
  name: 'LoginForm',
  emits: ['toggle'],
  data() {
    return {
      email: '',
      password: '',
      error: '',
      showPassword: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(['loading']),
    submitButtonText() {
      return this.isLoading ? 'Logging in...' : 'Login';
    },
  },
  methods: {
    ...mapActions(['login']),
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async loginUser() {
  if (this.isLoading) return;
  this.isLoading = true;
  this.error = '';

  try {
    const result = await this.login({ email: this.email, password: this.password });
    
    if (result.success) {
        this.$router.push('/opportunities');
      } else {
        // Display specific error message returned by the login action
        this.error = result.message || 'Login failed. Please try again.';
      }
      
    } catch (error) {
      // Check for error structure before accessing message
      if (error.response && error.response.data && error.response.data.message) {
        this.error = error.response.data.message;
      } else {
        this.error = 'An unexpected error occurred. Please try again.';
      }
      
      console.error('Unexpected error during login:', error);
    } finally {
      this.isLoading = false;
    }
},

}}
</script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 350px;
  text-align: center;
  padding: 20px;
  background-color: rgba(34, 34, 34, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 0.9rem;
  color: #bbbbbb;
  margin-bottom: 20px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #555;
  background-color: #333;
  color: #ffffff;
}

.form-input::placeholder {
  color: #aaaaaa;
}

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2em;
  color: #ffffff;
}

.submit-btn {
  padding: 12px;
  font-size: 1rem;
  color: #ffffff;
  background-color: green;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: rgb(0, 75, 0);
}

.error-message {
  color: red;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
}

.switch-prompt {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #bbbbbb;
}

.switch-link {
  color: green;
  cursor: pointer;
}
</style>
