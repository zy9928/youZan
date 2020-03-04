<template>
  <div id="login">
    <Header title="登入" />
    <div class="loginBox">
      <van-field
        class="loginInput"
        v-model="username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
      />

      <van-field
        class="loginInput"
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <p>
        <router-link to="/regiest">
          <van-button type="info">去注册</van-button>
        </router-link>
        <van-button type="primary" @click="goLogin">登入</van-button>
      </p>
    </div>
  </div>
</template>

<script>
import Header from "./../components/Header.vue";
import Vue from "vue";
import { Field } from "vant";
import { Toast } from "vant";

Vue.use(Toast);
Vue.use(Field);
export default {
  data() {
    return {
      username: "",
      password: "",
      from: " 1"
    };
  },
  components: {
    Header
  },
  methods: {
    goLogin() {
      if (!this.username || !this.password) {
        Toast("输入不能为空");
        return;
      }
      localStorage.setItem("isLogin", true);
      localStorage.setItem("id", this.username);
      this.$router.push(this.from);
    }
  },
  beforeRouteEnter(to, from, next) {
    //在这个方法中，不能使用this
    // next参数为函数，就行允许访问，允许进入路由的组件
    next(homeCom => {
      //next参数中可以获得挂载完毕的组件
      console.log("next函数执行了");
      homeCom.from = from.fullPath;
    });
  }
};
</script>

<style scoped>
#login {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #f8f8f8;
  z-index: 50;
  padding-top: 44px;
}
.loginBox {
  width: 80%;
  /* height: 70%; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* border: 1px solid #ccc; */
  padding-bottom: 20px;
}
.loginBox > p {
  display: flex;
  padding-top: 20px;
}
.loginBox > a {
  flex: 1;
  margin: 0 20px;
}
.loginBox > p > button {
  flex: 1;
  margin: 0 0 0 20px;
}
.loginInput {
  margin-top: 20px;
}
</style>