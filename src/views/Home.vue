<template>
  <div id="Home">
    <Header title="有赞精选" @share="handleShareBox" />
    <div class="scrollBox" ref="scrollBox">
      <div class="shopThingsList">
        <van-swipe
          :height="swipeHeight"
          :autoplay="3000"
          indicator-color="white"
          :touchable="istouchable"
          class="bannerBox"
        >
          <van-swipe-item v-for="(item, key) in bannerList" :key="key">
            <router-link :to="{ name: 'banner', params: { id: key }}">
              <img :src="item.picUrl" :alt="item.extra.materialName" class="bannerImg" />
            </router-link>
          </van-swipe-item>
        </van-swipe>
        <ShopKind
          v-for="(kindItem, key) in shopThings"
          :key="key"
          :kindTitle="kindItem.category.name"
          :kindTip="kindItem.category.frontName"
          :data-id="kindItem.category.id"
        >
          <shopThingLi
            v-for="(shopItem, index) in kindItem.itemList"
            :key="index"
            :dataId="shopItem.id"
            :listPicUrl="shopItem.listPicUrl"
            :promTag="shopItem.promTag"
            :retailPrice="shopItem.retailPrice"
            :simpleDesc="shopItem.simpleDesc"
            :shopname="shopItem.name"
            :counterPrice="shopItem.counterPrice"
          />
          <div class="shopThingLiTb" v-if="kindItem.itemList.length%2"></div>
        </ShopKind>
      </div>
    </div>
    <wechartShare v-if="shareBox" @closeOverlay="handleCloseOverlay" />
    <transition name="pageTab">
      <router-view />
    </transition>
  </div>
</template>

<script>
const axios = require("axios");
import Header from "./../components/Header.vue";
import Overlay from "./../components/Overlay.vue";
import ShopKind from "./../components/ShopKind.vue";
import wechartShare from "./../components/wechartShare.vue";
import shopThingLi from "./../components/shopThingLi.vue";
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe).use(SwipeItem);
export default {
  data() {
    return {
      shareBox: false,
      istouchable: true,
      swipeHeight: 200,
      bannerList: [],
      shopThings: []
    };
  },
  components: {
    Header,
    Overlay,
    wechartShare,
    ShopKind,
    shopThingLi
  },
  methods: {
    handleShareBox(bool) {
      this.shareBox = bool;
    },
    handleCloseOverlay(bool) {
      this.shareBox = bool;
    },
    async getShopeList() {
      try {
        const response = await axios.get("/json/itemlist.json");
        this.shopThings = response.data.data.categoryItemList;
        this.bannerList = response.data.data.currentCategory.bannerList;
        // console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
  },
  created: function() {
    this.getShopeList();
    Vue.nextTick();
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
  }
};
</script>

<style scoped>
#Home {
  width: 100vw;
  height: 100vh;
  padding: 44px 0;
  box-sizing: border-box;
}
.scrollBox {
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #eeeeee;
}
.bannerBox {
  margin-bottom: 10px;
}
.shopThingsList {
  height: auto;
}
.bannerImg {
  width: 100%;
  height: 100%;
}
.shopThingLiTb {
  height: 270px;
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