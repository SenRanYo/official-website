<template>
  <div class="default-container">
    <LayoutHeader />
    <LayoutBanner />
    <LayoutBreadcrumb />
    <slot />
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.default-container {
  display: flex;
  flex-direction: column;
}
</style>
