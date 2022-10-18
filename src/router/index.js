import { createRouter, createWebHistory } from "vue-router";
import SingUp from "../views/SignUp.vue";
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
    },
    {
      path: "/ToDo",
      name: "ToDo",
      component: ToDo,
    },
  ],
});

export default router;
