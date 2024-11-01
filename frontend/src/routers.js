
import HomePage from './components/pages/HomePage.vue';
import LandingPage from './components/pages/LandingPage.vue';
import SignUpPage from './components/pages/SignUpPage.vue';
import LoginPage from './components/pages/LoginPage.vue';
import ComparisonPage from './components/pages/ComparisonPage.vue';
import OpportunitiesPage from './components/pages/OpportunitiesPage.vue';
import NewsPage from './components/pages/NewsPage.vue';
import {createRouter, createWebHistory} from 'vue-router'

const routes=[
    {
        name: 'LandingPage',
        component: LandingPage,
        path: '/',
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'HomePage',
        component: HomePage,
        path: '/home',
        meta: {
            requiresAuth: true
        }
    },
    {
        name: '/OpportunitiesPage',
        component: OpportunitiesPage,
        path: '/opportunities'
    },
    {
        name: 'ComparisonPage',
        component: ComparisonPage,
        path: '/comparison',
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'NewsPage',
        component: NewsPage,
        path: '/news'
    },
    {
        name: 'AuthPage',
        component: AuthPage,
        path: '/auth'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        };
      } else if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0 };
      }
    },
  });
  
  export default router;