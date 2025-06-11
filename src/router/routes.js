// // Route'lar tartibi: 
// // 1. Public routes 
// // 2. Auth routes 
// // 3. Protected routes
// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: () => import('@/views/HomeView.vue')
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import('@/views/auth/LoginView.vue'),
//     meta: { requiresGuest: true }
//   }
// ];

// export default routes;

import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import AppMain from '@/components/layout/AppMain.vue';
import TestLesson from '@/components/layout/Courses.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: "/login",
        name: 'login',
        component: LoginView
    }
        , {
        path: "/tests",
        name: 'tests',
        component: TestLesson
    }

    ]
});

export default router;