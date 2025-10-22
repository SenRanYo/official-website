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
    <!-- 右侧固定元素容器 -->
    <div class="header__right">
      <div class="header__msg">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8C18 4.67 15.31 2 12 2c-3.31 0-6 2.67-6 6v4l-3 3v2h18v-2l-3-3V8z"></path>
          <circle cx="12" cy="22" r="1"></circle>
          <path d="M9.5 21h5"></path>
        </svg>
      </div>
      <div class="header__search">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </div>
      <div class="header__login">
        <svg class="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span class="login-text">登录/注册</span>
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
  z-index: 10;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  &__content {
    top: 0;
    left: 50%;
    width: 100%;
    height: 80px;
    display: flex;
    position: fixed;
    align-items: center;
    transform: translateX(-50%);
  }
  &__logo {
    overflow: hidden;
    margin-left: 60px;
    margin-right: 60px;
    .logo {
      cursor: pointer;
      height: 50px;
      object-fit: cover;
    }
  }
  &__menu {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    &__item {
      height: 100%;
      margin: 0 30px;
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
        z-index: 100;
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
  &__right {
    display: flex;
    align-items: center;
    gap: 30px;
    position: fixed;
    right: 0;
    height: 80px;
    top: 0;
  }
  &__msg,
  &__search {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #f0f0f0;
    }
    .icon {
      width: 22px;
      height: 22px;
      color: #333;
    }
  }
  &__login {
    gap: 8px;
    height: 80px;
    display: flex;
    cursor: pointer;
    padding: 0 30px;
    align-items: center;
    background-color: $primary-color;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.9;
    }
    .login-icon {
      width: 24px;
      height: 24px;
      color: #fff;
    }
    .login-text {
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
