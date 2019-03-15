<template>
  <div id="app">
    <default />
  </div>
</template>

<script>
import Default from "./components/Default.vue";

export default {
  name: "app",
  components: {
    Default
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100% !important;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
