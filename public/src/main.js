import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"
import config from "./config"
import meta from "vue-meta"

Vue.use(meta)

Vue.prototype.$inCydia = navigator.userAgent.search(/Cydia/) > -1
Vue.prototype.$config = config

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
