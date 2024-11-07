<template>
  <div class="form-container">
    <h1 class="title">Sign Up</h1>
    <p class="subtitle">Join SavingGaia today!</p>

    <form @submit.prevent="signup" class="auth-form">
      <div class="input-group">
        <input type="text" v-model="name" placeholder="Name" required class="form-input" />
      </div>
      <div class="input-group">
        <input type="email" v-model="email" placeholder="Email" required class="form-input" />
      </div>
      <div class="input-group">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" required class="form-input" />
        <span class="input-icon clickable" @click="togglePasswordVisibility">
          <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
        </span>
      </div>
      <div class="input-group">
        <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirm Password" required class="form-input" />
        <span class="input-icon clickable" @click="togglePasswordVisibility">
          <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
        </span>
      </div>
      <button type="submit" class="submit-btn">Sign Up</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>

    <p class="switch-prompt">
      Already have an account?
      <a @click.prevent="$emit('toggle')" href="#" class="switch-link">Login here</a>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const showPassword = ref(false);

const signup = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords don't match";
    return;
  }

  try {
    await axios.post('http://localhost:8001/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    router.push('/auth');
  } catch (err) {
    error.value = err?.response?.data?.error || 'Registration failed. Please try again.';
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
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
