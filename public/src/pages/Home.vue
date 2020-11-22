<template>
   <div class="row">
      <div class="col-12">
         <h6 class="text-uppercase text-secondary"> Nguyenthanh Repo </h6>
         <ul class="list-item" v-if="!$inCydia">
            <li>
               <a href="cydia://url/https://cydia.saurik.com/api/share#?source=https://nguyenthanh1995.github.io/">
                  <span class="logo-cydia default"></span>
                  <p>Open Cydia</p>
               </a>
            </li>
         </ul>
         <p class="small text-center text-secondary mt-2">Repo: https://nguyenthanh1995.github.io/</p>
      </div>
      <div class="col-12">
         <div class="text-center py-3 bg-white border-4">
            <b> {{ packagesLength }} </b> gói đã được tải lên.<br>
            Cập nhật gần nhất vào <b> {{ lastUpdate }} </b>
         </div>
      </div>
      <div class="col-12">
         <h6 class="text-uppercase text-secondary">Package updates</h6>
         <ul class="list-item">
            <li v-for="item in packageUpdates">
                  <a href="#">
                     <span :style="{ 'background-image': 'url(' + require('@/assets/cydia7.png') + ')' }"></span>
                     <p> {{ item.name }} </p>
                  </a>
            </li>
				<li class="no-skip">
               <a href="#">
					   <span style="width: 0"></span>
                  <p class="ml-0"> Xem them... </p>
					</a>
				</li>
         </ul>
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
         packageUpdates: new Array(10).fill({ name: "Tweak mới", icon: "" })
      })
   }
</script>
<style lang="scss" scoped>
.border-4 {
   border-radius: 4px;
	border: 1px solid rgba(0, 0, 0, .1);
}
   .row {
      & > .col-12 {
         margin-top: 2rem;
		}
	}
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
      margin: 5px 0;
      padding: 6px 0;
      list-style: none;
		background-color: #fff;
		@extend .border-4;

      li {
		margin: 0;
		padding: 0;
		a {
         //margin-left: 15px;
         //padding: 12px 15px;
			padding: 6px 15px;

         &:first-child {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
         }

         &:last-child {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
         }
			
              text-decoration: none;
				  color: rgb(102, 128, 249);
		        display: block;
              &:hover {
                 background-color: rgb(217, 217, 217);
              }
            &:after {
               content: "";
               display: block;
               background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NSIgaGVpZ2h0PSI5OSI+PHBvbHlnb24gcG9pbnRzPSIzNC43LDQ5LjcgMCw4NC40IDE1LjEsOTkuNSA2NC44LDQ5LjcgNDkuNywzNC43IDE1LjEsMCAwLDE1LjEiIHN0eWxlPSJmaWxsOiNjN2M3Y2MiLz48L3N2Zz4=);
               position: absolute;
               top: 50%;
               right: 0;
               transform: translate(-100%, -50%);
               width: 10px;
               height: 13px;
               background-size: 100% 100%;
            
				}

            position: relative;
            overflow: hidden;
				vertical-align: middle;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				&:before {
				   content: "";
					position: absolute;
					height: 1px;
					width: 100%;
					bottom: 0;
					left: (2em + 30 / 16);
					background-color: #c8c7cc;
				}

            span:not(.default) {
               @extend .logo-cydia;
               background-image: url("~@/assets/unknown.png");
            }

            p {
               white-space: nowrap;
					margin: 0 0 0 15px;
					padding: 0;
					display: inline-block;
					overflow:hidden;
					text-overflow:ellipsis;
            }
         }
			&:last-child a:before { display: none }
			&.no-skip a:after { display: none }
      }
   }
</style>
