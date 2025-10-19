<template>
  <div class="description" :style="{ backgroundImage: image ? `url(${image})` : 'none' }">
    <h1 class="description-text">{{ text }}</h1>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  image?: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.description {
  display: flex;
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &::before {
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .description-text {
    top: 80px;
    left: 100px;
    margin: 0;
    z-index: 2;
    color: white;
    font-size: 32px;
    font-weight: bold;
    position: absolute;
    line-height: 1.4;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    height: 200px;

    .description-text {
      font-size: 24px;
    }
  }
}
</style>
