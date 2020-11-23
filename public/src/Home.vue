<template>
   <div class="row">
      <list-item-group class="col-12" title="Nguyenthanh Repo" :items="[{ Icon: require('@/assets/cydia7.png'), Name: 'Open Cydia', href: '#' }]">
         <p class="small text-center text-secondary mt-2">Repo: https://nguyenthanh1995.github.io/</p>
      </list-item-group>
      <div class="col-12">
         <div class="text-center py-3 bg-white border-4">
            <b> {{ packagesLength }} </b> gói đã được tải lên.<br>
            Cập nhật gần nhất vào <b> {{ lastUpdate }} </b>
         </div>
      </div>
      <list-item-group class="col-12" title="Package updates" :items="packageUpdates" button-more :load="loadMorePackageUpdates" />
      <list-item-group class="col-12" title="Browser packages" :items="browserPackages" button-more :load="loadMoreBrowserPackages" :button-back="!!inModePackage" @back="changeModePackage(false)" @click-item="changeModePackage($event)"/>
      <list-item-group class="col-12" title="Social" :items="social" />
		<list-item-group class="col-12" title="Theme" :items="[ { NoIcon: true, Name: 'Change Theme' }]" class-ul="py-0" />
      <div class="col-12">
         <p class="small text-center text-secondary">
            Nguyen Thanh (shin-dev) © 2020
         </p>
      </div>
   </div>
</template>
<script>
   import ListItemGroup from "@/components/ListItemGroup.vue"
   export default {
	   components: { ListItemGroup },
      data: () => ({
         packagesLength: 0,
         lastUpdate: null,
         packageUpdates: [],
			browserPackages: [],
			inModePackage: false,

         social: [
            {
               Icon: require('@/assets/github.png'),
               Name: "Github",
               href: "#"
            },
				{
               Icon: require("@/assets/reddit.png"),
					Name: "Reddit",
					href: "#"
				},
            {
               Icon: require('@/assets/twitter.png'),
               Name: "Follow NguyenThanhDev",
               href: "#"
            }
         ]
      }),
		methods: {
         loadMorePackageUpdates({ loaded, complete }) {
		      let end = []
				const length = this.packageUpdates.length
            this.packageUpdates.push(...(end = this.$store.state.packages.slice(length, Math.min(this.$store.state.packages.length, length + 20))))
				if ( end.length ) {
               loaded()
				} else {
               complete()
				}
			},
			loadMoreBrowserPackages({ loaded, complete }) {
			   let items = []
            if ( this.inModePackage ) {
               // in mode read all packages
					items = this.$store.getters.sections[ this.inModePackage.Name ] || []
				} else {
               // in mode read type packages
					const nameSections = Object.keys(this.$store.getters.sections)
					items = nameSections.map(section => {
					   let icon
                  try {
                     icon = require(`@/assets/${encodeURIComponent(section)}.png`)
						} catch(e) {
                     icon = require("@/assets/unknown.png")
						}

						return { Name: section, filterName: () => `${section} (${this.$store.getters.sections[section].length})`, Icon: icon, href: "javascript:void(0)" }
					})
				}
				
				let end = []
				const length = this.browserPackages.length

            this.browserPackages.push( ...(end = items.slice(length, Math.min(items.length, length + 20))))

				if ( end.length ) {
               loaded()
				} else {
				   complete()
		      }
			},
			changeModePackage(item) {
            this.inModePackage = item
				this.browserPackages = []
			}
		}
   }
</script>
<style lang="scss" scoped>
   .border-4 {
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, .1);
   }
</style>
