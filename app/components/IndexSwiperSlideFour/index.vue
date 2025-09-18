<template>
  <div class="index-swiper-slide-four">
    <p class="title">新闻资讯</p>
    <div class="content">
      <!-- 左侧新闻列表 -->
      <div class="left-section" :class="{ 'slide-in-left': isVisible }">
        <div class="news-header">
          <span v-for="category in categories" :key="category.id" class="news-category" :class="{ active: activeCategory === category.id }" @click="switchCategory(category.id)">
            {{ category.name }}
          </span>
          <span class="more">更多</span>
        </div>

        <div class="news-list-container">
          <transition name="news-fade" mode="out-in">
            <div :key="activeCategory" class="news-list">
              <div
                v-for="(item, index) in currentNews"
                :key="`${activeCategory}-${index}`"
                class="news-item"
                :class="{ 'item-enter': newsVisible }"
                :style="{ transitionDelay: `${index * 0.1}s` }"
              >
                <div class="news-date">
                  <span class="day">{{ item.day }}</span>
                  <span class="month">{{ item.month }}</span>
                </div>
                <div class="news-content">
                  <h4>{{ item.title }}</h4>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <!-- 左侧轮播图 -->
      <div class="right-section" :class="{ 'slide-in-right': isVisible }">
        <p class="card-title">媒体关注</p>
        <div class="card-content">
          <div class="content">
            <img :src="banner" alt="" />
            <div class="text">中央第十生态环境保护督察组向中国华电集团有限公司反馈督察情况</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import banner from "~/assets/images/banner1.jpg"

const isVisible = ref(false)
const newsVisible = ref(false)
const activeCategory = ref("company")

// 分类定义
const categories = ref([
  { id: "company", name: "公司要闻" },
  { id: "media", name: "媒体关注" },
  { id: "industry", name: "行业动态" },
  { id: "innovation", name: "技术创新" },
  { id: "culture", name: "企业文化" },
])

// 模拟新闻数据
const newsData = ref({
  company: [
    { day: "12", month: "2025.09", title: "中央第十生态环境保护督察组向中国华电集团有限公司反馈督察情况" },
    { day: "15", month: "2025.09", title: "中国华电总部机关单位举办办公室工运动会" },
    { day: "12", month: "2025.09", title: "中国华电召开党组织的建设工作领导小组（扩大）会议" },
    { day: "12", month: "2025.09", title: "中国华电召开总部2025年优才计划新员工见面会" },
    { day: "05", month: "2025.09", title: "吕军出席中马企业家家庭座谈会" },
  ],
  media: [
    { day: "18", month: "2025.09", title: "央视新闻：中国华电绿色转型发展成效显著" },
    { day: "16", month: "2025.09", title: '人民日报：华电集团助力"双碳"目标实现' },
    { day: "14", month: "2025.09", title: "经济日报：华电新能源项目建设加速推进" },
    { day: "13", month: "2025.09", title: "光明日报：华电科技创新驱动高质量发展" },
    { day: "10", month: "2025.09", title: "新华社：华电清洁能源装机容量再创新高" },
  ],
  industry: [
    { day: "17", month: "2025.09", title: "国家能源局发布新能源发展指导意见" },
    { day: "15", month: "2025.09", title: "电力行业数字化转型加速，智能电网建设提速" },
    { day: "14", month: "2025.09", title: "碳中和目标推动清洁能源产业快速发展" },
    { day: "12", month: "2025.09", title: "储能技术突破为新能源发展注入新动力" },
    { day: "08", month: "2025.09", title: "全国电力供需形势分析及发展趋势预测" },
  ],
  innovation: [
    { day: "16", month: "2025.09", title: "华电自主研发的智能发电系统正式投运" },
    { day: "14", month: "2025.09", title: "公司海上风电技术取得重大突破" },
    { day: "13", month: "2025.09", title: "华电数字化平台助力运营效率提升" },
    { day: "11", month: "2025.09", title: "新型储能技术在华电项目中成功应用" },
    { day: "09", month: "2025.09", title: "华电与高校合作推进前沿技术研发" },
  ],
  culture: [
    { day: "15", month: "2025.09", title: '华电举办"安全生产月"主题活动' },
    { day: "13", month: "2025.09", title: '公司开展"青年员工技能大赛"' },
    { day: "12", month: "2025.09", title: "华电志愿者服务队走进社区送温暖" },
    { day: "10", month: "2025.09", title: "企业文化建设助力公司高质量发展" },
    { day: "08", month: "2025.09", title: "华电员工荣获行业技能竞赛一等奖" },
  ],
})

