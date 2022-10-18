import { createRouter, createWebHistory } from "vue-router";
import SingUp from "../views/SingUp.vue";
import AccountUser from "../views/LogIn.vue";
import ToDo from "../views/ToDo.vue";
import App from "../App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SingUp,
    },
    {
      path: "/log-in",
      name: "LogIn",
      component: AccountUser,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/ToDo",
      name: "ToDo",
      component: ToDo,
    },
  ],
});

export default router;
