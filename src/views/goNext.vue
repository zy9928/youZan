<template>
  <div class="goNextPage">
    <Header title="等待买家付款" />
    <div class="scrollBox" ref="scrollBox">
      <div class="goNextBox">
        <section class="address">
          <div class="nowAddr">
            <p>{{addrInfo.name}} {{addrInfo.tel}}</p>
            <p>收货地址：{{addrInfo.country}}{{addrInfo.province}}{{addrInfo.city}}{{addrInfo.county}}</p>
            <router-link :to="`/mine/${userId}/myAddress/newAddr/${addrId}`">
              <van-icon name="edit" />
            </router-link>
          </div>
          <router-link class="checkAddr" :to="`/mine/${userId}/myAddress`">选择收货地址</router-link>
        </section>
        <section class="shopInfoBox">
          <li class="title">墨刀小集市</li>
          <li class="shopInfoCont">
            <div class="shopImg">
              <img v-lazy="shopImg" />
            </div>
            <div class="shopInfo">
              <h4 class="shopTitle">{{shopName}}</h4>
              <p class="shopKind">{{shopInfo}}</p>
            </div>
            <div class="money">
              <span class="value">￥ {{maney}}</span>
              <span class="sum">x {{num}}</span>
            </div>
          </li>
          <li class="run">
            <span>配送方式</span>
            <p class="runTest">
              <span>免运费</span>
              <span>快递发货</span>
            </p>
          </li>
          <li class="inputSpeak">
            <span>买家留言：</span>
            <input type="text" v-model="speak" placeholder="点击给卖家留言" />
          </li>
          <li class="tipBy">
            <span>短息通知收件人</span>
            <van-switch
              class="onOff"
              v-model="checked"
              active-color="#07c160"
              inactive-color="#ee0a24"
            />
          </li>
        </section>
      </div>
    </div>
    <van-submit-bar :price="allMoney" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
const axios = require("axios");
import Header from "./../components/Header.vue";
import Vue from "vue";
import { SubmitBar } from "vant";
import { Icon } from "vant";
import { Lazyload } from "vant";
import { Switch } from "vant";

Vue.use(Switch);
// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Icon);
Vue.use(SubmitBar);

export default {
  props: ["id"],
  data() {
    return {
      userId: "",
      addrId: "",
      addrInfo: {},
      num: "",
      kind: [],
      skuSpecList: [],
      shopImg: "",
      shopName: "",
      maney: "",
      speak: "",
      checked: true
    };
  },
  computed: {
    allMoney() {
      return Number(this.maney) * Number(this.num) * 100;
    },
    shopInfo() {
      // 获取配置信息
      var str = " ";
      this.skuSpecList.forEach(item => {
        this.kind.forEach(num => {
          if (item.id == num.kindTitle) {
            item.skuSpecValueList.forEach(value => {
              if (value.id == num.value) {
                str += value.value + " ";
              }
            });
          }
        });
      });
      return str;
    }
  },
  components: {
    Header
  },
  methods: {
    onSubmit() {
      var info = {
        shopId: this.id,
        num: this.num,
        shopKind: this.shopInfo,
        shopName: this.shopName,
        pic: this.shopImg,
        money: this.maney,
        isPay: false,
        dianpuId: String(this.id) + String(localStorage.id)
      };
      if (!localStorage.getItem("shopbuyList")) {
        info = JSON.stringify(info);
        localStorage.setItem("shopbuyList", info);
        this.$router.push(`/order/${localStorage.id}`);
        return;
      }
      var str = localStorage.getItem("shopbuyList");
      str = str.split("shop-bug-fg");
      var arr = [];
      var isCF = false;
      str.forEach(item => {
        item = JSON.parse(item);
        if (item.shopId === info.shopId && item.shopKind === info.shopKind) {
          item.num = Number(item.num) + Number(info.num);
          isCF = true;
        }
        arr.push(item);
      });
      if (!isCF) {
        arr.push(info);
      }
      var result = [];
      arr.forEach(item => {
        result.push(JSON.stringify(item));
      });
      result = result.join("shop-bug-fg");
      localStorage.setItem("shopbuyList", result);
      this.$router.push(`/order/${localStorage.id}`);
    },
    async getShopeCont(id) {
      try {
        const response = await axios.get(
          `http://www.littleemmayang.com:8000/api/item/detail?id=${id}`
        );
        this.skuSpecList = response.data.data.skuSpecList;
        this.shopImg = response.data.data.listPicUrl;
        this.shopName = response.data.data.name;
        this.maney = response.data.data.retailPrice;
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted: function() {
    this.getShopeCont(this.id);

    // 获取地址信息
    this.addrId = localStorage.getItem("nowAddr");
    var addrInfo = localStorage.getItem("addrList").split("data-addr-fg")[
      this.addrId
    ];
    this.addrInfo = JSON.parse(addrInfo);

    // 解析地址栏
    this.num = this.$route.fullPath
      .split("?")[1]
      .split("&")[0]
      .split("=")[1];
    var kind = this.$route.fullPath
      .split("?")[1]
      .split("&")[1]
      .split("=")[1]
      .split(",");
    kind.forEach(item => {
      this.kind.push({
        kindTitle: item.split("-")[0],
        value: item.split("-")[1]
      });
    });

    this.userId = localStorage.getItem("id");

    var myScroll = new IScroll(this.$refs.scrollBox, {
      mouseWheel: true,
      scrollbars: true,
      tap: true,
      click: true
    });
  },
  updated: function() {
    var myScroll = new IScroll(this.$refs.scrollBox, {
      mouseWheel: true,
      scrollbars: false,
      tap: true,
      click: true
    });
  },
  beforeUpdate: function() {
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
.goNextPage {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #f0f0f2;
}
.scrollBox {
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 50px;
}
.address {
  width: 100vw;
  background-color: #fff;
  margin-bottom: 20px;
}
.checkAddr {
  display: block;
  height: 44px;
  text-align: center;
  line-height: 44px;
  border-top: 1px solid #ccc;
  color: #666;
}
.nowAddr {
  position: relative;
  box-sizing: border-box;
  padding: 10px 0 10px 30px;
}
.nowAddr > p {
  line-height: 30px;
  font-size: 16px;
  color: #666;
}
.nowAddr > a {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #ee0a24;
  font-size: 25px;
}
.shopInfoBox {
  width: 100vw;
  background-color: #fff;
}
.title {
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  padding-left: 20px;
}
.shopInfoCont {
  background-color: #f0f0f2;
  display: flex;
  padding: 10px 0;
}
.shopImg {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shopImg > img {
  width: 90%;
  height: 90%;
}
.shopInfo {
  flex: 3;
}
.shopTitle {
  font-size: 14px;
  line-height: 25px;
  font-weight: bold;
}
.shopKind {
  font-size: 12px;
  line-height: 20px;
  color: #666;
}
.money {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.money > div {
  display: block;
}
.money > .value {
  color: #ee0a24;
}
.money > .sum {
  color: #666;
}
.run {
  padding: 10px 10px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  box-sizing: border-box;
}
.run > span {
  color: #555;
}
.runTest {
  float: right;
  height: 50px;
}
.runTest > span {
  display: block;
  color: #555;
}
.inputSpeak {
  padding: 10px;
  box-sizing: border-box;
  width: 100vw;
  color: #555;
}
.inputSpeak > input {
  border: none;
}
.tipBy {
  padding: 10px;
  box-sizing: border-box;
  width: 100vw;
  color: #555;
  height: 70px;
  line-height: 50px;
  position: relative;
  border-top: 1px solid #ccc;
}
.onOff {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
</style>