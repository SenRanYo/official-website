<template>
  <div class="index-swiper-slide-four">
    <p class="title">公司要闻</p>
    <div class="content">
      <!-- 右侧新闻列表 -->
      <div class="left-section" :class="{ 'slide-in-left': isVisible }">
        <div class="news-header">
          <span class="news-category active">公司要闻</span>
          <span class="more">更多</span>
        </div>

        <div class="news-list">
          <div class="news-item">
            <div class="news-date">
              <span class="day">12</span>
              <span class="month">2025.09</span>
            </div>
            <div class="news-content">
              <h4>中央第十生态环境保护督察组向中国华电集团有限公司反馈督察情况</h4>
            </div>
          </div>

          <div class="news-item">
            <div class="news-date">
              <span class="day">15</span>
              <span class="month">2025.09</span>
            </div>
            <div class="news-content">
              <h4>中国华电总部机关单位举办办公室工运动会</h4>
            </div>
          </div>

          <div class="news-item">
            <div class="news-date">
              <span class="day">12</span>
              <span class="month">2025.09</span>
            </div>
            <div class="news-content">
              <h4>中国华电召开党组织的建设工作领导小组（扩大）会议</h4>
            </div>
          </div>

          <div class="news-item">
            <div class="news-date">
              <span class="day">12</span>
              <span class="month">2025.09</span>
            </div>
            <div class="news-content">
              <h4>中国华电召开总部2025年优才计划新员工见面会</h4>
            </div>
          </div>

          <div class="news-item">
            <div class="news-date">
              <span class="day">05</span>
              <span class="month">2025.09</span>
            </div>
            <div class="news-content">
              <h4>吕军出席中马企业家家庭座谈会</h4>
            </div>
          </div>
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

// 进入时触发动画
function enter() {
  isVisible.value = true
}

// 离开时重置动画
function leave() {
  isVisible.value = false
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

        .news-category {
          margin-right: 16px;
          font-size: 18px;
          color: #333;
          cursor: pointer;
          position: relative;
          border-radius: 4px;
          transition: all 0.3s ease;

          &:hover {
            font-weight: bold;
          }

          &.active {
            font-weight: bold;
            &::after {
              content: "";
              position: absolute;
              left: 0;
              width: 30px;
              height: 3px;
              bottom: -10px;
              background-color: #1a5490;
            }
          }
        }

        .more {
          cursor: pointer;
          font-size: 14px;
          margin-left: auto;

          &:hover {
            color: $primary-color;
          }
        }
      }

      .news-list {
        padding: 0;

        .news-item {
          display: flex;
          padding: 15px 0;
          align-items: center;
          border-bottom: 1px solid #e5e5e5;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #f8f9fa;
          }

          &:last-child {
            border-bottom: none;
          }

          .news-date {
            color: #c4c4c4;
            display: flex;
            flex-direction: column;
            margin-right: 20px;

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

              &:hover {
                color: #1a5490;
              }
            }
          }
        }
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
