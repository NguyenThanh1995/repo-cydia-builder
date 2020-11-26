import Vue from "vue"
import Vuex, { Store } from "vuex"
import crearePersistedstate from "vuex-persistedstate"
import config from "@/config"

Vue.use(Vuex)

const store = new Store({
   state: {
      packages: [],
      packagesLength: 0,
      lastUpdate: NaN,

      isDarkMode: true
   },
   plugins: [crearePersistedstate("isDarkMode")],
   mutations: {
      resetPackages: state => state.packages = [],
      pushPackages: (state, item) => state.packages.push(item),
      setPackagesLength: (state, length) => state.packagesLength = length,
      setLastUpdate: (state, val) => state.lastUpdate = val,
      toggleDarkMode: state => state.isDarkMode = !state.isDarkMode
   },
   getters: {
      packages: ({ packages }) => packages.sort((a, b) => a.birthtimeMs > b.birthtimeMs),
      sections({ packages }) {
         const sections = {}
         packages.forEach(item => {
            if (item.Section in sections) {
               sections[item.Section].push(item)
            } else {
               sections[item.Section] = [item]
            }
         })
         return sections
      }
   }

})


/* @json-server start */
fetch(`${config.baseURL}/Packages.json`)
   .then(res => res.json())
   .then(data => {
      store.commit("resetPackages")
      for (const key in data.packages) {
         store.commit("pushPackages", {
            Package: key,
            ...data.packages[key]
         })
      }

      store.commit("setPackagesLength", data.length)
      store.commit("setLastUpdate", data.lastUpdate)
   })
/* @end */


export default store
