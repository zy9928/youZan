<template>
  <div id="shopThingLi">
    <router-link :to="{ name: 'shopeCont', params: { id: dataId }}">
      <div class="shopImgBox">
        <img class="shopImg" v-lazy="listPicUrl" />
        <div class="shopDiscounts">
          <p class="discountsTitleBox">
            <span class="discountsTitle">{{promTag}}</span>
            <span class="retailPrice">
              ￥{{retailPrice}}
              <i v-if="promTag == '超级疯抢' || promTag == '限时购'">起</i>
            </span>
          </p>
          <p class="discountsCont textOver">{{simpleDesc}}</p>
        </div>
      </div>
      <h4 class="shopName textOver">{{shopname}}</h4>
      <p class="shopMoney">
        <span>￥{{retailPrice}}</span>
        <del>￥{{counterPrice}}</del>
      </p>
      <p class="shopTip">
        <span>{{promTag}}</span>
      </p>
    </router-link>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";

// options 为可选参数，无则不传
Vue.use(Lazyload);
export default {
  props: {
    listPicUrl: "",
    promTag: "",
    simpleDesc: "",
    shopname: "",
    retailPrice: "",
    counterPrice: "",
    dataId: 0
  }
};
</script>

<style scoped>
#shopThingLi {
  height: 270px;
}
.shopImgBox {
  width: 100%;
  height: 172px;
  position: relative;
  margin-bottom: 10px;
}
.shopImg {
  width: 100%;
  height: 172px;
}
.shopDiscounts {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 24px;
  padding-top: 4px;
}
.discountsTitleBox {
  position: absolute;
  left: 0;
  top: 0;
  background-image: url(https://yanxuan.nosdn.127.net/d71e2460d062eaa21d5bdf97eba9da89.png);
  width: 52px;
  height: 28px;
  background-position-x: -52px;
  background-size: 200% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.discountsTitleBox > span {
  display: block;
  font-size: 10px;
  color: #fff;
  line-height: 14px;
  flex: 1;
}
.discountsCont {
  width: 100%;
  height: 24px;
  padding-left: 58px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 24px;
  color: #fff;
  background-color: #dd1a21;
}
.shopName {
  font-size: 14px;
  line-height: 25px;
  color: #333;
}
.shopMoney {
  height: 24px;
  line-height: 0;
}
.shopMoney > span {
  font-size: 14px;
  color: #dd1a21;
  line-height: 24px;
}
.shopMoney > del {
  font-size: 12px;
  color: #999999;
  line-height: 16px;
}
.shopTip {
  height: 20px;
  line-height: 20px;
}
.shopTip > span {
  display: inline-block;
  width: 46px;
  height: 15px;
  border: 1px solid #dd1a21;
  border-radius: 5px;
  color: #dd1a21;
  font-size: 10px;
  line-height: 15px;
  text-align: center;
}
</style>