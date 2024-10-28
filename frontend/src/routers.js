import HomePage from './components/pages/HomePage.vue';
import SignUpPage from './components/pages/SignUpPage.vue';
import LoginPage from './components/pages/LoginPage.vue';
import ComparisonPage from './components/pages/ComparisonPage.vue';
import OpportunitiesPage from './components/pages/OpportunitiesPage.vue';
import NewsPage from './components/pages/NewsPage.vue';
import {createRouter, createWebHistory} from 'vue-router'

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;