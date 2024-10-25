// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './routers'
// createApp(App).user(router).mount('#app')
import { createApp } from 'vue';
import App from './App.vue';
import router from './routers'; // Assuming you have router setup
import store from './store'; // Import the Vuex store
import './assets/styles/custom.css';


const app = createApp(App);
app.use(router); // Use router if applicable
app.use(store);  // Use Vuex store

app.mount('#app');
