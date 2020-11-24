import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
   mode: "history",
   routes: [
      {
         path: "/",
         component: () => import("@/pages/Home.vue")
      },
      {
         path: "/description",
         component: () => import("@/pages/Description.vue")
      }
   ],
   scrollBehavior(from, to, saved) {
      return saved || { x: 0, y: 0 }
   }
})