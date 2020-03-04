<template>
  <div class="newAddrPage">
    <Header :title="title" />
    <van-address-edit
      :area-list="areaList"
      :address-info="oldAddr"
      show-postal
      :show-delete="!!addrId"
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import Header from "./../components/Header.vue";
import areaList from "./../store/city.js";
import Vue from "vue";
import { AddressEdit } from "vant";
import { Toast } from "vant";

Vue.use(Toast);
Vue.use(AddressEdit);
export default {
  props: ["id", "addrId"],
  computed: {
    title() {
      if (this.addrId) {
        return "修改地址";
      } else {
        return "新建收货地址";
      }
    }
  },
  components: {
    Header
  },
  data() {
    return {
      areaList,
      searchResult: [],
      oldAddr: {}
    };
  },
  methods: {
    onSave(obj) {
      // console.log(obj);
      if (!this.addrId) {
        if (!localStorage.addrList) {
          localStorage.setItem("addrList", JSON.stringify(obj));
          // localStorage.setItem("addrList", ["地址"]);
          Toast("save");
          return;
        }
        var addrList = localStorage.addrList;
        addrList = addrList + "data-addr-fg" + JSON.stringify(obj);
        localStorage.setItem("addrList", addrList);
        // console.log(addrList.split("data-addr-fg"));
      } else {
        var addrList = localStorage.getItem("addrList").split("data-addr-fg");
        addrList[this.addrId] = JSON.stringify(obj);
        localStorage.setItem("addrList", addrList.join("data-addr-fg"));
      }
      Toast("save");
      this.$router.back();
    },
    onDelete() {
      var addrList = localStorage.getItem("addrList").split("data-addr-fg");
      addrList.splice(this.addrId, 1);
      localStorage.setItem("addrList", addrList.join("data-addr-fg"));
      Toast("delete");
      this.$router.back();
    },
    onChangeDetail(val) {
      if ((val = "黄")) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  },
  mounted() {
    var addrList = localStorage.getItem("addrList").split("data-addr-fg");
    if (this.addrId) {
      this.oldAddr = JSON.parse(addrList[this.addrId]);
    }
  }
};
</script>

<style scoped>
.newAddrPage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f2;
  z-index: 100;
  box-sizing: border-box;
  padding-top: 44px;
}
</style>