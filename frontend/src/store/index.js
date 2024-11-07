// store/index.js
import { createStore } from 'vuex';
import { clientAuth, db } from '../../firebaseClient'; // Adjust the path if needed
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('firebaseToken') || null,
    isLoading: true,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'User', // Use 'User' if displayName is not set
        providerId: user.providerId,
      };
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('firebaseToken', token);
    },
    CLEAR_SESSION(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('firebaseToken');
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        // Authenticate the user with email and password
        const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();

        // Fetch additional user data from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        // Initialize user data with authentication details
        let userData = { uid: user.uid, email: user.email, displayName: 'User' };

        // If Firestore document exists, add Firestore data to userData
        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data();
          userData.displayName = userDocData.name || 'User'; // Map Firestore `name` to `displayName`
        } else {
          console.warn("User data not found in Firestore");
        }

        console.log("User logged in:", userData); // Log full user data

        // Commit user data and token to Vuex store
        commit('SET_USER', userData);
        commit('SET_TOKEN', token);
        
        return { success: true }; // Indicate successful login
      } catch (error) {
        console.error("Error during login:", error); // Log the full error

        // Format the error message to return it back to the component
        const errorMessage = this.getErrorMessage(error);
        return { success: false, message: errorMessage };
      }
    },
    async logout({ commit }) {
      const currentUser = clientAuth.currentUser; // Get the current user details
      if (currentUser) {
        console.log("Logging out user:", {
          uid: currentUser.uid,
          email: currentUser.email,
        }); // Log user details
      } else {
        console.log("No user is currently logged in."); // Log if no user is logged in
      }
      await signOut(clientAuth);
      commit('CLEAR_SESSION');
    },
    initializeAuth({ commit }) {
      return new Promise((resolve) => {
        onAuthStateChanged(clientAuth, async (user) => {
          if (user) {
            const token = await user.getIdToken();
            // Fetch user details from Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);
            let userData = { uid: user.uid, email: user.email, displayName: 'User' };

            if (userDocSnap.exists()) {
              const userDocData = userDocSnap.data();
              userData.displayName = userDocData.name || 'User'; // Map Firestore `name` to `displayName`
            } else {
              console.warn("User data not found in Firestore");
            }

            commit('SET_USER', userData);
            commit('SET_TOKEN', token);
          } else {
            commit('CLEAR_SESSION');
          }
          resolve();
        });
      });
    },
  },
  methods: {
    getErrorMessage(error) {
      switch (error.code) {
        case 'auth/user-not-found':
          return 'No account found with this email';
        case 'auth/wrong-password':
          return 'Invalid password';
        case 'auth/invalid-email':
          return 'Invalid email address';
        case 'auth/too-many-requests':
          return 'Too many failed attempts. Please try again later';
        case 'auth/invalid-credential':
          return 'Invalid credential provided. Please try again.';
        default:
          return 'Login failed. Please try again.';
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
    loading: (state) => state.isLoading,
  },
});
