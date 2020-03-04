<template>
  <div id="myAddress">
    <Header title="管理收货地址" />
    <span v-show="!list.length" class="addTips">暂无收货地址，请新增</span>
    <router-link :to="`/mine/${id}/myAddress/newAddr`" class="newAddr">
      <van-icon name="add" />新增收货地址
    </router-link>
    <div class="addrBtnChack">
      <van-button plain type="danger" @click="okClc">确定</van-button>
    </div>
    <div class="scrollBox" ref="scrollBox">
      <div class="addrListBox">
        <van-address-list v-model="chosenAddressId" :list="list" @edit="onEdit" @select="onSelect" />
      </div>
    </div>

    <transition name="goNext">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from "./../components/Header.vue";
import Vue from "vue";
import { Icon } from "vant";
import { AddressList } from "vant";

Vue.use(AddressList);
Vue.use(Icon);
export default {
  components: {
    Header
  },
  data() {
    return {
      id: localStorage.id,
      chosenAddressId: "0",
      lastChosenAddressId: "0",
      list: [],
      addrList: []
    };
  },
  methods: {
    okClc() {
      this.$router.back();
    },
    onEdit(item, index) {
      console.log(item);
      this.$router.push(`/mine/${this.id}/myAddress/newAddr/${item.id}`);
    },
    onSelect() {
      this.addrList[this.lastChosenAddressId].isDefault = false;
      this.addrList[this.chosenAddressId].isDefault = true;
      var addrListString = [];
      this.addrList.forEach(item => {
        item = JSON.stringify(item);
        addrListString.push(item);
      });
      localStorage.setItem("addrList", addrListString.join("data-addr-fg"));
      this.lastChosenAddressId = this.chosenAddressId;
      localStorage.setItem("nowAddr", this.chosenAddressId);
      // this.$router.back();
      // history.back();
    }
  },
  mounted() {
    var myScroll = new IScroll(this.$refs.scrollBox, {
      mouseWheel: true,
      scrollbars: false,
      tap: true,
      click: true
    });
    var addrList = localStorage.getItem("addrList").split("data-addr-fg");
    // console.log(addrList);
    addrList.forEach((item, index) => {
      item = JSON.parse(item);
      this.addrList.push(item);
      if (item.isDefault) {
        this.chosenAddressId = index;
        this.lastChosenAddressId = index;
        this.list.unshift({
          id: index,
          name: item.name,
          tel: item.tel,
          address: `${item.country +
            item.province +
            item.city +
            item.county +
            item.addressDetail}`
        });
      } else {
        this.list.push({
          id: index,
          name: item.name,
          tel: item.tel,
          address: `${item.country +
            item.province +
            item.city +
            item.county +
            item.addressDetail}`
        });
      }
    });
    localStorage.setItem("nowAddr", this.chosenAddressId);
  },
  updated: function() {
    var myScroll = new IScroll(this.$refs.scrollBox, {
      mouseWheel: true,
      scrollbars: false,
      tap: true,
      click: true
    });
  }
};
</script>

<style scoped>
#myAddress {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  background-color: #f0f0f2;
  box-sizing: border-box;
  padding-top: 44px;
}
.addTips {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  color: #666;
}
.newAddr {
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 44px;
  width: 100vw;
  background-color: #fff;
  line-height: 44px;
  box-sizing: border-box;
  padding-left: 35px;
}
.newAddr > i {
  position: absolute;
  display: block;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #5677fc;
}
.scrollBox {
  position: absolute;
  top: 88px;
  bottom: 45px;
  width: 100vw;
  overflow: hidden;
}
.van-address-list__add {
  display: none;
}
.van-address-list {
  padding-bottom: 0;
}
.goNext-enter,
.goNext-leave-to {
  transform: translateY(100vh);
}
.goNext-enter-to,
.goNext-leave {
  transform: translateY(0);
}
.goNext-enter-active,
.goNext-leave-active {
  transition: all 0.3s;
}
.addrBtnChack {
  display: flex;
  position: absolute;
  top: 44px;
  left: 0;
  width: 100vw;
  height: 44px;
  z-index: 1;
}
.addrBtnChack > button {
  flex: 1;
}
</style>