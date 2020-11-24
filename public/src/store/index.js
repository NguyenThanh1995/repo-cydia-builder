import Vue from "vue"
import Vuex, { Store } from "vuex"

Vue.use(Vuex)

const store = new Store({
   state: {
      packages: []
	},
   mutations: {
      pushPackages: (state, item) => state.packages.push(item)
	},
   getters: {
      packages: ({ packages }) => packages.sort((a, b) => a.birthtimeMs > b.birthtimeMs),
      sections({ packages }) {
         const sections = {}
		   packages.forEach(item => {
            if ( item.Section in sections ) {
               sections[ item.Section ].push(item)
				} else {
               sections[ item.Section ] = [ item ]
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



for ( const key in data ) {
   store.commit("pushPackages", { Package: key, ...data[ key ] })
}
/* @end */


export default store
