<template>
  <div class="company-intro">
    <!-- 公司概况 -->
    <section class="company-overview">
      <div class="container">
        <div class="overview-content">
          <div class="overview-text" data-aos="fade-right" data-aos-duration="800">
            <h1 class="company-name" data-aos="fade-up" data-aos-delay="200">四川华电泸定水电有限公司</h1>
            <p class="company-description" data-aos="fade-up" data-aos-delay="400">
              四川华电泸定水电有限公司（以下简称公司）于2006年6月注册成立，由华电国际电力股份有限公司全资设立，负责泸定水电站的投资、建设和运营。
            </p>
            <div class="key-stats" data-aos="fade-up" data-aos-delay="600">
              <div class="stat-item" data-aos="zoom-in" data-aos-delay="800">
                <span class="stat-number">920</span>
                <span class="stat-label">MW 总装机容量</span>
              </div>
              <div class="stat-item" data-aos="zoom-in" data-aos-delay="900">
                <span class="stat-number">37.8</span>
                <span class="stat-label">亿kW·h 年发电量</span>
              </div>
              <div class="stat-item" data-aos="zoom-in" data-aos-delay="1000">
                <span class="stat-number">2012</span>
                <span class="stat-label">年全面投产</span>
              </div>
            </div>
          </div>
          <div class="overview-image" data-aos="fade-left" data-aos-duration="800">
            <!-- <img src="~/assets/images/banner1.png" alt="泸定水电站" /> -->
          </div>
        </div>
      </div>
    </section>

    <!-- 电站介绍 -->
    <section class="station-intro">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up" data-aos-duration="600">泸定水电站</h2>
        <div class="intro-grid">
          <div class="intro-card" data-aos="fade-up" data-aos-delay="200">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
              </svg>
            </div>
            <h3>地理位置</h3>
            <p>坐落于红军长征飞夺泸定桥名垂青史的红城泸定，位于甘孜藏族自治州大渡河干流中游，坝址距下游泸定县城2.5公里。</p>
          </div>
          <div class="intro-card" data-aos="fade-up" data-aos-delay="400">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
            <h3>重要意义</h3>
            <p>是汶川"5·12"特大地震后国家发改委核准的首个大型水电站，为大渡河干流规划调整推荐22级方案的第12个梯级电站。</p>
          </div>
          <div class="intro-card" data-aos="fade-up" data-aos-delay="600">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3>技术规格</h3>
            <p>电站装设四台混流式水轮发电机组，单机容量为230MW，总装机容量920MW，以500kV一级电压接入系统。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 发展历程 -->
    <section class="development-timeline">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up" data-aos-duration="600">发展历程</h2>
        <div class="timeline-container" data-aos="fade-up" data-aos-delay="200">
          <div class="timeline-navigation">
            <div class="nav-hint">
              <svg class="hint-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.71 6.71a.996.996 0 0 0-1.41 0L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z" />
              </svg>
              <span>横向滑动查看发展历程</span>
              <svg class="hint-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L9.71 6.71a.996.996 0 0 0-1.42 0z" />
              </svg>
            </div>
          </div>
          <div class="swiper timeline-swiper-container">
            <div class="swiper-wrapper">
              <div v-for="(item, index) in timelineData" :key="index" class="swiper-slide">
                <div class="timeline-card">
                  <div class="card-header">
                    <div class="timeline-badge">
                      <span class="step-number">{{ String(index + 1).padStart(2, "0") }}</span>
                    </div>
                    <div class="timeline-date">{{ item.date }}</div>
                  </div>
                  <div class="card-image">
                    <img :src="item.image" :alt="item.title" />
                    <div class="image-gradient"></div>
                  </div>
                  <div class="card-content">
                    <h3 class="timeline-title">{{ item.title }}</h3>
                    <p class="timeline-description">{{ item.description }}</p>
                    <div class="timeline-details">
                      <div v-for="detail in item.details" :key="detail" class="detail-item">
                        <svg class="check-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        <span>{{ detail }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </div>
            <div class="swiper-button-prev">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
            </div>
          </div>
          <div class="timeline-progress">
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
            <div class="progress-text">
              <span class="current-step">1</span> / <span class="total-steps">{{ timelineData.length }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Swiper as SwiperClass } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// 导入图片
import swiper1 from "~/assets/images/swiper/swiper-1.jpg"
import swiper2 from "~/assets/images/swiper/swiper-2.jpg"
import swiper3 from "~/assets/images/swiper/swiper-3.jpg"
import swiper4 from "~/assets/images/swiper/swiper-4.jpg"
import swiper5 from "~/assets/images/swiper/swiper-5.jpg"
import swiper6 from "~/assets/images/swiper/swiper-6.jpg"

