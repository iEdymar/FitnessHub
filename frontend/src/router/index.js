import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import HomePage from '@/pages/HomePage.vue';
import AdminPage from '@/pages/AdminPage.vue';
import AddWorkout from '@/pages/AddWorkout.vue';
import AddEditWorkout from '@/pages/AddEditWorkout.vue';
import UserManagement from '@/pages/UserManagement.vue';
import AddUser from '@/pages/AddUser.vue';



const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminPage
    },
    {
        path: '/admin/add',
        nome: 'add',
        component: AddWorkout,
    },
    {
        path: '/admin/edit/:id',
        nome: 'edit',
        component: AddEditWorkout
    },
    {
        path: '/admin',
        component: AdminPage,
    },
    {
        path: '/users',
        component: UserManagement
    },
    {
        path: '/users/add',
        name: 'AddUser',
        component: AddUser,
    },
    {
        path: '/users/edit/:id',
        name: 'EditUser',
        component: () => import('../pages/AddUser.vue')
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
