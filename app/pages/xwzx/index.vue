<template>
  <div class="news-center">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>新闻中心</h1>
      <p>及时了解公司最新动态、行业资讯和企业文化</p>
    </div>

    <!-- 新闻版块布局 -->
    <div class="news-layout">
      <!-- 主要新闻区域 - 公司要闻（带图片） -->
      <section class="main-news-section">
        <div class="section-header">
          <h2>
            <i class="icon icon-news"></i>
            公司要闻
          </h2>
          <NuxtLink to="/xwzx/gsyw" class="more-link">更多 →</NuxtLink>
        </div>
        <div class="main-news-grid">
          <div v-for="item in featuredNews" :key="item.id" class="main-news-item">
            <div class="news-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="news-content">
              <h3 class="news-title">{{ item.title }}</h3>
              <p class="news-summary">{{ item.summary }}</p>
              <div class="news-meta">
                <span class="news-date">{{ item.date }}</span>
                <span class="news-views">{{ item.views }} 阅读</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 侧边新闻区域 -->
      <aside class="side-news-area">
        <!-- 媒体聚焦 -->
        <section class="news-section">
          <div class="section-header">
            <h3>
              <i class="icon icon-media"></i>
              媒体聚焦
            </h3>
            <NuxtLink to="/xwzx/mtjj" class="more-link">更多 →</NuxtLink>
          </div>
          <div class="news-list">
            <div v-for="item in mediaNews" :key="item.id" class="news-item">
              <h4 class="news-title">{{ item.title }}</h4>
              <span class="news-date">{{ item.date }}</span>
            </div>
          </div>
        </section>

        <!-- 公司新闻 -->
        <section class="news-section">
          <div class="section-header">
            <h3>
              <i class="icon icon-company"></i>
              公司新闻
            </h3>
            <NuxtLink to="/xwzx/gsxw" class="more-link">更多 →</NuxtLink>
          </div>
          <div class="news-list">
            <div v-for="item in companyNews" :key="item.id" class="news-item">
              <h4 class="news-title">{{ item.title }}</h4>
              <span class="news-date">{{ item.date }}</span>
            </div>
          </div>
        </section>
      </aside>
    </div>

    <!-- 底部新闻区域 -->
    <div class="bottom-news-area">
      <!-- 职工园地 -->
      <section class="news-section">
        <div class="section-header">
          <h3>
            <i class="icon icon-employee"></i>
            职工园地
          </h3>
          <NuxtLink to="/xwzx/zgyd" class="more-link">更多 →</NuxtLink>
        </div>
        <div class="news-grid">
          <div v-for="item in employeeNews" :key="item.id" class="news-item">
            <h4 class="news-title">{{ item.title }}</h4>
            <p class="news-summary">{{ item.summary }}</p>
            <span class="news-date">{{ item.date }}</span>
          </div>
        </div>
      </section>

      <!-- 图片新闻 -->
      <section class="news-section">
        <div class="section-header">
          <h3>
            <i class="icon icon-photo"></i>
            图片新闻
          </h3>
          <NuxtLink to="/xwzx/tpxw" class="more-link">更多 →</NuxtLink>
        </div>
        <div class="photo-news-grid">
          <div v-for="item in photoNews" :key="item.id" class="photo-news-item">
            <div class="photo-wrapper">
              <img :src="item.image" :alt="item.title" />
            </div>
            <h4 class="news-title">{{ item.title }}</h4>
            <span class="news-date">{{ item.date }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

// 导入占位图片
import banner1 from "~/assets/images/banner1.jpg"
import banner2 from "~/assets/images/banner2.jpg"
import banner3 from "~/assets/images/banner3.jpg"
import swiper1 from "~/assets/images/swiper/swiper-1.jpg"
import swiper2 from "~/assets/images/swiper/swiper-2.jpg"
import swiper3 from "~/assets/images/swiper/swiper-3.jpg"
import swiper4 from "~/assets/images/swiper/swiper-4.jpg"
import swiper5 from "~/assets/images/swiper/swiper-5.jpg"
import swiper6 from "~/assets/images/swiper/swiper-6.jpg"

// 设置页面标题
useHead({
  title: "新闻中心",
})

// 公司要闻数据（带图片）
const featuredNews = ref([
  {
    id: 1,
    title: "公司召开2025年工作会议暨党建工作会议",
    summary: "会议总结了2024年工作成果，部署了2025年重点任务，强调要坚持高质量发展，推进企业转型升级...",
    date: "2025-01-15",
    views: "1,256",
    image: banner1,
  },
  {
    id: 2,
    title: '公司荣获"2024年度优秀企业"称号',
    summary: "在全省企业评选中，公司凭借出色的经营业绩和社会责任担当，荣获2024年度优秀企业称号...",
    date: "2025-01-12",
    views: "986",
    image: banner2,
  },
  {
    id: 3,
    title: "重大项目建设取得新突破",
    summary: "公司重点投资项目进展顺利，预计将为地方经济发展注入新动力，创造更多就业机会...",
    date: "2025-01-10",
    views: "1,458",
    image: banner3,
  },
])

// 媒体聚焦数据
const mediaNews = ref([
  {
    id: 1,
    title: "《经济日报》：企业数字化转型的典型案例",
    date: "2025-01-14",
  },
  {
    id: 2,
    title: "《人民日报》：助力乡村振兴的企业担当",
    date: "2025-01-13",
  },
  {
    id: 3,
    title: "《光明日报》：绿色发展的先行者",
    date: "2025-01-11",
  },
  {
    id: 4,
    title: "央视新闻：创新驱动发展的实践者",
    date: "2025-01-09",
  },
  {
    id: 5,
    title: "《中国企业报》：高质量发展的探索者",
    date: "2025-01-08",
  },
])

// 公司新闻数据
const companyNews = ref([
  {
    id: 1,
    title: "公司举办员工技能竞赛活动",
    date: "2025-01-14",
  },
  {
    id: 2,
    title: "安全生产月活动圆满结束",
    date: "2025-01-13",
  },
  {
    id: 3,
    title: "新产品发布会成功举办",
    date: "2025-01-11",
  },
  {
    id: 4,
    title: "公司通过ISO质量管理体系认证",
    date: "2025-01-09",
  },
  {
    id: 5,
    title: "季度经营分析会议召开",
    date: "2025-01-08",
  },
])

// 职工园地数据
const employeeNews = ref([
  {
    id: 1,
    title: "员工读书分享会：《管理的常识》",
    summary: "分享管理智慧，提升职业素养",
    date: "2025-01-14",
  },
  {
    id: 2,
    title: "公司篮球队在联赛中夺冠",
    summary: "展现团队精神，增强企业凝聚力",
    date: "2025-01-12",
  },
  {
    id: 3,
    title: "优秀员工表彰大会",
    summary: "表彰先进典型，激励全体员工",
    date: "2025-01-10",
  },
  {
    id: 4,
    title: "员工子女夏令营活动",
    summary: "关爱员工家庭，体现企业温度",
    date: "2025-01-08",
  },
])

// 图片新闻数据
const photoNews = ref([
  {
    id: 1,
    title: "新厂区建设进展",
    date: "2025-01-14",
    image: swiper1,
  },
  {
    id: 2,
    title: "员工培训活动",
    date: "2025-01-12",
    image: swiper2,
  },
  {
    id: 3,
    title: "社区公益活动",
    date: "2025-01-10",
    image: swiper3,
  },
  {
    id: 4,
    title: "产品展示会",
    date: "2025-01-08",
    image: swiper4,
  },
  {
    id: 5,
    title: "安全检查活动",
    date: "2025-01-06",
    image: swiper5,
  },
  {
    id: 6,
    title: "年终表彰大会",
    date: "2025-01-05",
    image: swiper6,
  },
])
</script>

<style scoped lang="scss">
.news-center {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;

  .page-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px 0;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 12px;

    h1 {
      font-size: 36px;
      color: #2c5aa0;
      font-weight: 700;
      margin-bottom: 16px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    p {
      font-size: 16px;
      color: #666;
      margin: 0;
    }
  }

  .news-layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
    margin-bottom: 40px;

    .main-news-section {
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 3px solid #2c5aa0;

        h2 {
          font-size: 24px;
          color: #2c5aa0;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;

          .icon {
            width: 24px;
            height: 24px;
            background: #2c5aa0;
            border-radius: 4px;
            display: inline-block;
          }
        }

        .more-link {
          color: #666;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;

          &:hover {
            color: #2c5aa0;
          }
        }
      }

      .main-news-grid {
        display: grid;
        gap: 24px;

        .main-news-item {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 20px;
          padding: 24px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
            border-color: #2c5aa0;
          }

          .news-image {
            border-radius: 8px;
            overflow: hidden;

            img {
              width: 100%;
              height: 200px;
              object-fit: cover;
              transition: transform 0.3s ease;
            }

            &:hover img {
              transform: scale(1.05);
            }
          }

          .news-content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .news-title {
              font-size: 20px;
              font-weight: 600;
              color: #333;
              margin-bottom: 12px;
              line-height: 1.4;
              cursor: pointer;

              &:hover {
                color: #2c5aa0;
              }
            }

            .news-summary {
              font-size: 14px;
              color: #666;
              line-height: 1.6;
              margin-bottom: 16px;
              flex-grow: 1;
            }

            .news-meta {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 12px;
              color: #999;

              .news-views {
                background: #f8f9fa;
                padding: 4px 8px;
                border-radius: 4px;
              }
            }
          }
        }
      }
    }

    .side-news-area {
      display: flex;
      flex-direction: column;
      gap: 32px;

      .news-section {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        border: 1px solid #f0f0f0;
        overflow: hidden;

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: #f8f9fa;
          border-bottom: 1px solid #eee;

          h3 {
            font-size: 18px;
            color: #333;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0;

            .icon {
              width: 16px;
              height: 16px;
              background: #2c5aa0;
              border-radius: 3px;
              display: inline-block;
            }
          }

          .more-link {
            color: #666;
            text-decoration: none;
            font-size: 12px;
            transition: color 0.3s ease;

            &:hover {
              color: #2c5aa0;
            }
          }
        }

        .news-list {
          padding: 0;

          .news-item {
            padding: 16px 24px;
            border-bottom: 1px solid #f5f5f5;
            transition: background-color 0.3s ease;

            &:hover {
              background-color: #f8f9fa;
            }

            &:last-child {
              border-bottom: none;
            }

            .news-title {
              font-size: 14px;
              color: #333;
              margin-bottom: 8px;
              line-height: 1.4;
              cursor: pointer;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;

              &:hover {
                color: #2c5aa0;
              }
            }

            .news-date {
              font-size: 11px;
              color: #999;
            }
          }
        }
      }
    }
  }

  .bottom-news-area {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    .news-section {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      border: 1px solid #f0f0f0;
      overflow: hidden;

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        background: #f8f9fa;
        border-bottom: 1px solid #eee;

        h3 {
          font-size: 18px;
          color: #333;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;

          .icon {
            width: 16px;
            height: 16px;
            background: #2c5aa0;
            border-radius: 3px;
            display: inline-block;
          }
        }

        .more-link {
          color: #666;
          text-decoration: none;
          font-size: 12px;
          transition: color 0.3s ease;

          &:hover {
            color: #2c5aa0;
          }
        }
      }

      .news-grid {
        padding: 24px;
        display: grid;
        gap: 20px;

        .news-item {
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          transition: all 0.3s ease;

          &:hover {
            background: #e9ecef;
            transform: translateY(-2px);
          }

          .news-title {
            font-size: 14px;
            color: #333;
            margin-bottom: 8px;
            font-weight: 500;
            cursor: pointer;

            &:hover {
              color: #2c5aa0;
            }
          }

          .news-summary {
            font-size: 12px;
            color: #666;
            margin-bottom: 8px;
            line-height: 1.4;
          }

          .news-date {
            font-size: 11px;
            color: #999;
          }
        }
      }

      .photo-news-grid {
        padding: 24px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;

        .photo-news-item {
          text-align: center;
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-4px);
          }

          .photo-wrapper {
            margin-bottom: 12px;
            border-radius: 8px;
            overflow: hidden;

            img {
              width: 100%;
              height: 120px;
              object-fit: cover;
              transition: transform 0.3s ease;
            }

            &:hover img {
              transform: scale(1.05);
            }
          }

          .news-title {
            font-size: 13px;
            color: #333;
            margin-bottom: 8px;
            font-weight: 500;
            cursor: pointer;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.3;

            &:hover {
              color: #2c5aa0;
            }
          }

          .news-date {
            font-size: 11px;
            color: #999;
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .news-center {
    padding: 15px;

    .news-layout {
      grid-template-columns: 1fr;
      gap: 30px;

      .main-news-section .main-news-grid .main-news-item {
        grid-template-columns: 1fr;

        .news-image img {
          height: 200px;
        }
      }

      .side-news-area {
        grid-template-columns: repeat(2, 1fr);
        flex-direction: row;
      }
    }

    .bottom-news-area {
      grid-template-columns: 1fr;
      gap: 30px;

      .photo-news-grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
    }
  }
}

@media (max-width: 768px) {
  .news-center {
    .page-header {
      padding: 20px 0;

      h1 {
        font-size: 28px;
      }
    }

    .news-layout {
      .main-news-section {
        .section-header h2 {
          font-size: 20px;
        }

        .main-news-grid .main-news-item {
          padding: 16px;

          .news-content .news-title {
            font-size: 16px;
          }
        }
      }

      .side-news-area {
        grid-template-columns: 1fr;
        flex-direction: column;
      }
    }

    .bottom-news-area .photo-news-grid {
      grid-template-columns: 1fr !important;

      .photo-news-item .photo-wrapper img {
        height: 160px;
      }
    }
  }
}
</style>
