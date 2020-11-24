<template>
   <list-item-group title="Theme" :items="[ { NoIcon: true, Name: 'Change Theme' }]" class-ul="py-0" />
</template>
<script>
   import ListItemGroup from "@/components/ListItemGroup.vue"
   export default {
      components: { ListItemGroup }
   }
</script>