<template>
  <div class="header">
    <div class="header__content">
      <div class="header__logo">
        <img class="logo" :src="logo" alt="logo" @click="goHome" />
      </div>
      <div class="header__menu">
        <div v-for="item in menu" :key="item.title" class="header__menu__item">
          <NuxtLink :to="item.route" class="link">{{ item.title }}</NuxtLink>
          <div class="header__menu__item__child">
            <div v-for="child in item.child" :key="child.title" class="header__menu__item__child__item">
              <NuxtLink :to="child.route" class="child-link">{{ child.title }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "~/assets/images/logo.png"

const menu = useMenuData()

function goHome() {
  navigateTo("/")
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 80px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  &__content {
    top: 0;
    left: 50%;
    width: 1200px;
    height: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    transform: translateX(-50%);
  }
  &__logo {
    overflow: hidden;
    margin-right: 120px;
    .logo {
      cursor: pointer;
      height: 50px;
      object-fit: cover;
    }
  }
  &__menu {
    display: flex;
    height: 100%;
    align-items: center;
    &__item {
      height: 100%;
      margin: 0 20px;
      display: flex;
      position: relative;
      align-items: center;
      .link {
        height: 100%;
        cursor: pointer;
        display: flex;
        position: relative;
        align-items: center;
        transition: all 0.3s ease;
        &:hover {
          color: $primary-color;
          font-weight: bold;
          &::after {
            width: 100%;
          }
        }
        &::after {
          content: "";
          left: 50%;
          width: 0;
          bottom: 0;
          height: 4px;
          position: absolute;
          border-radius: 4px;
          transform: translateX(-50%);
          transition: width 0.3s ease;
          background-color: $primary-color;
        }
      }
      &:hover &__child {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
      }
      &__child {
        top: 100%;
        left: 50%;
        width: 150%;
        opacity: 0;
        position: absolute;
        visibility: hidden;
        background-color: #fff;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateX(-50%) translateY(-10px);
        &__item {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          .child-link {
            width: 100%;
            display: flex;
            cursor: pointer;
            margin: 5px 0;
            padding: 5px 0;
            position: relative;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            &:hover {
              color: #fff;
              background-color: $primary-color;
            }
          }
        }
      }
    }
  }
}
</style>
