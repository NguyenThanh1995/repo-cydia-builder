import Vue from "vue"
import App from "./App"
import router from "./router"

Vue.prototype.$inCydia = false

new Vue({
   el: "#app",
   router,
   components: { App },
   template: "<App/>"
})