<template>
   <div>
      <h6 class="text-uppercase text-secondary"> {{ title }} </h6>
      <ul class="list-item">
         <li class="no-skip" v-if="buttonBack">
            <a href="#">
               <span :style="{ backgroundImage: 'url(' + require('@/assets/back.png') + ')'"></span>
               <p class="ml-0"> Quay lại </p>
            </a>
         </li>
         <li v-for="item in items">
            <a :href="item.href">
               <span :style="{ 'background-image': 'url(' + getIcon(item) + ')' }"></span>
               <p> {{ item.Name }} </p>
            </a>
         </li>
         <li class="no-skip" v-if="buttonMore">
            <a href="#">
               <span style="width: 0"></span>
               <p class="ml-0"> Xem thêm... </p>
            </a>
         </li>
      </ul>
      <slot name="default" />
   </div>
</template>
<script>
   export default {
      props: {
         title: {
            type: String,
            required: true
         },
         items: {
            type: Array,
            requred: true
         },
         buttonMore: Boolean,
         buttonBack: Boolean
      },
      methods: {
         getIcon({ Icon, Section }) {
            if (Icon) {
               return Icon
            } else {
               return require(`@/assets/${encodeURIComponent(Section)}.png`)
            }
         }
      }
   }
</script>
<style lang="scss" scoped>
   :host {
      %border-4 {
         border-radius: 4px;
         border: 1px solid rgba(0, 0, 0, .1);
      }

      margin-top: 2rem;


      %logo-cydia {
         width: 2em;
         height: 2em;
         border-radius: 20%;
         display: inline-block;

         background: {
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
         @extend %border-4;

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

               span {
                  @extend %logo-cydia;
                  background-image: url("~@/assets/unknown.png");
               }

               p {
                  white-space: nowrap;
                  margin: 0 0 0 15px;
                  padding: 0;
                  display: inline-block;
                  overflow: hidden;
                  text-overflow: ellipsis;
               }
            }

            &:last-child a:before {
               display: none
            }

            &.no-skip a:after {
               display: none
            }
         }
      }
   }
</style>