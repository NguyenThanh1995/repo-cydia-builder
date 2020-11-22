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
      <list-item-group class="col-12" title="Package updates" :items="packageUpdates" button-more />
      <list-item-group class="col-12" title="Browser packages" :items="packageUpdates" button-more />
      <list-item-group class="col-12" title="Social" :items="social" button-more />
      <div class="col-12">
         <p class="small text-center text-secondary">
            Nguyen Thanh (shin-dev) © 2020
         </p>
      </div>
   </div>
</template>
<script>
   export default {
      data: () => ({
         packagesLength: 0,
         lastUpdate: null,
         packageUpdates: new Array(10).fill({ name: "Tweak mới", icon: "" }),

         social: [
            {
               Icon: require('@/assets/github.png'),
               Name: "Github",
               href: "#"
            },
            {
               Icon: require('@/assets/github.png'),
               Name: "Follow NguyenThanhDev",
               href: "#"
            }
         ]
      })
   }
</script>
<style lang="scss" scoped>
   .border-4 {
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, .1);
   }
</style>