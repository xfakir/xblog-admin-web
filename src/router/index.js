import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "test1",
        component: () => import("@/views/article/list"),
        name: "test1",
        meta: {
          title: "test1"
        }
      },
      {
        path: "test2",
        component: () => import("@/views/article/new"),
        name: "test2",
        meta: {
          title: "test2"
        }
      }
    ],
    meta: {
      title: "Home"
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
