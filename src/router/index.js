import { createRouter, createWebHistory } from "vue-router";
import BaseDashboard from "../views/BaseDashboard.vue";

const routes = [
  {
    path: "/",
    component: BaseDashboard,
    name: "baseDashboard",
  },
];

const router = createRouter({
  mode: "hash",
  linkExactActiveClass: "active",
  base:
    //    process.env.NODE_ENV === 'development'? "/" : "/schedule-t3/", - for AWS
    process.env.NODE_ENV === "development" ? "/" : "/",
  history: createWebHistory(),
  routes,
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
