import { createRouter, createWebHistory } from "vue-router";
import BaseDashboard from "../views/BaseDashboard.vue";
import LoginPage from "../views/Login.vue";
import { useUserStore } from "../stores/UserStore.js";

const router = createRouter({
  mode: "history",
  history: createWebHistory(import.meta.env.BASE_URL),
  baseurl: import.meta.env.BASE_URL,
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
  const userStore = useUserStore();
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = userStore.userInfo;
  if (authRequired && !loggedIn) {
    return next("/");
  }
  next();
});

export default router;