// 设置页面标题
useHead({
  title: "公司简介 - 四川华电泸定水电有限公司",
  meta: [
    {
      name: "description",
      content: "四川华电泸定水电有限公司成立于2006年，负责泸定水电站的投资、建设和运营。总装机容量920MW，年发电量37.8亿kW·h。",
    },
  ],
})

// 发展历程数据
const timelineData = ref([
  {
    date: "2004年6月",
    title: "项目筹建",
    description: "电站开始筹建工作，标志着泸定水电站建设的正式启动",
    image: swiper1,
    details: ["完成项目前期调研", "组建项目筹建团队", "启动可行性研究"],
  },
  {
    date: "2005年12月",
    title: "前期工程开工",
    description: '"三通一平"等前期工程正式开工，为主体工程建设奠定基础',
    image: swiper2,
    details: ["完成场地平整", "建设临时道路", "完善基础设施"],
  },
  {
    date: "2006年6月",
    title: "公司成立",
    description: "四川华电泸定水电有限公司正式注册成立，由华电国际全资设立",
    image: swiper3,
    details: ["公司正式注册", "完善组织架构", "建立管理体系"],
  },
  {
    date: "2009年3月",
    title: "项目核准",
    description: "获得国家发改委项目核准，成为汶川地震后首个核准的大型水电站",
    image: swiper4,
    details: ["获得国家核准", "完成环保审批", "启动主体施工"],
  },
  {
    date: "2009年11月",
    title: "大江截流",
    description: "成功实现大江截流，这是水电站建设的重要里程碑节点",
    image: swiper5,
    details: ["完成截流工程", "实现水流改道", "确保施工安全"],
  },
  {
    date: "2011年10月",
    title: "首台机组投产",
    description: "首台机组成功投产发电，标志着电站开始发挥经济效益",
    image: swiper6,
    details: ["首台机组并网", "开始商业发电", "验证设备性能"],
  },
  {
    date: "2012年6月",
    title: "全面投产",
    description: "4台机组全部投入商业运营，电站建设目标全面实现",
    image: swiper1,
    details: ["全部机组投运", "达到设计容量", "进入稳定运营期"],
  },
  {
    date: "2014年7月",
    title: "远控中心投运",
    description: "成都远控中心正式投入运行，实现电站智能化管理",
    image: swiper2,
    details: ["智能化管理", "远程监控系统", "提升运营效率"],
  },
])

// 初始化Swiper
onMounted(() => {
  const _swiper = new SwiperClass(".timeline-swiper-container", {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: "auto",
    spaceBetween: 24,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      hideOnClick: false,
    },
    speed: 600,
    watchOverflow: true,
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    on: {
      init: function () {
        console.log("Swiper initialized")
      },
      slideChange: function (swiper) {
        const currentIndex = swiper.realIndex + 1
        const progressFill = document.querySelector(".progress-fill") as HTMLElement
        const currentStep = document.querySelector(".current-step") as HTMLElement

        if (progressFill && currentStep) {
          const progress = (currentIndex / timelineData.value.length) * 100
          progressFill.style.width = progress + "%"
          currentStep.textContent = currentIndex.toString()
        }
      },
    },
  })
})
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.company-intro {
  padding-top: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// 公司概况
.company-overview {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 80px 0;

  .overview-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;

    @media (max-width: $breakpoint-md) {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  .overview-text {
    .company-name {
      font-size: $font-size-4xl;
      font-weight: 700;
      color: $primary-color;
      margin-bottom: $spacing-lg;
      line-height: 1.2;
    }

    .company-description {
      font-size: $font-size-lg;
      color: $text-color;
      line-height: 1.8;
      margin-bottom: $spacing-2xl;
    }
  }

  .key-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-xl;

    @media (max-width: $breakpoint-sm) {
      grid-template-columns: 1fr;
      gap: $spacing-lg;
    }

    .stat-item {
      text-align: center;

      .stat-number {
        display: block;
        font-size: $font-size-3xl;
        font-weight: 700;
        color: $primary-color;
        margin-bottom: $spacing-sm;
      }

      .stat-label {
        font-size: $font-size-sm;
        color: $text-light;
        font-weight: 500;
      }
    }
  }

  .overview-image {
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: $border-radius-xl;
      box-shadow: $shadow-lg;
    }
  }
}

// 通用样式
.section-title {
  font-size: $font-size-3xl;
  font-weight: 700;
  color: $text-color;
  text-align: center;
  margin-bottom: $spacing-3xl;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: $primary-color;
    border-radius: 2px;
  }
}

// 电站介绍
.station-intro {
  padding: 80px 0;
  background: white;

  .intro-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-2xl;
  }

  .intro-card {
    background: white;
    padding: $spacing-2xl;
    border-radius: $border-radius-xl;
    box-shadow: $shadow-md;
    text-align: center;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: $shadow-xl;
    }

    .card-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto $spacing-lg;
      color: $primary-color;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    h3 {
      font-size: $font-size-xl;
      font-weight: 600;
      color: $text-color;
      margin-bottom: $spacing-md;
    }

    p {
      color: $text-light;
      line-height: 1.6;
    }
  }
}

