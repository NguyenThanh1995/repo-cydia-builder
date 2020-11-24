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
  }
</style>
<style lang="scss" scoped>
   #app {
		font: 14px -apple-system-font, ".Helveti    ca NeueUI", "Helvetica Neue", sans-serif;
		margin: 20px 0 35px;
	}
</style>
<script>
   import "bootstrap/scss/bootstrap.scss"
	export default {}
</script>
