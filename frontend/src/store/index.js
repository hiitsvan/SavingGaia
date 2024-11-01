import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    loggedIn: false,
  },
  mutations: {
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
    async login({ commit }, user) {
      commit('setUser', user);
    },
    async register({ commit }, user) {
      commit('setUser', user);
    },
    async logout({ commit }) {
      commit('SetUser', false);
    }
  },
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.loggedIn
  }
});
