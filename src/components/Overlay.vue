<template>
  <div id="Overlay" @click="close">
    <section class="overCont">
      <slot />
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    close(e) {
      if (
        e.target.id === "Overlay" ||
        e.target.className.indexOf("close") != -1
      ) {
        this.$emit("closeOverlayBox", false);
      }
    }
  }
};
</script>

<style scoped>
#Overlay {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
}
.overCont {
  width: 100vw;
  height: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
</style>