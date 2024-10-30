import HomePage from './pages/HomePage.vue';
import SignUpPage from './pages/SignUpPage.vue';
import LoginPage from './pages/LoginPage.vue';
import ComparisonPage from './pages/ComparisonPage.vue';
import OpportunitiesPage from './pages/OpportunitiesPage.vue';
import NewsPage from './pages/NewsPage.vue';
import {createRouter, createWebHistory} from 'vue-router'
import NewHomePage from './pages/NewHomePage.vue';

const routes=[
    {
        name: 'HomePage',
        component: HomePage,
        path: '/',
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'SignUpPage',
        component: SignUpPage,
        path: '/signup'
    },
    {
        name: 'LoginPage',
        component: LoginPage,
        path: '/login'
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
        name: 'NewHomePage',
        component: NewHomePage,
        path: '/newhomepage'
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