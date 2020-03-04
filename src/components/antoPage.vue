<template>
  <section class="autoPage" v-html="shopHtml"></section>
</template>

<script>
export default {
  props: ["shopHtml"]
};
</script>

<style>
img {
  width: 100%;
}
</style>