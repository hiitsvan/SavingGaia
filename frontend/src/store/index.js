import { createStore } from 'vuex';
import axios from 'axios'; // Assuming you use axios for API requests

export default createStore({
  state: {
    user: null,
    token: null,
    loggedIn: false,
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;
      state.token = userData.token;
      state.loggedIn = true;
    },
    setToken(state, token) {
      state.token = token;
      state.loggedIn = true; // Set logged in status to true
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
    }
  },
  actions: {
    async login({ commit }, userData) {
      commit('setUser', userData);
      localStorage.setItem('authToken', userData.token); // Save token to local storage
    },
    async logout({ commit }) {
      commit('logout');
      localStorage.removeItem('authToken'); // Remove token from local storage
    },
    async verifyToken({ commit }, token) {
      try {
        // Send a request to your backend to verify the token
        const response = await axios.post('http://localhost:8001/auth/verify-token', { token });
        
        if (response.data.valid) {
          // Assuming response includes user data if the token is valid
          commit('setUser', response.data.user);
        } else {
          commit('logout');
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        commit('logout');
        localStorage.removeItem('authToken');
      }
    }
  },
  getters: {
    getUser: (state) => state.user,
    getUserToken: (state) => state.token,
    isLoggedIn: (state) => state.loggedIn
  }
});
