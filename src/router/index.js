import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GamePage from "../views/GamePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/GamePage",
    name: "GamePage",
    component: GamePage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (from === undefined) {
    // user is refreshing the page
    next({ name: "Home" }); // redirect to home page
  } else {
    next(); // allow navigation to proceed
  }
});

export default router;
