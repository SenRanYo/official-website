<template>
  <div class="banner">
    <img class="img" :src="banner" />
  </div>
</template>

<script setup lang="ts">
  import banner from '~/assets/images/banner.png'
</script>

<style scoped lang="scss">
  .banner {
    width: 100%;
    height: 310px;
    display: flex;
    align-items: center;
    border: 1px solid green;
    .img {
      width: 100%;
      height: 310px;
    }
  }
</style>
