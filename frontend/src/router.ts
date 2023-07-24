import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home",
    },
    {
      path: '/login',
      component: Login,
      name: "Login"
    },
    {
      path: '/register',
      component: Register,
      name: "Register"
    }
  ],
});

export default router;
