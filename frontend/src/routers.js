import HomePage from './pages/HomePage.vue';
import LandingPage from './pages/LandingPage.vue';
import ComparisonPage from './pages/ComparisonPage.vue';
import OpportunitiesPage from './pages/OpportunitiesPage.vue';
import NewsPage from './pages/NewsPage.vue';
import AuthPage from './pages/AuthPage.vue';
import EducationPage from './pages/EducationPage.vue';
import OpportunitiesDetailsPage from './pages/OpportunitiesDetailsPage.vue';
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
        name: 'OpportunitiesDetailsPage',
        component: OpportunitiesDetailsPage,
        path: '/opportunities/:opportunityId', // Dynamic route with opportunityId parameter
        props: true, // Allows route params to be passed as props
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
    },
    {
        name: 'EducationPage',
        component: EducationPage,
        path: '/education'
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