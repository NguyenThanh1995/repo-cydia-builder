<template>
   <list-item-group title="Browser packages" :items="browserPackages" button-more :load="loadMoreBrowserPackages" :button-back="!!inModePackage" @back="changeModePackage(false)" @click-item="changeModePackage($event)" multiple />
</template>
<script>
   import ListItemGroup from "@/components/ListItemGroup.vue"
   export default {
      components: { ListItemGroup },
      data: () => ({
         browserPackages: [],
         inModePackage: false
      }),
      methods: {
         loadMoreBrowserPackages({ loaded, complete }) {
            let items = []
            if (this.inModePackage) {
               // in mode read all packages
               items = this.$store.getters.sections[this.inModePackage.Name] || []
            } else {
               // in mode read type packages
               const nameSections = Object.keys(this.$store.getters.sections)
               items = nameSections.map(section => {
                  let icon
                  try {
                     icon = require(`@/assets/${encodeURIComponent(section)}.png`)
                  } catch (e) {
                     icon = require("@/assets/unknown.png")
                  }

                  return { Name: section, filterName: () => `${section} (${this.$store.getters.sections[section].length})`, Icon: icon, href: "javascript:void(0)" }
               })
            }

            let end = []
            const length = this.browserPackages.length

            this.browserPackages.push(...(end = items.slice(length, Math.min(items.length, length + 10))))

            if (end.length) {
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