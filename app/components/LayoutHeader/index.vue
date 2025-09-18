<template>
  <div class="layout-header">
    <img class="logo" :src="logo" alt="" />
    <div class="menu">
      <div v-for="(item, index) in menus" :key="index" class="menu-item-wrapper">
        <NuxtLink class="menu-item" :to="item.route">
          {{ item.title }}
        </NuxtLink>
        <div v-if="item.child && item.child.length > 0" class="submenu">
          <NuxtLink v-for="(subItem, subIndex) in item.child" :key="subIndex" class="submenu-item" :to="subItem.route">
            {{ subItem.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "~/assets/images/logo.png"

const menus = useMenuData()
</script>

<style lang="scss">
.layout-header {
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  position: absolute;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 1000;
  &:hover {
    background-color: #fff;
  }
  .logo {
    height: 50px;
    margin: 0 100px;
  }
  .menu {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    .menu-item-wrapper {
      position: relative;
      padding: 0 20px;
      height: 100%;
      display: flex;
      align-items: center;

      .menu-item {
        padding: 10px 0;
        text-decoration: none;
        color: inherit;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        transition: color 0.3s ease;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          border-radius: 2px;
          background-color: $primary-color;
          transform: translateX(-50%);
          transition: width 0.4s ease;
        }

        &:hover {
          font-weight: bold;
          color: $primary-color;

          &::after {
            width: 100%;
          }
        }
      }

      .submenu {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-10px);
        min-width: 140px;
        background-color: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1001;

        .submenu-item {
          display: flex;
          justify-content: center;
          padding: 12px 20px;
          text-decoration: none;
          color: #333;
          border-bottom: 1px solid #f0f0f0;
          transition: all 0.3s ease;

          &:last-child {
            border-bottom: none;
          }

          &:hover {
            color: #fff;
            background-color: $primary-color;
          }
        }
      }

      &:hover .submenu {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
      }
    }
  }
}
</style>
