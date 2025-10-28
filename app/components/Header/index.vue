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
      <div class="header__msg" @click="toggleNotificationMenu">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8C18 4.67 15.31 2 12 2c-3.31 0-6 2.67-6 6v4l-3 3v2h18v-2l-3-3V8z"></path>
          <circle cx="12" cy="22" r="1"></circle>
          <path d="M9.5 21h5"></path>
        </svg>
        <!-- 通知菜单下拉框 -->
        <Transition name="dropdown-fade">
          <div v-if="showNotificationMenu" class="notification-dropdown" @click.stop>
            <!-- 标题 -->
            <div class="notification-header">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8C18 4.67 15.31 2 12 2c-3.31 0-6 2.67-6 6v4l-3 3v2h18v-2l-3-3V8z"></path>
                <circle cx="12" cy="22" r="1"></circle>
                <path d="M9.5 21h5"></path>
              </svg>
              公告通知
            </div>

            <!-- Tabs -->
            <div class="notification-tabs">
              <div
                v-for="tab in notificationTabs"
                :key="tab.key"
                :class="['notification-tab-item', { active: activeNotificationTab === tab.key }]"
                @click="activeNotificationTab = tab.key"
              >
                <span class="tab-title">{{ tab.label }}</span>
                <span class="tab-count">({{ tab.count }})</span>
              </div>
            </div>

            <!-- 公告列表 -->
            <div class="notification-list">
              <div v-for="item in filteredNotifications" :key="item.id" class="notification-item">
                <div class="notification-item__title">{{ item.title }}</div>
                <div class="notification-item__time">{{ item.time }}</div>
              </div>
            </div>
          </div>
        </Transition>
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

// 通知菜单状态
const showNotificationMenu = ref(false)
const activeNotificationTab = ref("all")

// 模拟通知数据
const notificationsData = [
  { id: 1, type: "all", category: "厂务公开", title: "公司工作流程优化通知", time: "2024-10-28" },
  { id: 2, type: "all", category: "日常通知", title: "员工培训计划安排", time: "2024-10-27" },
  { id: 3, type: "open", category: "厂务公开", title: "厂区升级改造计划", time: "2024-10-26" },
]

// 计算tabs数据和filtered通知
const notificationTabs = computed(() => {
  const allCount = notificationsData.length
  const openCount = notificationsData.filter((item) => item.type === "open" || item.type === "all").length
  const dailyCount = notificationsData.filter((item) => item.type === "daily" || item.type === "all").length

  return [
    { key: "all", label: "全部", count: allCount },
    { key: "open", label: "厂务公开", count: openCount },
    { key: "daily", label: "日常通知", count: dailyCount },
  ]
})

const filteredNotifications = computed(() => {
  if (activeNotificationTab.value === "all") {
    return notificationsData
  }
  return notificationsData.filter((item) => item.type === activeNotificationTab.value)
})

function toggleNotificationMenu() {
  showNotificationMenu.value = !showNotificationMenu.value
}

function goHome() {
  navigateTo("/")
}

// 全局点击监听：点击外部关闭菜单
watchEffect(() => {
  if (showNotificationMenu.value) {
    const handleDocumentClick = (event: MouseEvent) => {
      const msgElement = document.querySelector(".header__msg")
      if (msgElement && !msgElement.contains(event.target as Node)) {
        showNotificationMenu.value = false
      }
    }
    // 使用 nextTick 确保监听器不会立即捕获打开菜单的点击
    nextTick(() => {
      document.addEventListener("click", handleDocumentClick)
    })
    return () => document.removeEventListener("click", handleDocumentClick)
  }
})
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 80px;
  display: flex;
  z-index: 100;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  &__content {
    top: 0;
    left: 50%;
    width: 100%;
    z-index: 100;
    height: 80px;
    display: flex;
    position: fixed;
    align-items: center;
    transform: translateX(-50%);
    background-color: #fff;
  }
  &__logo {
    overflow: hidden;
    margin-left: 160px;
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
        font-size: 20px;
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
          font-size: 20px;
          align-items: center;
          flex-direction: column;
          .child-link {
            width: 100%;
            display: flex;
            cursor: pointer;
            margin: 5px 0;
            padding: 5px 0;
            font-size: 20px;
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
    z-index: 100;
  }
  &__msg,
  &__search {
    position: relative;
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
      color: #fff;
      font-size: 16px;
    }
  }
}

/* 通知菜单样式 */
.notification-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 10px;
  padding: 0;
  display: flex;
  flex-direction: column;

  .notification-header {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    padding: 15px 15px 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    gap: 5px;
    .icon {
      width: 20px;
      height: 20px;
      color: #333;
    }
  }

  .notification-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin: 0;
    border-bottom: 1px solid #eee;
    padding: 10px 15px;

    .notification-tab-item {
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 12px;
      color: #666;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: all 0.2s ease;
      flex: 1;
      justify-content: center;

      &:hover {
        background-color: #f0f0f0;
      }

      &.active {
        color: $primary-color;
        font-weight: bold;
        background-color: #f0f0f0;
      }

      .tab-title {
        font-weight: bold;
      }

      .tab-count {
        font-size: 11px;
        color: #999;
      }

      &.active .tab-count {
        color: $primary-color;
      }
    }
  }

  .notification-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 10px 0;
    max-height: 300px;
    overflow-y: auto;

    .notification-item {
      background-color: transparent;
      border-radius: 0;
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: #f9f9f9;
      }

      .notification-item__title {
        font-size: 13px;
        color: #333;
        font-weight: bold;
        flex: 1;
        line-height: 1.4;
      }

      .notification-item__time {
        font-size: 11px;
        color: #999;
        white-space: nowrap;
        flex-shrink: 0;
      }
    }
  }
}

/* 下拉菜单过渡动画 */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.3s ease;
}

.dropdown-fade-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
