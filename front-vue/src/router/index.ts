import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import useEvnet from "../views/useEvent타입.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "useEvnet",
    component: useEvnet,
  },
  {
    path: "/codegen",
    name: "codegen",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Codegen타입.vue"),
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
