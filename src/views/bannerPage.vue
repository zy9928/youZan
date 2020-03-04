<template>
  <div id="banner">
    <h1>banner{{id}}的对应活动页</h1>
  </div>
</template>

<script>
export default {
  props: {
    id: ""
  }
};
</script>

<style scoped>
#banner {
  position: absolute;
  top: 0;
  bottom: 44px;
  left: 0;
  right: 0;
  background-color: #fff;
}
</style>