// 当前显示的新闻
const currentNews = computed(() => {
  return newsData.value[activeCategory.value as keyof typeof newsData.value] || []
})

// 切换分类
const switchCategory = (categoryId: string) => {
  if (categoryId === activeCategory.value) return

  newsVisible.value = false

  setTimeout(() => {
    activeCategory.value = categoryId
    setTimeout(() => {
      newsVisible.value = true
    }, 50)
  }, 150)
}

// 进入时触发动画
function enter() {
  isVisible.value = true
  setTimeout(() => {
    newsVisible.value = true
  }, 800)
}

// 离开时重置动画
function leave() {
  isVisible.value = false
  newsVisible.value = false
}

defineExpose({
  enter,
  leave,
})
</script>

<style scoped lang="scss">
.index-swiper-slide-four {
  height: 100%;
  display: flex;
  padding: 0 12.5%;
  padding-top: 120px;
  flex-direction: column;
  background-color: #ffffff;

  .title {
    font-size: 24px;
    color: $primary-color;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60px;
  }

  .content {
    gap: 30px;
    height: 430px;
    display: flex;
    .left-section {
      flex: 1;
      overflow: hidden;
      opacity: 0;
      transform: translateX(-50px);
      transition: all 0.8s ease;

      &.slide-in-left {
        opacity: 1;
        transform: translateX(0);
      }

      .news-header {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
        flex-wrap: wrap;
        gap: 8px;

        .news-category {
          margin-right: 16px;
          font-size: 16px;
          color: #666;
          cursor: pointer;
          position: relative;
          padding: 8px 12px;
          transition: all 0.3s ease;
          white-space: nowrap;

          &:hover {
            color: #1a5490;
          }

          &.active {
            color: #1a5490;
            font-weight: bold;

            &::after {
              content: "";
              position: absolute;
              left: 50%;
              bottom: 0;
              width: 24px;
              height: 3px;
              background-color: #1a5490;
              transform: translateX(-50%);
              border-radius: 2px;
            }
          }
        }

        .more {
          cursor: pointer;
          font-size: 14px;
          color: #999;
          margin-left: auto;
          padding: 8px 12px;
          border-radius: 20px;
          transition: all 0.3s ease;

          &:hover {
            color: $primary-color;
            background-color: rgba(26, 84, 144, 0.1);
          }
        }
      }

      .news-list-container {
        overflow: hidden;
      }

      .news-list {
        padding: 0;

        .news-item {
          display: flex;
          padding: 15px 0;
          align-items: center;
          border-bottom: 1px solid #e5e5e5;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease;

          &.item-enter {
            opacity: 1;
            transform: translateY(0);
          }

          &:hover {
            background-color: #f8f9fa;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          &:last-child {
            border-bottom: none;
          }

          .news-date {
            color: #c4c4c4;
            display: flex;
            flex-direction: column;
            margin-right: 20px;
            transition: color 0.3s ease;

            .day {
              font-size: 24px;
              font-weight: bold;
              line-height: 1;
            }

            .month {
              font-size: 12px;
              margin-top: 4px;
            }
          }

          .news-content {
            flex: 1;

            h4 {
              margin: 0;
              font-size: 16px;
              line-height: 1.5;
              color: #333;
              font-weight: 500;
              cursor: pointer;
              transition: color 0.3s ease;

              &:hover {
                color: #1a5490;
              }
            }
          }

          &:hover .news-date {
            color: #1a5490;
          }
        }
      }

      // 过渡动画
      .news-fade-enter-active,
      .news-fade-leave-active {
        transition: all 0.3s ease;
      }

      .news-fade-enter-from {
        opacity: 0;
        transform: translateX(30px);
      }

      .news-fade-leave-to {
        opacity: 0;
        transform: translateX(-30px);
      }
    }

    .right-section {
      width: 400px;
      padding: 30px;
      overflow: hidden;
      position: relative;
      border-radius: 16px;
      background-color: #f9f9f9;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transform: translateX(50px);
      transition: all 0.8s ease;

      &.slide-in-right {
        opacity: 1;
        transform: translateX(0);
      }
      .card-title {
        font-size: 18px;
        color: $primary-color;
        margin-top: 0;
        font-weight: bold;
        text-align: center;
      }
      .card-content {
        padding: 20px;
        border: 1px solid #e5e5e5;
        background-color: #fff;
        .content {
          width: 300px;
          height: 170px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .text {
            width: 100%;
            position: absolute;
            bottom: 0;
            z-index: 99;
            height: 50px;
            font-size: 14px;
            background: rgba(0, 80, 165, 0.7);
            padding: 0 10px;
            display: flex;
            color: #fff;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
</style>
