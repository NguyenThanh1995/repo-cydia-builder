<template>
   <div class="row">
      <!-- /deep -->
      <!-- /open with cydia -->
      <add-repo class="col-12" :package="tweak.package" />
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
         <div class="compatibility border-custom"> {{ verifySupport }} </div>
         <p class="small text-secondary text-center mt-1">
            Current iOS {{ $iOSVersion }}
         </p>
      </div>
      <div class="col-12">
         <div class="my-1 alert alert-danger" v-html="message" v-if="message"></div>
      </div>
      <div class="col-12 mt-2rem">
         <h6 class="text-uppercase text-secondary">Description</h6>
         <div class="my-1 py-3 px-3 bg-white text-pre border-custom" v-html="tweak.Description"></div>
      </div>
      <div class="col-12 mt-2rem package-info">
         <h6 class="text-uppercase text-secondary">Package info</h6>
         <list-item :items="tweakInfo" no-icon use-slot>
            <template #item="{ index, value }">
               <span class="text-capitalize"> {{ index }} </span>
               <a :href="(value | renderValue).email" class="right" v-if="(value | renderValue).email">
                  {{ (value | renderValue).text }}
               </a>
               <span class="right" v-else> {{ value }} </span>
            </template>
         </list-item>
      </div>
      <package-updates class="col-12" size="5" />
      <browser-packages class="col-12" size="5" />
      <social-share class="col-12" />
      <theme-change class="col-12" />
      <copyright class="col-12" />
   </div>
</template>
<style lang="scss" scoped>
   .compatibility {
      height: 2rem;
      line-height: 2rem;
      background-color: #ff0024;
      width: 100%;
      text-align: center;
      font-style: italic;
      border-radius: 4px;
      color: #f8f9fa;

      &.success {
         background-color: #00ff24;
      }

      &.warning {
         background-color: #ffff24;
      }
   }

   .package-info {
      .right {
         flex: {
            basis: 0;
            shrink: 0;
            grow: 1;
         }

         ;
         text-align: right;
         padding-left: 5px;
         display: block;
         word-wrap: break-word;
         color: #777;
         display: block;
         white-space: wrap;
      }
   }
</style>
<script>
   import filesize from "file-size"
   import { format } from "timeago.js"

   import AddRepo from "@/components/AddRepo"
   import PackageUpdates from "@/components/PackageUpdates"
   import BrowserPackages from "@/components/BrowserPackages"
   import SocialShare from "@/components/SocialShare"
   import ThemeChange from "@/components/ThemeChange"
   import Copyright from "@/components/Copyright"
   import ListItem from "@/components/ListItem"

   export default {
      components: {
         AddRepo,
         PackageUpdates,
         BrowserPackages,
         SocialShare,
         ThemeChange,
         Copyright,
         ListItem
      },
      data: () => ({
         verifySupport: "Supported",
         message: "can not find",
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
            const { Name, Package, Author, Version, Section, Depends, Conflicts, Architeture, MD5sum, birthtimeMs, Size, tag, dev } = this.tweak
            return {
               Name,
               Identifier: Package,
               Author,
               Architeture,
               Section,
               Version,
               Depends,
               Conflicts,
               MD5: MD5sum,
               dev,
               tag,
               Size: filesize(Size).human(),
               Updated: format(birthtimeMs - new Date().getTimezoneOffset() * 60 * 1000)
            }
         }
      },
      filters: {
         renderValue(text) {
            text = (text + "").replace(/^\s|\s$/g, "")
            const tmp = text.match(/<([^\s]+)>$/)
            let email = tmp && tmp[1]
            text = text.replace(/<([^\s]+)>$/, "")
            
            if (email.match(/@[\w\d]+$/)) {
               email = `mailto://${email}`
            }

            return {
               text,
               email
            }
         }
      },
      mounted() {
         /*new google.translate.TranslateElement({
            multilanguagePage: true,
            gaTrack: true
         }, "google-translate")*/
      }
   }
</script>