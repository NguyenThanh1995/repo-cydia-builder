<template>
   <list-item-group title="Package updates" :items="packageUpdates" button-more :load="loadMorePackageUpdates" />
</template>
<script>
   import ListItemGroup from "@/components/ListItemGroup.vue"
   export default {
      components: { ListItemGroup },
      data: () => ({
         packageUpdates: []
      }),
      methods: {
         loadMorePackageUpdates({ loaded, complete }) {
            let end = []
            const length = this.packageUpdates.length
            this.packageUpdates.push(...(end = this.$store.getters.packages.slice(length, Math.min(this.$store.getters.packages.length, length + 10))))
            if (end.length) {
               loaded()
            } else {
               complete()
            }
         }
      }
   }
</script>