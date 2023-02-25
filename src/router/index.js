import { createRouter, createWebHistory } from "vue-router";
import BaseDashboard from "../views/BaseDashboard.vue";
import LoginPage from "../views/Login.vue";
import FacultyDashboard from "../views/FacultyDashboard.vue";

const router = createRouter({
  mode: "hash",
  linkExactActiveClass: "active",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      component: BaseDashboard,
      name: "baseDashboard",
    },
    { path: "/", component: LoginPage, name: "loginPage" },
    {
      path: "/facultydashboard",
      component: FacultyDashboard,
      name: "facultyDashboard",
    },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  if (authRequired && !loggedIn) {
    return next("/");
  }
  next();
});

export default router;
