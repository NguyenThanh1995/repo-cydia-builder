import eruda from "eruda"
eruda.init()
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"

Vue.prototype.$inCydia = false

new Vue({
   el: "#app",
   router,
   store,
   components: { App },
   template: "<App/>"
})
