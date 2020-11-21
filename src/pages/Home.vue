<template>
   <div class="row my-3">
      <div class="col-12">
         <h6 class="text-uppercase text-secondary"> Nguyenthanh Repo </h6>
         <ul class="bg-white" v-if="!$inCydia">
            <li>
               <a href="cydia://url/https://cydia.saurik.com/api/share#?source=https://nguyenthanh1995.github.io/">
                  <span class="logo-cydia"></span>
                  <label>Open Cydia</label>
               </a>
            </li>
         </ul>
         <p class="small text-center text-secondary">Repo: https://nguyenthanh1995.github.io/</p>
      </div>
      <div class="col-12">
         <div class="text-center py-3 bg-white">
            <b> {{ packagesLength }} </b> gói đã được tải lên.<br>
            Cập nhật gần nhất vào <b> {{ lastUpdate }} </b>
         </div>
      </div>
      <div class="col-12">
         <h6 class="text-uppercase text-secondary">Package updates</h6>
         <ul class="bg-white mb-0 list-item">
            <li v-for="item in packageUpdates">
               <p>
                  <a href="#">
                     <span :style="{ 'background-image': 'url(' + item.icon + ')' }"></span>
                     <label> {{ item.name }} </label>
                  </a>
               </p>
            </li>
         </ul>
         <div class="load-more text-right">
            <button> Thêm </button>
         </div>
      </div>
      <div class="col-12">
         <h6 class="text-uppercase text-secondary">Browser packages</h6>
         <ul class="bg-white mb-0 list-item">
            <li v-for="item in packageUpdates">
               <p>
                  <a href="#">
                     <span :style="{ 'background-image': 'url(' + item.icon + ')' }"></span>
                     <label> {{ item.name }} </label>
                  </a>
               </p>
            </li>
         </ul>
         <div class="load-more text-right">
            <button> Thêm </button>
         </div>
      </div>
      <div class="col-12">
         <h6 class="text-uppercase text-secondary">Social</h6>
         <ul class="bg-white list-item">
            <li>
               <a href="https://github.com/nguyenthanh1995" target="_blank">
                  <span :style="{ backgroundImage: 'url(' + require('@/assets/github.png') + ')' }">×</span>
                  <label>GitHub</label>
               </a>
            </li>
            <li>
               <a href="https://twitter.com/NguyenThanhDev" target="_blank">
                  <span :style="{ backgroundImage: 'url(' + require('@/assets/github.png') + ')' }">×</span>
                  <label>Follow NguyenThanhDev</label>
               </a>
            </li>
         </ul>
      </div>
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
         packageUpdates: [{ name: "Tweak mới", icon: "" }]
      })
   }
</script>
<style lang="scss" scoped>
   .logo-cydia {
      width: 2em;
      height: 2em;
      border-radius: 20%;
      display: inline-block;

      background: {
         image: url("~@/assets/cydia7.png");
         repeat: no-repeat;
         position: center;
         size: 100%;
      }

      ;
   }

   .list-item {
      margin: 5px 0 35px;
      list-style: none;

      li {
         margin-left: 15px;
         margin-bottom: -1px;
         padding: 12px 15px 12px 0;

         &:first-child p {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
         }

         &:last-child p {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
         }

         p {
            padding: 12px 15px;
            margin: -12px -15px;

            &:after {
               content: "";
               display: block;
               background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NSIgaGVpZ2h0PSI5OSI+PHBvbHlnb24gcG9pbnRzPSIzNC43LDQ5LjcgMCw4NC40IDE1LjEsOTkuNSA2NC44LDQ5LjcgNDkuNywzNC43IDE1LjEsMCAwLDE1LjEiIHN0eWxlPSJmaWxsOiNjN2M3Y2MiLz48L3N2Zz4=);
               position: absolute;
               top: 50%;
               left: 95%;
               transform: translate(-100%, -50%);
               width: 10px;
               height: 13px;
               background-size: 100% 100%;
            }

            position: relative;

            overflow: hidden;

            span {
               @extend .logo-cydia;
               background-image: url("@/assets/unknown.png");
            }

            label {
               white-space: nowrap;
            }
         }
      }
   }
</style>