<template>
  <div class="layouts-container">
    <Header />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layouts-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  background-color: #fff;
}
</style>
