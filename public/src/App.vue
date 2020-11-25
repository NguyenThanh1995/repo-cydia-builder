<template>
   <div id="app">
      <div class="container-fluid">
         <router-view />
      </div>
   </div>
</template>
<style lang="scss">
   body {
      background-color: #f5f5fa;

      .title {
         color: rgb(109, 109, 114);
         font-size: 14px;
         font-weight: 400;
         margin-bottom: 5px;
         text-transform: uppercase;
      }

      .border-custom {
         border-radius: 4px;
         border: 1px solid rgba(0, 0, 0, .1);
      }

      .mt-2rem {
         margin-top: 2rem;
      }

      .py-12px {
         padding: {
            top: 12px;
            bottom: 12px;
         }

         ;
      }

      .px-15px {
         padding: {
            left: 15px;
            right: 15px;
         }

         ;
      }
   }
</style>
<style lang="scss" scoped>
   #app {
      font: 14px -apple-system-font, ".Helvetica NeueUI", "Helvetica Neue", sans-serif;
      margin: 20px 0 35px;
   }
</style>
<script>
   import "bootstrap/scss/bootstrap.scss"
   export default {}
</script>