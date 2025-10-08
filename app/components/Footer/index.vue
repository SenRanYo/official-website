<template>
  <div class="footer">
    <div class="footer__content">
      <div class="footer__left">
        <div class="footer__left__logo">
          <img class="logo" :src="logo" alt="logo" />
        </div>
        <div class="flex flex-col mt-[20px] text-[12px] text-[#A3A2A1]">
          <span>北京市西城区广宁伯街1号</span>
          <span>邮编：100033</span>
        </div>
        <div class="flex flex-col mt-[20px] text-[12px] text-[#A3A2A1]">
          <span>京ICP备18049784号-3</span>
          <span>京公网安备110401027000144号</span>
        </div>
      </div>
      <div class="footer__right">
        <div class="down-links">
          <div v-for="(linkGroup, index) in linkGroups" :key="index" class="link-container">
            <div class="link text-[#B4B5B0]" @click.stop="toggleDropdown(index)">
              <span class="text-[14px]">{{ linkGroup.title }}</span>
              <div class="arrow-down" :class="{ rotated: activeDropdown === index }">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="#B4B5B0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
            <Transition name="dropdown">
              <div v-if="activeDropdown === index" class="dropdown-menu" @click.stop>
                <div class="dropdown-content">
                  <a v-for="(item, itemIndex) in linkGroup.items" :key="itemIndex" :href="item.url" class="dropdown-item" target="_blank">
                    {{ item.name }}
                  </a>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        <div class="links" :style="{ 'grid-template-columns': `repeat(${menu.length}, 1fr)` }">
          <div v-for="item in menu" :key="item.title" class="title">
            {{ item.title }}
          </div>
          <div v-for="item in menu" :key="item.title" class="content">
            <div v-for="child in item.child" :key="child.title" class="content-item">
              <NuxtLink :to="child.route" class="child-link">{{ child.title }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import logo from "~/assets/images/logo.png"

const menu = useFooterMenuData()

// 当前激活的下拉菜单索引
const activeDropdown = ref<number | null>(null)

// 模拟链接数据
const linkGroups = ref([
  {
    title: "成员链接",
    items: [
      { name: "中国移动通信集团有限公司", url: "https://www.chinamobile.com" },
      { name: "中国移动通信集团北京有限公司", url: "https://www.bj.chinamobile.com" },
      { name: "中国移动通信集团上海有限公司", url: "https://www.sh.chinamobile.com" },
      { name: "中国移动通信集团广东有限公司", url: "https://www.gd.chinamobile.com" },
      { name: "中国移动通信集团江苏有限公司", url: "https://www.js.chinamobile.com" },
      { name: "中国移动通信集团浙江有限公司", url: "https://www.zj.chinamobile.com" },
      { name: "中国移动通信集团山东有限公司", url: "https://www.sd.chinamobile.com" },
      { name: "中国移动通信集团河南有限公司", url: "https://www.ha.chinamobile.com" },
      { name: "中国移动通信集团四川有限公司", url: "https://www.sc.chinamobile.com" },
      { name: "中国移动通信集团湖北有限公司", url: "https://www.hb.chinamobile.com" },
    ],
  },
  {
    title: "相关链接",
    items: [
      { name: "工业和信息化部", url: "https://www.miit.gov.cn" },
      { name: "国务院国有资产监督管理委员会", url: "https://www.sasac.gov.cn" },
      { name: "中国通信企业协会", url: "https://www.ctea.org.cn" },
      { name: "中国互联网协会", url: "https://www.isc.org.cn" },
      { name: "中国通信标准化协会", url: "https://www.ccsa.org.cn" },
      { name: "中国信息通信研究院", url: "https://www.caict.ac.cn" },
      { name: "人民网", url: "https://www.people.com.cn" },
      { name: "新华网", url: "https://www.xinhuanet.com" },
      { name: "央视网", url: "https://www.cctv.com" },
      { name: "光明网", url: "https://www.gmw.cn" },
    ],
  },
  {
    title: "服务链接",
    items: [
      { name: "中国移动网上营业厅", url: "https://www.10086.cn" },
      { name: "中国移动手机营业厅", url: "https://wap.10086.cn" },
      { name: "中国移动客服热线", url: "tel:10086" },
      { name: "中国移动企业客户服务", url: "https://b2b.10086.cn" },
      { name: "中国移动云服务", url: "https://ecloud.10086.cn" },
      { name: "中国移动物联网", url: "https://iot.10086.cn" },
      { name: "中国移动5G专区", url: "https://5g.10086.cn" },
      { name: "中国移动咪咕", url: "https://www.migu.cn" },
      { name: "中国移动和包支付", url: "https://wallet.10086.cn" },
      { name: "中国移动139邮箱", url: "https://mail.10086.cn" },
    ],
  },
])

// 切换下拉菜单
const toggleDropdown = (index: number) => {
  if (activeDropdown.value === index) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = index
  }
}

// 点击外部关闭下拉菜单
const handleClickOutside = () => {
  activeDropdown.value = null
}

// 监听点击外部事件
onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  height: fit-content;
  justify-content: center;
  background-color: #fff;
  &__content {
    flex: 1;
    display: flex;
    padding: 30px 0;
    min-height: 300px;
    max-width: 1200px;
  }
  &__left {
    display: flex;
    flex-direction: column;
    &__logo {
      height: fit-content;
      overflow: hidden;
      .logo {
        cursor: pointer;
        height: 50px;
        object-fit: cover;
      }
    }
  }
  &__right {
    flex: 1;
    display: flex;
    margin-left: 150px;
    flex-direction: column;
    .down-links {
      display: grid;
      column-gap: 20px;
      grid-template-columns: repeat(3, 1fr);

      .link-container {
        position: relative;

        .link {
          display: flex;
          align-items: center;
          padding-bottom: 8px;
          justify-content: space-between;
          border-bottom: 2px solid #d4d4d4;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            color: #007bff;
          }

          .arrow-down {
            transition: transform 0.3s ease;

            &.rotated {
              transform: rotate(180deg);
            }
          }
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 1000;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-top: 8px;

          .dropdown-content {
            max-height: 200px;
            overflow-y: auto;
            padding: 8px 0;

            &::-webkit-scrollbar {
              width: 6px;
            }

            &::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 3px;
            }

            &::-webkit-scrollbar-thumb {
              background: #c1c1c1;
              border-radius: 3px;

              &:hover {
                background: #a8a8a8;
              }
            }

            .dropdown-item {
              display: block;
              padding: 8px 16px;
              color: #333;
              text-decoration: none;
              font-size: 13px;
              line-height: 1.4;
              transition: background-color 0.2s ease;

              &:hover {
                background-color: #f5f5f5;
                color: #007bff;
              }
            }
          }
        }
      }
    }
    .links {
      display: grid;
      font-size: 14px;
      margin-top: 30px;
      column-gap: 30px;
      .title {
        font-size: 12px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      .content {
        font-size: 12px;
        margin-top: 15px;
        .content-item {
          color: #a3a2a1;
          padding-bottom: 10px;
        }
      }
    }
  }
}

// 下拉动画
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}

.dropdown-enter-from {
  opacity: 0;
  transform: scaleY(0) translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0) translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: scaleY(1) translateY(0);
}
</style>
