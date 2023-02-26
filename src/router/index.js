import { createRouter, createWebHistory } from "vue-router";
import BaseDashboard from "../views/BaseDashboard.vue";
import LoginPage from "../views/Login.vue";
import { useLoginStore } from "../stores/LoginStore.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      component: BaseDashboard,
      name: "baseDashboard",
    },
    { path: "/", alias: "/login", component: LoginPage, name: "loginPage" },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/"];
  const loginStore = useLoginStore();
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = loginStore.loginUser;
  if (authRequired && !loggedIn) {
    return next("/");
  }
  next();
});

export default router;
