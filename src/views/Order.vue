
<template>
  <div class="orderPage">
    <Header title="订单" />
    <div class="scrollBox" ref="scrollBox">
      <div class="orderBox">
        <section class="shopBox" v-for="(item, key) in shopbuyList" :key="key">
          <div class="dianpuBox">
            <div class="dianpu">
              <h6>墨刀小集市</h6>
              <p>订单编号：{{item.dianpuId}}</p>
            </div>
            <div class="isPay" v-show="!item.isPay">等待买家付款</div>
            <div class="isPay" v-show="item.isPay">等待卖家发货</div>
          </div>
          <div class="shoBuyLi">
            <div class="shopImg">
              <img v-lazy="item.pic" />
            </div>
            <div class="shopInfo">
              <h4 class="shopTitle">{{item.shopName}}</h4>
              <p class="shopKind">{{item.shopKind}}</p>
            </div>
            <div class="money">
              <span class="value">￥ {{item.money}}</span>
              <span class="sum">x {{item.num}}</span>
            </div>
          </div>
          <p class="all">
            合计：
            <span>￥ {{Number(item.money) * Number(item.num)}}</span>
          </p>
          <div class="payBtn">
            <van-button type="default" @click="delet(item.dianpuId)">取消</van-button>
            <van-button type="danger" @click="goBuy(item.dianpuId)">付款</van-button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./../components/Header.vue";
import Vue from "vue";
import { Button } from "vant";

Vue.use(Button);
export default {
  data() {
    return {
      shopbuyList: []
    };
  },
  components: {
    Header
  },
  methods: {
    async getShopeCont(id) {
      try {
        const response = await axios.get(
          `http://www.littleemmayang.com:8000/api/item/detail?id=${id}`
        );
      } catch (error) {
        console.error(error);
      }
    },
    goBuy(key) {
      var str = [];
      this.shopbuyList.forEach(item => {
        if (item.dianpuId == key) {
          item.isPay = true;
        }
        str.push(JSON.stringify(item));
      });
      // console.log(this.shopbuyList)
      localStorage.setItem("shopbuyList", str.join("shop-bug-fg"));
    },
    delet(key) {
      var keyArr = null;
      this.shopbuyList.forEach((item, index) => {
        if (item.dianpuId == key) {
          keyArr = index;
        }
      });
      this.shopbuyList.splice(keyArr, 1);
      var str = [];
      this.shopbuyList.forEach(item => {
        str.push(JSON.stringify(item));
      });
      localStorage.setItem("shopbuyList", str.join("shop-bug-fg"));
    }
  },
  mounted() {
    if (localStorage.getItem("shopbuyList")) {
      var shopbuyList = localStorage
        .getItem("shopbuyList")
        .split("shop-bug-fg");
      shopbuyList.forEach(item => {
        this.shopbuyList.push(JSON.parse(item));
      });
      console.log(this.shopbuyList);
    }
    console.log(this.$refs.scrollBox);
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
.orderPage {
  width: 100vw;
  position: absolute;
  top: 0;
  bottom: 44px;
  box-sizing: border-box;
  /* padding-top: 44px; */
}
.scrollBox {
  position: absolute;
  top: 44px;
  bottom: 0px;
  width: 100vw;
  overflow: hidden;
  background-color: #f0f0f2;
  box-sizing: border-box;
  /* padding-top: 10px; */
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.orderBox {
  width: 100vw;
}
.shopBox {
  padding: 10px 0;
  background-color: #fff;
  margin-bottom: 10px;
}
.shoBuyLi {
  width: 100vw;
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  /* margin: 10px 0; */
  border-top: 1px solid #ee0a24;
  border-bottom: 1px solid #ee0a24;
  background-color: #eee;
}
.shoBuyLi > .shopImg {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shoBuyLi > .shopImg > img {
  width: 80%;
}
.shoBuyLi > .shopInfo {
  flex: 3;
}
.shoBuyLi > .money {
  flex: 1;
}
.shopTitle {
  font-size: 14px;
  font-weight: bold;
  line-height: 25px;
}
.shopKind {
  font-size: 12px;
  color: #666;
}
.money {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.money > span {
  display: block;
}
.money > .value {
  color: #ee0a24;
}
.money > .sum {
  color: #666;
}
.dianpuBox {
  display: flex;
  box-sizing: border-box;
  padding: 5px 10px;
}
.dianpu {
  flex: 3;
}
.dianpu > h6 {
  font-size: 14px;
  color: #333;
  line-height: 20px;
}
.dianpu > p {
  font-size: 12px;
  color: #666;
}
.isPay {
  flex: 1;
  font-size: 14px;
  color: #ee0a24;
  text-align: center;
}
.all {
  text-align: right;
  box-sizing: border-box;
  padding-right: 10px;
  color: #555;
  border-bottom: 1px solid #ccc;
  padding: 5px 10px;
}
.all > span {
  color: #ee0a24;
}
.payBtn {
  padding: 5px 10px;
  box-sizing: border-box;
  text-align: right;
}
.payBtn > button {
  margin: 0 5px;
}
</style>
