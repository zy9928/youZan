<template>
  <nav id="navBar" class="borderTop">
    <router-link v-for="(item, key) in navBarLi" :to="item.path" :key="key" class="navBarBtn">
      <van-icon :name="item.ico" />
      <span>{{item.title}}</span>
    </router-link>
  </nav>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
import { Button } from "vant";

Vue.use(Button);
Vue.use(Icon);
// var idLast = "0";
export default {
  data() {
    return {
      navBarLi: [
        { id: "0", ico: "good-job-o", title: "发现", path: "/home" },
        {
          id: "1",
          ico: "balance-list-o",
          title: "订单",
          path: `/order/${localStorage.id}`
        },
        {
          id: "2",
          ico: "friends-o",
          title: "我",
          path: `/mine/${localStorage.id}`
        }
      ]
    };
  }
};
</script>

<style scoped>
#navBar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 44px;
  width: 100vw;
  display: flex;
}
.navBarBtn {
  flex: 1;
  color: #444444;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.navBarBtn > i {
  font-size: 24px;
}
/* .navBarBtnActive{
  color: #F5053D;
} */
.router-link-active {
  color: #f5053d;
}
</style>