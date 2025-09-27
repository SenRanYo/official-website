<template>
  <div class="home-container">
    <LayoutHeader />
    <slot />
    <FixedNotice />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
}
</style>
