<template>
   <div class="row">
      <!-- /deep -->
      <!-- /open with cydia -->
      <add-repo :package="tweak.package" />
      <!-- //open with cydia -->
      <!-- /google translate -->
      <div class="col-12">
         <div id="google-translate" class="text-center">
         </div>
      </div>
      <!--
         //google translate
         /compatibility
      -->
      <div class="col-12">
         <h6 class="text-uppercase text-secondary"> {{ tweak.Name }} </h6>
         <div class="compatibility"> {{ verifySupport }} </div>
         <p class="small text-secondary text-center mt-1">
            Current iOS {{ $iOSVersion }}
         </p>
      </div>
      <div class="col-12">
         <div class="my-1 alert alert-danger" v-html="message" v-if="message"></div>
      </div>
      <div class="col-12">
         <h6 class="text-uppercase text-secondary">Description</h6>
         <div class="my-1 py-3 px-3 bg-white text-pre" v-html="tweak.Description"></div>
      </div>
      <div class="col-12 package-info">
         <h6 class="text-uppercase text-secondary">Package info</h6>
         <ul>
            <li v-for="(item, keyword) in tweakInfo">
               <span class="text-capitalize"> {{ keyword }} </span>
               <span class="right"> {{ item | renderValue || "-" }} </span>
            </li>
         </ul>
      </div>
      <package-updates class="col-12" />
      <browser-packages class="col-12" />
      <social-share class="col-12" />
      <theme-change class="col-12" />
      <copyright class="col-12" />
   </div>
</template>
<style lang="scss" scoped>
   .compatibility {
      height: 2rem;
      line-height: 2rem;
      background: #ff0024;
      width: 100%;
      text-align: center;
      text-transform: italic;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, .1);
   }

   .package-info {
      ul {
         margin: 0;
         padding: 0;
         list-style: none;
         background-color: #fff;

         li {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .right {
               flex: 0 0 1;
               text-align: right;
               padding-left: 5px;
               display: block;
               word-wrap: break-word;
            }
         }
      }
   }
</style>
<script>
   import filesize from "file-size"
   import timeago from "timeago.js"

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
         tweak: {
            "Package": "git.shin.3dtools",
            "Name": "3DTools Cracked",
            "Author": "smokin1337 <smokin1337@gmail.com>",
            "Description": "Add helpful tools to your 3D touch menu!",
            "Version": [{ "v": "1.0.5", "supprt": ">=5" }],
            "Section": "Tweaks",
            "Depends": "mobilesubstrate",
            "Conflicts": "me.pulandres.appaze",
            "Architecture": "iphoneos-arm",
            "Icon": "file:///Library/PreferenceBundles/3DTools.bundle/icon@2x.png",
            "Homepage": "https://nguyenthanh1995.github.io/",
            "Maintainer": "nguyenthanh1995 <thanhnguyennguyen1995@gmail.com>",
            "Sponsor": "nguyenthanh1995 <https://nguyenthanh1995.github.io>",
            "Depiction": "https://nguyenthanh1995.github.io/description.html?goto=git.shin.3dtools",
            "MD5sum": "c0eddaaf6fba2f8b68dd235fb96fe59e",
            "birthtimeMs": 1606112285397.6907,
            "Size": 1205188
         }
      }),
      computed: {
         tweakInfo() {
            return {
               ...this.tweak,
               Size: filesize(this.tweak.Size),
               Updated: timeago(this.tweak.birthtimeMs)
            }
         }
      },
      filters: {
         renderValue(text) {
            text = text.replace(/^\s|\s$/g, "")
            const tmp = text.match(/<(\w+)>$/)
            const email = tmp && tmp[1]
            text = text.replace(/<(\w+)>$/, "")
            
            return {
               text, email
            }
         }
      },
      mounted() {
         new google.translate.TranslateElement({
            multilanguagePage: true,
            gaTrack: true
         }, "google-translate")
      }
   }
</script>