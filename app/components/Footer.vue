<template>
  <div class="footer">
    <div class="content">
      <!-- 公司信息区域 -->
      <div class="company-info">
        <div class="logo">
          <!-- <img src="/logo.png" alt="CHD" class="logo-img" /> -->
          <div class="company-name">
            <h3>CHD</h3>
            <p>四川华电泸定水电<br />有限公司</p>
          </div>
        </div>
        <p class="company-desc">四川华电泸定水电有限公司是中国华电集团有限公司下的重要子公司，专注于水电资源的开发、建设与运营。</p>
      </div>

      <!-- 快速链接区域 -->
      <div class="quick-links">
        <h4>快速链接</h4>
        <ul>
          <li v-for="item in menu" :key="item.title">
            <NuxtLink :to="item.route">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- 专题栏目区域 -->
      <div class="special-topics">
        <h4>专题栏目</h4>
        <ul>
          <li><NuxtLink to="/topics/lean-management">精益管理</NuxtLink></li>
          <li><NuxtLink to="/topics/party-building">党的建设</NuxtLink></li>
          <li><NuxtLink to="/topics/safety">安全生产</NuxtLink></li>
          <li><NuxtLink to="/topics/innovation">科技创新</NuxtLink></li>
          <li><NuxtLink to="/topics/social-responsibility">社会责任</NuxtLink></li>
        </ul>
      </div>

      <!-- 联系方式区域 -->
      <div class="contact-info">
        <h4>联系方式</h4>
        <div class="contact-item">
          <i class="icon-location"></i>
          <span>四川省甘孜藏族自治州泸定县泸桥镇</span>
        </div>
        <div class="contact-item">
          <i class="icon-phone"></i>
          <span>0836-312XXXX</span>
        </div>
        <div class="contact-item">
          <i class="icon-email"></i>
          <span>luding@chd.com.cn</span>
        </div>
      </div>
    </div>

    <div class="copyright">
      <span>Copyright © 2025 四川华电泸定水电有限公司 版权所有</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const menu = useMenuData()
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  padding: 60px 12.5% 0;
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.8);
  background-color: #1e3a5f;

  .content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 60px;
    margin-bottom: 40px;

    .company-info {
      .logo {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .logo-img {
          width: 60px;
          height: 60px;
          margin-right: 15px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

        .company-name {
          h3 {
            color: white;
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 5px 0;
          }

          p {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            margin: 0;
            line-height: 1.4;
          }
        }
      }

      .company-desc {
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
        line-height: 1.6;
        margin: 0;
      }
    }

    .quick-links,
    .special-topics,
    .contact-info {
      h4 {
        color: white;
        font-size: 18px;
        font-weight: bold;
        margin: 0 0 20px 0;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin-bottom: 12px;

          a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s ease;

            &:hover {
              color: white;
            }
          }
        }
      }
    }

    .contact-info {
      .contact-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        i {
          width: 16px;
          height: 16px;
          margin-right: 10px;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 2px;
        }

        span {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
        }
      }
    }
  }

  .copyright {
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    span {
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
    }
  }

  // 响应式设计
  @media (max-width: 1024px) {
    .content {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
  }

  @media (max-width: 768px) {
    padding: 40px 5% 0;

    .content {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }
}
</style>
