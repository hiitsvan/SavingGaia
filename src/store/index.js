import { createStore } from 'vuex';

export default createStore({
  state: {
    // Your global state variables
    user: null,
    loggedIn: false,
    // Add other state variables here
  },
  mutations: {
    // Functions to update state variables
    setUser(state, user) {
      state.user = user;
      state.loggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.loggedIn = false;
    }
  },
  actions: {
    // Functions that commit mutations and can handle async logic
    async login({ commit }, user) {
      commit('setUser', user);
    },
    async register({ commit }, user) {
        commit('setUser', user);
      },
    async logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    // Optional: Define getter functions to access state easily
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.loggedIn
  }
});
