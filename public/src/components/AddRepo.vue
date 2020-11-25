<template>
   <list-item-group :title="$config.Repo.Name" :items="[{ Icon: require('@/assets/cydia7.png'), Name: 'Open Cydia', href: package ? 'cydia://url/https://cydia.saurik.com/api/share#?source=' + $config.Repo.url + '&package=' + package : 'cydia://url/https://cydia.saurik.com/api/share#?source=' + $config.Repo.url }]">
      <p class="small text-center text-secondary mt-2">Repo: {{ $config.Repo.url }} </p>
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