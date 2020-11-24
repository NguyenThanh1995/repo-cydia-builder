<template>
   <div class="row">
      <add-repo class="col-12" />
      <div class="col-12">
         <div class="text-center py-3 bg-white border-4">
            <b> {{ packagesLength }} </b> gói đã được tải lên.<br>
            Cập nhật gần nhất vào <b> {{ lastUpdate }} </b>
         </div>
      </div>
      <package-updates class="col-12" />
      <browser-packages class="col-12" />
      <social-share class="col-12" />
      <theme-change class="col-12" />
      <copyright class="col-12" />
   </div>
</template>
<script>
   import AddRepo from "@/components/AddRepo.vue"
   import PackageUpdates from "@/components/PackageUpdates.vue"
   import BrowserPackages from "@/components/BrowserPackages.vue"
   import SocialShare from "@/components/SocialShare.vue"
   import ThemeChange from "@/components/ThemeChange.vue"
   import Copyright from "@/components/Copyright.vue"
   
   export default {
      components: {
         AddRepo,
         PackageUpdates,
         BrowserPackages,
         SocialShare,
         ThemeChange,
         Copyright
      },
      data: () => ({
         packagesLength: 0,
         lastUpdate: null
      })
   }
</script>
<style lang="scss" scoped>
   .border-4 {
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, .1);
   }
</style>