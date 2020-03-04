<template>
  <div id="Mine">
    <Header title="我" />
    <main class="Mine">
      <section class="userHeader">
        <span>头像</span>
        <div class="headerImgBox">
          上传头像
          <van-uploader
            v-model="fileList"
            multiple
            class="headerImg"
            :max-count="1"
            preview-size="70px"
            :after-read="afterRead"
          />
          <img v-show="img" :src="img" />
        </div>
      </section>
      <section class="userInfo">
        <li class="name" @click="changeName">
          <span class="nameTitle">昵称</span>
          <span class="nameCont" v-show="isName">{{name}}</span>
          <input
            type="text"
            v-show="!isName"
            v-model="name"
            name="nameChange"
            id="nameChange"
            class="nameChange"
            @blur="changeNameSecc"
          />
        </li>
        <li class="sex name" @click="changeSex">
          <span class="sexTitle nameTitle">性别</span>
          <span class="sexCont nameCont" v-show="isSex">{{sex}}</span>
          <select
            name="sexChange"
            v-show="!isSex"
            id="sexChange"
            class="sexChange nameChange"
            v-model="sex"
            @blur="changeSexSecc"
          >
            <option value="男" name="sexChange">男</option>
            <option value="女" name="sexChange">女</option>
          </select>
        </li>
        <router-link class="address name" :to="`/mine/${id}/myAddress`">
          我的收货地址
          <van-icon name="arrow" />
        </router-link>
      </section>
      <router-link class="userMore" to="/">
        练习客服
        <van-icon name="arrow" />
      </router-link>
      <router-link class="userMore" to="/">
        帮助中心
        <van-icon name="arrow" />
      </router-link>
    </main>
    <transition name="pageTab">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Header from "./../components/Header.vue";
import Vue from "vue";
import { Uploader } from "vant";
import { Icon } from "vant";

Vue.use(Icon);
Vue.use(Uploader);
export default {
  data() {
    return {
      fileList: [
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ],
      name: localStorage.name || "墨小刀",
      sex: localStorage.sex || "女",
      img: localStorage.img || "",
      isName: true,
      isSex: true,
      id: localStorage.id
    };
  },
  components: {
    Header
  },
  methods: {
    changeName() {
      this.isName = false;
    },
    changeNameSecc() {
      this.isName = true;
      if (!localStorage.getItem("name")) {
        localStorage.setItem("name", this.name);
      } else {
        if (localStorage.getItem("name") !== this.name) {
          localStorage.setItem("name", this.name);
        }
      }
    },
    changeSex() {
      this.isSex = false;
    },
    changeSexSecc() {
      this.isSex = true;
      if (!localStorage.getItem("sex")) {
        localStorage.setItem("sex", this.sex);
      } else {
        if (localStorage.getItem("sex") !== this.sex) {
          localStorage.setItem("sex", this.sex);
        }
      }
    },
    afterRead(file) {
      // console.log(file.content);
      if (!localStorage.getItem("img")) {
        localStorage.setItem("img", file.content);
      } else {
        if (localStorage.getItem("img") !== file.content) {
          localStorage.setItem("img", file.content);
        }
      }
      location.reload();
    }
  }
};
</script>

<style scoped>
#Mine {
  position: absolute;
  top: 0;
  bottom: 44px;
  width: 100vw;
  background-color: #f0f0f2;
}
.Mine {
  position: absolute;
  top: 44px;
  bottom: 44px;
  width: 100vw;
}
.userHeader {
  height: 80px;
  background-color: #fff;
  line-height: 80px;
  position: relative;
  margin-bottom: 20px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.userHeader > span {
  font-size: 20px;
  padding-left: 10px;
}
.headerImgBox {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  /* border-radius: 50%; */
  /* overflow: hidden; */
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  overflow: hidden;
  line-height: 70px;
  text-align: center;
  color: #333;
}
.headerImgBox > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 70px;
  height: 70px;
}
.headerImg {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
.userInfo {
  box-sizing: border-box;
  padding-left: 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  margin-bottom: 20px;
}
.userInfo > .name {
  display: block;
  height: 50px;
  position: relative;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
}
.userInfo > .address {
  border-bottom: none;
}
.userInfo > .address > i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.nameCont,
.nameChange {
  display: block;
  width: 100px;
  text-align: center;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 25px;
  line-height: 25px;
  padding: 0;
  margin: 0;
}
.userMore {
  display: block;
  height: 50px;
  position: relative;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  background-color: #fff;
  box-sizing: border-box;
  padding-left: 10px;
  margin-bottom: 20px;
}
.userMore > i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.pageTab-enter,
.pageTab-leave-to {
  transform: translateX(100vw);
}
.pageTab-enter-to,
.pageTab-leave {
  transform: translateX(0);
}
.pageTab-enter-active,
.pageTab-leave-active {
  transition: all 0.3s;
}
</style>