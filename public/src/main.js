import eruda from "eruda"
eruda.init()
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"

Vue.prototype.$inCydia = navigator.userAgent.search(/Cydia/) > -1
Object.defineProperty(Vue.prototype, "$iOSVersion", {
   get() {
      const match = (navigator.appVersion).split("OS ")
      return match && match.length > 1 ? match[1].split(" ")[0].replace("_", ".") : "unknown"
   }
})

new Vue({
   el: "#app",
   router,
   store,
   components: { App },
   template: "<App/>"
})