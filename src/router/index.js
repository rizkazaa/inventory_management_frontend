import { createRouter, createWebHistory } from 'vue-router';
import AdminView from '../views/AdminView.vue';
import UserView from '../views/UserView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [

  {

    path: "/admin/:component",

    name: "admin",

    component: AdminView,

    props: true,

    meta: { requiresAuth: true, role: "admin" },

  },

  {

    path: "/user/:component",

    name: "user",

    component: UserView,

    props: true,

    meta: { requiresAuth: true, role: "user" },

  },

  {

    path: "/login",

    name: "login",

    component: LoginView,

  },

];

const router = createRouter({

  history: createWebHistory(process.env.BASE_URL),

  routes,

});

router.beforeEach((to, from, next) => {

  const isAuthenticated = Boolean(localStorage.getItem("auth"));

  const userRole = localStorage.getItem("role");

  if (to.meta.requiresAuth && !isAuthenticated) {

    alert("You need to log in to access this page.");

    next({ name: "login" });

  } else if (

    to.meta.requiresAuth &&

    isAuthenticated &&

    to.meta.role !== userRole

  ) {

    alert("You do not have permission to access this page.");

    next(false);

  } else {

    next();

  }

});

export default router;