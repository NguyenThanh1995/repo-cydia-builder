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

      .border-custom {
         border-radius: 4px;
         border: 1px solid rgba(0, 0, 0, .1);
      }

      .mt-2rem {
         margin-top: 2rem;
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