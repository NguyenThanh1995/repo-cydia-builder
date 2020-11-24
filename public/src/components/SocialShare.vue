<template>
   <list-item-group title="Social" :items="$options.social" />
</template>
<script>
   import ListItemGroup from "@/components/ListItemGroup.vue"
   export default {
      components: { ListItemGroup },
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
   }
</script>