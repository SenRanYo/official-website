<template>
  <div class="vertical-swiper-container">
    <!-- Swiper容器 -->
    <div ref="swiperContainer" class="swiper-container">
      <!-- 滑块容器 -->
      <div class="swiper-wrapper">
        <!-- 第一个滑块 -->
        <div class="swiper-slide">
          <img src="https://picsum.photos/id/1015/1920/1080" alt="山脉风景" class="slide-bg" />
          <div class="slide-overlay bg-dark/50"></div>
          <div class="slide-content">
            <h1 class="text-[clamp(2.5rem,6vw,4rem)] font-bold mb-6 text-shadow-lg opacity-0 translate-y-8 transition-all duration-1000">探索世界</h1>
            <p class="text-[clamp(1rem,2vw,1.25rem)] mb-8 text-shadow max-w-2xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 delay-300">
              每一次滚动都是一次新的旅程，发现地球上令人惊叹的美景和奇迹。
            </p>
            <button
              class="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 opacity-0 translate-y-8 transition-all duration-1000 delay-500"
            >
              开始探索 <i class="fa fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- 第二个滑块 -->
        <div class="swiper-slide">
          <img src="https://picsum.photos/id/1036/1920/1080" alt="森林风景" class="slide-bg" />
          <div class="slide-overlay bg-dark/60"></div>
          <div class="slide-content">
            <h2 class="text-[clamp(2rem,5vw,3.5rem)] font-bold mb-6 text-shadow-lg opacity-0 translate-y-8 transition-all duration-1000">自然之美</h2>
            <p class="text-[clamp(1rem,2vw,1.25rem)] mb-8 text-shadow max-w-2xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 delay-300">
              沉浸在大自然的怀抱中，感受森林的宁静与生命力的蓬勃。
            </p>
            <div class="flex justify-center gap-4 opacity-0 translate-y-8 transition-all duration-1000 delay-500">
              <div class="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-all">
                <i class="fa fa-tree text-3xl mb-2"></i>
                <p>生态系统</p>
              </div>
              <div class="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-all">
                <i class="fa fa-leaf text-3xl mb-2"></i>
                <p>生物多样性</p>
              </div>
              <div class="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-all">
                <i class="fa fa-tint text-3xl mb-2"></i>
                <p>水资源</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 第三个滑块 -->
        <div class="swiper-slide">
          <img src="https://picsum.photos/id/1039/1920/1080" alt="湖泊风景" class="slide-bg" />
          <div class="slide-overlay bg-dark/40"></div>
          <div class="slide-content">
            <h2 class="text-[clamp(2rem,5vw,3.5rem)] font-bold mb-6 text-shadow-lg opacity-0 translate-y-8 transition-all duration-1000">水域奇观</h2>
            <p class="text-[clamp(1rem,2vw,1.25rem)] mb-8 text-shadow max-w-2xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 delay-300">
              探索地球上最壮观的水域景观，从宁静的湖泊到壮阔的海洋。
            </p>
            <div class="relative w-full max-w-2xl mx-auto h-48 rounded-lg overflow-hidden shadow-xl opacity-0 translate-y-8 transition-all duration-1000 delay-500">
              <img src="https://picsum.photos/id/1037/800/400" alt="水下景观" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent flex items-end p-4">
                <p>探索水下世界的神秘与美丽</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 第四个滑块 -->
        <div class="swiper-slide bg-dark">
          <div class="slide-content">
            <h2 class="text-[clamp(2rem,5vw,3.5rem)] font-bold mb-6 text-shadow-lg opacity-0 translate-y-8 transition-all duration-1000">旅程结束</h2>
            <p class="text-[clamp(1rem,2vw,1.25rem)] mb-8 text-shadow max-w-2xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 delay-300">
              感谢您的浏览，希望这次虚拟旅程带给您美好的体验。
            </p>
            <button
              class="bg-accent hover:bg-accent/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 opacity-0 translate-y-8 transition-all duration-1000 delay-500"
              @click="restartSwiper"
            >
              重新开始 <i class="fa fa-refresh ml-2"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 滚动提示 -->
      <div class="scroll-indicator text-white">
        <i class="fa fa-angle-down text-3xl"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/bundle"
import "swiper/css/bundle"

export default {
  name: "VerticalSwiper",
  data() {
    return {
      swiper: null,
    }
  },
  mounted() {
    // 初始化Swiper
    this.swiper = new Swiper(this.$refs.swiperContainer, {
      // 垂直滚动
      direction: "vertical",
      // 每次滚动一页
      slidesPerView: 1,
      // 启用鼠标滚轮控制
      mousewheel: {
        enabled: true,
        sensitivity: 1, // 灵敏度，值越小越灵敏
      },
      // 禁用触摸滑动
      touchEventsTarget: "wrapper",
      simulateTouch: false,
      // 禁用默认导航按钮和分页器
      navigation: false,
      pagination: false,
      // 过渡效果
      effect: "slide",
      speed: 800, // 过渡速度，毫秒
      // 初始化第一个滑块的动画
      on: {
        init: () => {
          this.animateSlide(0)
        },
        // 滑动结束后执行动画
        slideChangeTransitionEnd: (swiper) => {
          this.animateSlide(swiper.activeIndex)

          // 最后一页隐藏滚动提示
          const scrollIndicator = document.querySelector(".scroll-indicator")
          if (swiper.activeIndex === swiper.slides.length - 1) {
            scrollIndicator.style.opacity = "0"
          } else {
            scrollIndicator.style.opacity = "1"
          }
        },
      },
    })
  },
  beforeUnmount() {
    // 销毁Swiper实例，避免内存泄漏
    if (this.swiper) {
      this.swiper.destroy()
    }
  },
  methods: {
    // 为每个滑块添加入场动画
    animateSlide(index) {
      const activeSlide = document.querySelectorAll(".swiper-slide")[index]
      const animatedElements = activeSlide.querySelectorAll(".opacity-0")

      animatedElements.forEach((el) => {
        // 重置动画状态
        el.style.opacity = "0"
        el.style.transform = "translateY(20px)"

        // 触发重绘
        void el.offsetWidth

        // 应用动画
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      })
    },

    // 重新开始滑动
    restartSwiper() {
      this.swiper.slideTo(0, 1000) // 滑动到第一页，1秒过渡
    },
  },
}
</script>

<style scoped>
/* 基础样式 */
html,
body {
  height: 100%;
  overflow: hidden; /* 隐藏默认滚动条 */
  touch-action: none; /* 禁用触摸操作，确保只响应鼠标滚轮 */
}

/* Swiper容器样式 */
.swiper-container {
  width: 100%;
  height: 100vh;
}

/* 每个滑块占满全屏 */
.swiper-slide {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* 背景图样式 */
.slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* 背景遮罩 */
.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* 内容容器 */
.slide-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
}

/* 滚动提示样式 */
.scroll-indicator {
  position: fixed;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
  z-index: 100;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-20px);
  }
  60% {
    transform: translateX(-50%) translateY(-10px);
  }
}
</style>
