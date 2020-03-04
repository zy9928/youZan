<template>
  <div id="app">
    <!-- <transition name="navPageTab"> -->
    <router-view />
    <!-- </transition> -->
    <nav-bar v-model="pageIndex"></nav-bar>
  </div>
</template>

<script>
import navBar from "./components/nav-bar.vue";
export default {
  data() {
    return {
      pageIndex: "0"
    };
  },
  components: {
    "nav-bar": navBar
  }
};
</script>

<style>
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.navPageTab-enter,
.navPageTab-leave-to {
  transform: scale(0);
}
.navPageTab-enter-to,
.navPageTab-leave {
  transform: scale(1);
}
.navPageTab-enter-active,
.navPageTab-leave-active {
  transition: all 0.3s;
}
</style>
