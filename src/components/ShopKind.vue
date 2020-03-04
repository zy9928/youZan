<template>
  <section id="ShowKind">
    <h3 class="kindTitle">{{kindTitle}}</h3>
    <p class="kindTip">{{kindTip}}</p>
    <div class="shopList">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    kindTitle: "",
    kindTip: ""
  }
};
</script>

<style scoped>
#ShowKind {
  background-color: #fff;
  width: 100vw;
  padding: 10px 10px;
  box-sizing: border-box;
}
.kindTitle {
  color: #333333;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
}
.kindTip {
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #999999;
  margin-bottom: 10px;
}
.shopList {
  /* display: flex; */
  width: 100%;
  column-count: 2;
  column-gap: 10px;
  column-span: all;
  column-fill: balance;
}
</style>