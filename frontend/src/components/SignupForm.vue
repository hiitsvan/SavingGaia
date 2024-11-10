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
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" required
          class="form-input" />
        <span class="input-icon clickable" @click="togglePassword">
          <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
        </span>
      </div>
      <div class="input-group">
        <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword"
          placeholder="Confirm Password" required class="form-input" />
        <span class="input-icon clickable" @click="toggleConfirmPassword">
          <i :class="showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
        </span>
      </div>
      <button type="submit" class="submit-btn">{{ submitButtonText }}</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>

    <p class="switch-prompt">
      Already have an account?
      <a @click.prevent="$emit('toggle')" href="#" class="switch-link">Login here</a>
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'SignupForm',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      error: '',
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false,
    }
  },
  computed: {
    submitButtonText() {
      return this.isLoading ? 'Signing you up...' : 'Sign Up';
    },
  },
  methods: {
    ...mapActions(['login']),
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    async signup() {
      if (this.isLoading) return;

      this.isLoading = true;
      this.error = '';
      if (this.password !== this.confirmPassword) {
        this.isLoading = false;
        this.error = "Passwords don't match";
        return;
      }
      if (this.password.length < 6) {
        this.isLoading = false;
        this.error = "Passwords must be at least six characters";
        return;
      }

      try {
        console.log({ email: this.email, password: this.password, name: this.name });
        const response = await axios.post('https://us-central1-wad2proj-c747a.cloudfunctions.net/app/auth/register', {
          email: this.email,
          password: this.password,
          name: this.name
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log(response.data);
        alert("Successful signup, logging you in...")
        const result = await this.login({ email: this.email, password: this.password });

        if (result.success) {
          this.$router.push('/opportunities');
        }
      }
      catch (error) {
        this.isLoading = false;
        if (error.response) {
          // Backend responded with a status other than 200
          this.error = error.response.data.message
          console.error("Registration error:", error.response.data.message || "Something went wrong");
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received:", error.request);
        } else {
          // Something went wrong setting up the request
          console.error("Error in registration request:", error.message);
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
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
