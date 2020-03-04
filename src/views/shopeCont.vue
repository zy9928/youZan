<template>
  <div id="shopeCont">
    <Overlay v-if="isShow" @closeOverlayBox="handleCloseOverlayBox">
      <ul class="shopChangeBox">
        <li class="shopInfoBox">
          <img v-lazy="shopImg" />
          <h6>{{shopName}}</h6>
          <p>￥{{maney}}</p>
        </li>
        <li v-for="(kind, key) in skuSpecList" :key="key">
          <p class="kindTitle">请选择{{kind.name}}</p>
          <p class="kindContBox">
            <span
              class="kindCont"
              v-for="(value, valueKey) in kind.skuSpecValueList"
              :key="valueKey"
              @click="activeValue(kind.id, value.id, value.picUrl)"
              :ref="`styleActVal${kind.id}${value.id}`"
            >
              <img v-if="value.picUrl" v-lazy="value.picUrl" />
              {{value.value}}
            </span>
          </p>
        </li>
        <li class="numberCheckBox">
          <span>购买数量：{{num}}</span>
          <van-stepper v-model="num" class="numberCheck" />
        </li>
        <div class="goShop alignCenter goNext close" @click="goNext">下一步</div>
      </ul>
    </Overlay>
    <Header title="有赞精选" />
    <van-loading color="#1989fa" v-if="!bannerList.detailHtml" class="pageLoading" />
    <div class="scrollBox" ref="scrollBox">
      <div class="shopContBox">
        <antoPage :shopHtml="bannerList.detailHtml"></antoPage>
      </div>
    </div>
    <div class="goShop alignCenter" @click="goShopping(id)">立即购买</div>
    <transition name="goNext">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
const axios = require("axios");
import Header from "./../components/Header.vue";
import antoPage from "./../components/antoPage.vue";
import Overlay from "./../components/Overlay.vue";
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Loading } from "vant";
import { Lazyload } from "vant";
import { Stepper } from "vant";
import { Toast } from "vant";

Vue.use(Toast);
Vue.use(Stepper);
// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Loading);
Vue.use(Swipe).use(SwipeItem);
export default {
  data() {
    return {
      activeCont: {},
      bannerList: {},
      isShow: false,
      shopImg: "",
      shopName: "",
      maney: "",
      num: 1,
      skuSpecList: [],
      checkResult: {}
    };
  },
  props: {
    id: ""
  },
  components: {
    Header,
    antoPage,
    Overlay
  },
  methods: {
    async getShopeCont(id) {
      try {
        const response = await axios.get(
          `http://www.littleemmayang.com:8000/api/item/detail?id=${id}`
        );
        this.activeCont = response.data.data.detailPromBanner;
        this.bannerList = response.data.data.itemDetail;
        this.shopImg = response.data.data.listPicUrl;
        this.shopName = response.data.data.name;
        this.maney = response.data.data.retailPrice;
        this.skuSpecList = response.data.data.skuSpecList;
        // console.log(response.data.data.skuSpecList);
      } catch (error) {
        console.error(error);
      }
    },
    goShopping(id) {
      if (!localStorage.getItem("isLogin")) {
        this.$router.push("/login");
        return;
      }
      this.isShow = true;
    },
    handleCloseOverlayBox(bool) {
      this.isShow = bool;
    },
    activeValue(kindId, valueId, pic) {
      if (pic) {
        this.shopImg = pic;
      }
      if (!this.checkResult[kindId]) {
        this.checkResult[kindId] = valueId;
        // console.log(this.$refs[`styleActVal${kindId}${valueId}`]);
        this.$refs[`styleActVal${kindId}${valueId}`][0].style.background =
          "#F5053D";
        this.$refs[`styleActVal${kindId}${valueId}`][0].style.color = "#fff";
        // console.log(this.checkResult[kindId]);
      } else {
        // console.log(this.$refs[`styleActVal${kindId}${valueId}`]);
        this.$refs[
          `styleActVal${kindId}${this.checkResult[kindId]}`
        ][0].style.background = "";
        this.$refs[
          `styleActVal${kindId}${this.checkResult[kindId]}`
        ][0].style.color = "";
        if (this.checkResult[kindId] === valueId) {
          this.checkResult[kindId] = "";
        } else {
          this.checkResult[kindId] = valueId;
          this.$refs[`styleActVal${kindId}${valueId}`][0].style.background =
            "#F5053D";
          this.$refs[`styleActVal${kindId}${valueId}`][0].style.color = "#fff";
        }
      }
    },
    goNext() {
      if (this.skuSpecList.length != Object.entries(this.checkResult).length) {
        Toast("请添加商品属性,1");
        return;
      } else {
        var noVlue = false;
        Object.entries(this.checkResult).forEach(item => {
          if (item[1] == "") {
            noVlue = true;
          }
        });
        if (noVlue) {
          Toast("请添加商品属性,2");
          return;
        }
      }
      var arr = [];
      Object.entries(this.checkResult).forEach(item => {
        arr.push(item.join("-"));
      });
      arr = arr.join(",");
      this.$router.push(
        `/home/shopeCont/${this.id}/goNext?num=${this.num}&kind=${arr}`
      );
    }
  },
  created: function() {
    this.getShopeCont(this.id).then(() => {
      var myScroll = new IScroll(this.$refs.scrollBox, {
        mouseWheel: true,
        scrollbars: false,
        tap: true,
        click: true
      });
    });
  },
  mounted: function() {
    var myScroll = new IScroll(this.$refs.scrollBox, {
      mouseWheel: true,
      scrollbars: false,
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
    myScroll.refresh();
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
#shopeCont {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  background-color: #fff;
}
.scrollBox {
  position: absolute;
  top: 44px;
  bottom: 44px;
  width: 100vw;
  overflow: hidden;
}
.goShop {
  height: 44px;
  width: 100vw;
  background-color: #f5053d;
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
}
.shopContBox {
  width: 100vw;
  height: auto;
}
.autoPage {
  width: 100vw;
  height: auto;
  overflow: hidden;
}
/* img{
  width: 100%;
} */
.pageLoading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(3);
}
.shopChangeBox {
  box-sizing: border-box;
  padding: 10px 5px 54px 10px;
  width: 100vw;
  height: auto;
  position: relative;
}
.shopChangeBox > li {
  padding: 5px 0;
  position: relative;
  box-sizing: border-box;
}
.shopChangeBox .shopInfoBox {
  height: 60px;
  border-bottom: 1px solid #ccc;
  padding-left: 100px;
}
.shopInfoBox > img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  position: absolute;
  top: -30px;
  left: 0;
  background-color: #eee;
}
.shopInfoBox > h6 {
  font-size: 14px;
  color: #333;
}
.shopInfoBox > p {
  font-size: 14px;
  color: #f5053d;
}
.shopChangeBox .numberCheckBox {
  overflow: hidden;
  padding: 10px 0;
}
.numberCheck {
  float: right;
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
.kindTitle {
  color: #666;
}
.kindCont {
  display: inline-block;
  /* width: 30vw; */
  /* height: 35px; */
  border-radius: 10px;
  background: #eee;
  position: relative;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 35px;
  color: #666;
  margin-right: 5px;
  margin-bottom: 5px;
}
.kindCont > img {
  width: 30px;
  height: 30px;
  display: inline-block;
  vertical-align: middle;
  /* position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%); */
}
</style>