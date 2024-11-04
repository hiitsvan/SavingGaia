import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    token: null,
    loggedIn: false,
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;
      state.token = userData.token; // Store token here
      state.loggedIn = true;
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
    },
    async logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    getUser: (state) => state.user,
    getUserToken: (state) => state.token,
    isLoggedIn: (state) => state.loggedIn
  }
});
