import { createRouter, createWebHistory } from "vue-router";
import BaseDashboard from "../views/BaseDashboard.vue";
import LoginPage from "../views/Login.vue";

const router = createRouter({
  base: import.meta.env.BASE_URL,
  history: createWebHistory(),
  routes: [
    {
      path: "/dashboard",
      component: BaseDashboard,
      name: "baseDashboard",
    },
    { path: "/", alias: "/login", component: LoginPage, name: "loginPage" },
  ],
});

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ["/"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");
//   if (authRequired && !loggedIn) {
//     return next("/");
//   }
//   next();
// });

export default router;
