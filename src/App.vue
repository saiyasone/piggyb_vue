<template>
<div id="app">
  <Header />
  <div class="container-body">
    <router-view />
  </div>
</div>
</template>

<script>
import Header from "@/layouts/header";
export default {
  components: {
    Header
  },
};
</script>

<style>
@import url("@/assets/css/app.css");
</style>
