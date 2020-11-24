<template>
   <div class="list-item-group$1">
      <h6 class="text-uppercase text-secondary"> {{ title }} </h6>
      <ul class="list-item" :class="classUl">
         <li class="no-skip" v-if="buttonBack">
            <a href="javascript:void(0)" @click="$emit('back'); state = 0">
               <span :style="{ backgroundImage: 'url(' + require('@/assets/back.png') + ')' }"></span>
               <p> Quay lại </p>
            </a>
         </li>
         <li v-for="(item, index) in items" :key="index">
            <a :href="item.href" @click="$emit('click-item', item); state = multiple ? 0 : state">
               <span :style="{ 'background-image': 'url(' + getIcon(item) + ')', width: item.NoIcon ? 0 : undefined }"></span>
               <p :class="{ 'ml-0': item.NoIcon }">
                  {{ item.filterName ? item.filterName(item) : item.Name }}
                  <small v-if="item.Version"> v{{ item.Version[0] }} </small>
               </p>
            </a>
         </li>
         <li class="no-skip" v-if="buttonMore && state < 2">
            <a href="javascript:void(0)" @click="loadMore">
               <span style="width: 0"></span>
               <p class="ml-0">
                  <i class="spinner spinner-border spinner-border-sm" v-show="state == 1"></i>
                  {{ message }}
               </p>
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
         buttonBack: Boolean,
         load: Function,
         classUl: [Array, String, Object],
         multiple: Boolean
      },
      data: () => ({
         message: "Xem them...",
         state: 0
      }),
      watch: {
         items: {
            handler({ length }) {
               if (length < 10 && this.state < 2) {
                  this.loadMore()
               }
            },
            immediate: true
         }
      },
      methods: {
         loadMore() {
            this.message = "Dang tai"
            this.state = 1
            this.load && this.load({
               loaded: () => [this.message, this.state] = ["Xem them...", 0],
               complete: () => [this.message, this.state] = ["Khong con nua", 2]
            })
         },
         getIcon({ Icon, Section }) {
            if (Icon && !Icon.match(/^file:\/\//)) {
               return Icon
            } else {
               try {
                  return require(`@/assets/${encodeURIComponent(Section)}.png`)
               } catch (e) {
                  console.warn("Can't find icon.")
                  return require("@/assets/unknown.png")
               }
            }
         }
      }
   }
</script>
<style lang="scss" scoped>
   .list-item-group\$1 {
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

                  small {
                     display: block;
                  }
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