<template>
  <div id="Header" class="borderBottom">
    <router-link to="/" class="backHome">
      <van-icon name="cross" />
    </router-link>
    <span>{{title}}</span>
    <div class="backHome headerMore" @click="wechartShareSHow">
      <van-icon name="share" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
import { Popup } from "vant";

Vue.use(Popup);
Vue.use(Icon);
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    wechartShareSHow() {
      this.$emit("share", true);
    }
  }
};
</script>

<style scoped>
#Header {
  height: 44px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  line-height: 43px;
  background-color: #fff;
}
.backHome {
  height: 44px;
  padding: 0 10px;
  line-height: 52px;
  float: left;
}
.backHome > i {
  font-size: 20px;
  line-height: 20px;
  font-weight: 900;
  position: relative;
}
#Header > span {
  padding-left: 10px;
  border-left: 1px solid #ccc;
}
.headerMore {
  float: right;
}
</style>