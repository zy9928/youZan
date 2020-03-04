<template>
  <div id="regiest">
    <Header title="注册" />
    <div class="regiestBox">
      <van-field
        class="regiestInput"
        v-model="username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
      />

      <van-field
        class="regiestInput"
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        class="regiestInput"
        v-model="passwordAgain"
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        required
      />
      <p>
        <router-link to="/login">
          <van-button type="info">去登入</van-button>
        </router-link>
        <van-button type="primary" @click="goregiest">注册</van-button>
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
      passwordAgain: ""
    };
  },
  components: {
    Header
  },
  methods: {
    goregiest() {
      if (!this.username || !this.password) {
        Toast("输入不能为空");
        return;
      }
      if (this.passwordAgain !== this.password) {
        Toast("两次密码必须相同");
        return;
      }
      localStorage.setItem("isLogin", true);
      localStorage.setItem("id", this.username);
      this.$router.push("/mine");
    }
  }
};
</script>

<style scoped>
#regiest {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #f8f8f8;
  z-index: 50;
  padding-top: 44px;
}
.regiestBox {
  width: 80%;
  /* height: 70%; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* border: 1px solid #ccc; */
  padding-bottom: 20px;
}
.regiestBox > p {
  display: flex;
  padding-top: 20px;
}
.regiestBox > a {
  flex: 1;
  margin: 0 20px;
}
.regiestBox > p > button {
  flex: 1;
  margin: 0 0 0 20px;
}
.regiestInput {
  margin-top: 20px;
}
</style>