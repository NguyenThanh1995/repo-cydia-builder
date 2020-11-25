import Vue from "vue"
import Vuex, { Store } from "vuex"
import config from "@/config"

Vue.use(Vuex)

const store = new Store({
   state: {
      packages: [],
      packagesLength: 0,
      lastUpdate: NaN
   },
   mutations: {
      pushPackages: (state, item) => state.packages.push(item),
      setPackagesLength: (state, length) => state.packagesLength = length,
      setLastUpdate: (state, val) => state.lastUpdate = val
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
for (const key in data.packages) {
   store.commit("pushPackages", { Package: key, ...data[key] })
}
store.commit("setPackagesLength", data.length)
store.commit("setLastUpdate", data.lastUpdate)
})

/* @end */


export default store