// 发展历程 - 横向Swiper样式
.development-timeline {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);

  .timeline-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .timeline-navigation {
    margin-bottom: $spacing-xl;
    display: flex;
    justify-content: center;
    align-items: center;

    .nav-hint {
      display: flex;
      align-items: center;
      gap: $spacing-md;
      background: rgba(255, 255, 255, 0.9);
      padding: $spacing-md $spacing-xl;
      border-radius: $border-radius-xl;
      box-shadow: $shadow-md;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: pulse-hint 2s infinite;

      .hint-icon {
        width: 20px;
        height: 20px;
        color: $primary-color;
        animation: bounce-horizontal 1.5s infinite;
      }

      span {
        font-size: $font-size-sm;
        color: $text-color;
        font-weight: 500;
      }
    }
  }

  .timeline-swiper-container {
    padding: 0 70px;
    overflow: visible;
    position: relative;

    @media (max-width: $breakpoint-md) {
      padding: 0 60px;
    }
  }

  .swiper-slide {
    width: 320px !important;
    height: auto;

    @media (max-width: $breakpoint-md) {
      width: 280px !important;
    }
  }

  .timeline-card {
    background: white;
    border-radius: $border-radius-xl;
    overflow: hidden;
    box-shadow: $shadow-lg;
    transition: all 0.3s ease;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
      transform: translateY(-8px);
      box-shadow: $shadow-xl;
    }
  }

  .card-header {
    position: relative;
    background: linear-gradient(135deg, $primary-color, #3b82f6);
    padding: $spacing-lg;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .timeline-badge {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);

    .step-number {
      color: white;
      font-size: $font-size-base;
      font-weight: 700;
    }
  }

  .timeline-date {
    color: white;
    font-size: $font-size-lg;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .card-image {
    position: relative;
    height: 180px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .image-gradient {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
    }
  }

  .card-content {
    padding: $spacing-xl;
  }

  .timeline-title {
    font-size: $font-size-lg;
    font-weight: 700;
    color: $text-color;
    margin-bottom: $spacing-md;
    line-height: 1.3;
  }

  .timeline-description {
    font-size: $font-size-sm;
    color: $text-light;
    line-height: 1.6;
    margin-bottom: $spacing-lg;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .timeline-details {
    .detail-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: $spacing-sm;
      font-size: $font-size-xs;
      color: $text-color;

      .check-icon {
        width: 14px;
        height: 14px;
        color: #10b981;
        margin-right: $spacing-sm;
        flex-shrink: 0;
        margin-top: 2px;
      }

      span {
        line-height: 1.4;
      }
    }
  }

  .timeline-progress {
    margin-top: $spacing-xl;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;

    .progress-bar {
      width: 200px;
      height: 4px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, $primary-color, #3b82f6);
        width: 12.5%;
        transition: width 0.3s ease;
        border-radius: 2px;
      }
    }

    .progress-text {
      font-size: $font-size-sm;
      color: $text-color;
      font-weight: 500;

      .current-step {
        color: $primary-color;
        font-weight: 700;
      }
    }
  }

  // Swiper控件样式
  .swiper-pagination {
    position: relative !important;
    margin-top: $spacing-lg !important;

    .swiper-pagination-bullet {
      width: 8px !important;
      height: 8px !important;
      background: rgba(44, 104, 185, 0.3) !important;
      opacity: 1 !important;
      margin: 0 4px !important;
      transition: all 0.3s ease !important;

      &.swiper-pagination-bullet-active {
        background: $primary-color !important;
        transform: scale(1.5) !important;
      }
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 50px !important;
    height: 50px !important;
    background: rgba(255, 255, 255, 0.95) !important;
    border-radius: 50% !important;
    box-shadow: $shadow-lg !important;
    transition: all 0.3s ease !important;
    top: 50% !important;
    margin-top: -100px !important;
    z-index: 10 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    &:hover {
      background: white !important;
      transform: scale(1.1) !important;
      box-shadow: $shadow-xl !important;
    }

    svg {
      width: 24px;
      height: 24px;
      color: $primary-color;
      position: absolute;
    }

    &::after {
      content: none !important;
    }

    &.swiper-button-disabled {
      opacity: 0.3 !important;
      cursor: not-allowed !important;
    }
  }

  .swiper-button-next {
    right: 10px !important;
  }

  .swiper-button-prev {
    left: 10px !important;
  }
}

// 动画效果
@keyframes pulse-hint {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@keyframes bounce-horizontal {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(3px);
  }
}
</style>
