<template>
   <list-item-group title="Nguyenthanh Repo" :items="[{ Icon: require('@/assets/cydia7.png'), Name: 'Open Cydia', href: '#' }]">
      <p class="small text-center text-secondary mt-2">Repo: https://nguyenthanh1995.github.io/</p>
   </list-item-group>
</template>
<script>
   import ListItemGroup from "@/components/ListItemGroup.vue"
   export default {
      components: { ListItemGroup },
      props: {
         package: String
      }
   }
</script>