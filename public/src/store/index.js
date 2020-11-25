import Vue from "vue"
import Vuex, { Store } from "vuex"

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
const data = require("@/../../Packages.json")
/*
for ( let index = 0; index < 200; index++ ) {
   data[`git.shin.ytpp.${index}`] = {
     Name: "Youtube++",
     Version: Array(5).fill(1),
     Section: "Tweaks",
     birthtimeMs: Date.now(),
     Icon: require("@/assets/cydia7.png")
	}
}*/



for (const key in data.packages) {
   store.commit("pushPackages", { Package: key, ...data[key] })
}
store.commit("setPackagesLength", data.length)
store.commit("setLastUpdate", data.lastUpdate)
/* @end */


export default store