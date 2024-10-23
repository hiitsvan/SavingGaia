// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './routers'
// createApp(App).user(router).mount('#app')
import { createApp } from 'vue';
import App from './App.vue';
import router from './routers'; // Assuming you have router setup
import store from './store'; // Import the Vuex store
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap';
import './assets/styles/custom.scss';


const app = createApp(App);
app.use(router); // Use router if applicable
app.use(store);  // Use Vuex store

app.mount('#app');
