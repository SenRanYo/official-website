<template>
  <div class="layout-footer">
    <!-- 公司Logo和信息区域 -->
    <div class="company-info">
      <img class="logo" :src="logo" alt="" />
      <div class="action-buttons">
        <button class="btn-recruit">人才招聘</button>
        <button class="btn-tender">招标采购</button>
      </div>
      <div class="company-contact">
        <div class="address">北京市西城区广宁伯街1号</div>
        <div class="postal">邮编：100033</div>
        <div class="icp">京ICP备18049784号-3</div>
        <div class="license">京公网安备110401027000144号</div>
      </div>
    </div>

    <!-- 主要栏目导航 -->
    <div class="main-navigation">
      <div v-for="menuItem in menu.filter((item) => item.title !== '首页')" :key="menuItem.title" class="nav-section">
        <h4>{{ menuItem.title }}</h4>
        <ul>
          <li v-for="subItem in menuItem.child" :key="subItem.title">
            <NuxtLink :to="subItem.route">{{ subItem.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "~/assets/images/logo.png"

const menu = useFooterMenuData()

console.log("🚀 ~ menu:", menu)
</script>

<style scoped lang="scss">
.layout-footer {
  width: 100%;
  height: 400px;
  display: flex;
  overflow: hidden;
  padding-top: 30px;
  box-sizing: border-box;
  background-color: #fff;
  justify-content: center;

  .company-info {
    margin-right: 150px;
    .logo {
      width: 220px;
      margin-bottom: 20px;
    }

    .action-buttons {
      display: flex;
      gap: 10px;

      button {
        padding: 6px 16px;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;

        &.btn-recruit {
          background-color: #f39c12;
          color: white;
        }

        &.btn-tender {
          background-color: #3498db;
          color: white;
        }
      }
    }

    .company-contact {
      color: #a3a2a1;
      font-size: 12px;
      line-height: 1.6;
      margin-top: 30px;

      div {
        margin-bottom: 4px;
      }
    }
  }

  .site-links {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .link-section {
      h4 {
        font-size: 14px;
        margin-bottom: 8px;
        color: white;
      }

      .link-dropdown {
        select {
          width: 100%;
          padding: 6px 12px;
          border: 1px solid #555;
          background-color: #404040;
          color: white;
          border-radius: 4px;
          font-size: 12px;
        }
      }
    }
  }

  .main-navigation {
    gap: 30px;
    display: flex;

    .nav-section {
      width: fit-content;
      display: flex;
      flex-direction: column;

      h4 {
        font-size: 14px;
        font-weight: bold;
        padding-bottom: 30px;
        border-bottom: 1px solid #e5e5e5;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          display: flex;
          height: fit-content;
          margin-bottom: 8px;

          a {
            color: #a3a2a1;
            text-decoration: none;
            font-size: 12px;
            transition: color 0.3s ease;
          }
        }
      }
    }
  }
}

.footer-bottom {
  background-color: #1a1a1a;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;

    .footer-links {
      text-align: center;
      margin-bottom: 15px;

      a {
        color: #ccc;
        text-decoration: none;
        font-size: 12px;
        margin: 0 8px;

        &:hover {
          color: white;
        }
      }

      span {
        color: #666;
        margin: 0 4px;
      }
    }

    .copyright {
      text-align: center;

      p {
        color: #999;
        font-size: 11px;
        margin: 4px 0;
        line-height: 1.4;
      }
    }
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .content {
    grid-template-columns: 250px 1fr;
    gap: 30px;

    .main-navigation {
      grid-column: 1 / -1;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 20px;
    }
  }
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px 15px;

    .main-navigation {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
  }
}

@media (max-width: 480px) {
  .content {
    .main-navigation {
      grid-template-columns: 1fr;
    }
  }
}
</style>
