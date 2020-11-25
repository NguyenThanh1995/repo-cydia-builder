<template>
   <div class="row">
      <add-repo class="col-12" />
      <div class="col-12">
         <div class="text-center py-3 bg-white border-custom">
            <b> {{ $store.state.packagesLength }} </b> gói đã được tải lên.<br>
            Cập nhật gần nhất vào <b> {{ new Date($store.state.lastUpdate).toLocaleDateString() }} </b>
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
   import AddRepo from "@/components/AddRepo"
   import PackageUpdates from "@/components/PackageUpdates"
   import BrowserPackages from "@/components/BrowserPackages"
   import SocialShare from "@/components/SocialShare"
   import ThemeChange from "@/components/ThemeChange"
   import Copyright from "@/components/Copyright"

   export default {
      components: {
         AddRepo,
         PackageUpdates,
         BrowserPackages,
         SocialShare,
         ThemeChange,
         Copyright
      }
   }
</script>