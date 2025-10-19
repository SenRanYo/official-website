<template>
  <div class="index-staff">
    <div class="index-staff__top">
      <div class="top-left">
        <div class="title-section">
          <p class="title-en">In Focus</p>
          <h2 class="title-cn">职工风采</h2>
        </div>
      </div>
      <div class="top-right"></div>
    </div>
    <div class="index-staff__bottom"></div>
  </div>
</template>

<script setup lang="ts">
import entry1 from "~/assets/images/entry/j-1.png"
import entry2 from "~/assets/images/entry/j-2.png"
import entry3 from "~/assets/images/entry/j-3.png"
import entry4 from "~/assets/images/entry/j-4.png"
</script>

<style scoped lang="scss">
.index-staff {
  gap: 15px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top-left {
      .title-section {
        display: flex;
        flex-direction: column;
        .title-en {
          font-size: 20px;
          line-height: 0;
          color: #e5e5e5;
          margin-bottom: 10px;
        }

        .title-cn {
          color: #1f2937;
          font-size: 24px;
          line-height: 0;
          font-weight: bold;
        }
      }
    }

    .top-right {
      .tabs {
        gap: 20px;
        display: flex;

        .tab-item {
          font-size: 14px;
          color: #1f2937;
          font-weight: 500;
          cursor: pointer;
          padding: 5px;
          transition: color 0.3s ease;

          &:hover,
          &.active {
            color: #108cf0;
          }
        }
      }
    }
  }

  &__bottom {
    gap: 30px;
    height: 400px;
    display: grid;
    position: relative;
    grid-template-columns: repeat(2, 1fr);
    background-size: 90% 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("~/assets/images/bg_3d.png");
  }
}
</style>
