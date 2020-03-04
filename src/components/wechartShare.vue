<template>
  <div id="wechartShare">
    <Overlay @closeOverlayBox="handleCloseOverlay">
      <div class="overContBox">
        <li class="overContLi">
          <van-icon name="good-job-o" />
          <span>有赞精选</span>
        </li>
        <li>分享</li>
        <li>显示在聊天顶部</li>
        <li>添加到桌面</li>
      </div>
    </Overlay>
  </div>
</template>

<script>
import Overlay from "./../components/Overlay.vue";

export default {
  components: {
    Overlay
  },
  methods: {
    handleCloseOverlay(bool) {
      this.$emit("closeOverlay", bool);
    }
  }
};
</script>

<style scoped>
#wechartShare {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
}
.overContBox {
  width: 100vw;
  height: 200px;
  box-sizing: border-box;
  padding: 10px 20px;
}
.overContBox > li {
  padding: 10px 0;
  overflow: hidden;
}
.overContLi > i {
  font-size: 20px;
  color: red;
  float: left;
}
.overContLi > span {
  float: left;
}
</style>