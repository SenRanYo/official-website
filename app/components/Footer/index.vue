<template>
  <div class="footer">
    <!-- 背景 -->
    <div class="footer__bg" :style="{ backgroundImage: `url(${footerBg})` }" />

    <!-- 内容区域 -->
    <div class="footer__wrapper">
      <!-- 链接区域 -->
      <div class="footer__links">
        <!-- 新闻媒体 -->
        <div class="footer__column">
          <USelect v-model="mediaValue" :items="mediaItems" />
        </div>

        <!-- 华电网群 -->
        <div class="footer__column">
          <USelect v-model="networkValue" :items="networkItems" />
        </div>

        <!-- 政府机构 -->
        <div class="footer__column">
          <USelect v-model="governmentValue" :items="governmentItems" />
        </div>

        <!-- 系统链接 -->
        <div class="footer__column">
          <USelect v-model="systemValue" :items="systemItems" />
        </div>
      </div>

      <!-- 二维码 -->
      <div class="footer__qrcode">
        <img :src="qrcode" alt="QR Code" class="footer__qrcode-img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import qrcode from "~/assets/images/qrcode.webp"
import footerBg from "~/assets/images/footer-bg.png"

// 新闻媒体
const mediaItems = ref(["央视网", "人民网", "新华网", "共产党员网"])
const mediaValue = ref("央视网")

// 华电网群
const networkItems = ref(["集团公司门户网站", "四川公司门户网站", "OA办公平台", "财务共享平台"])
const networkValue = ref("集团公司门户网站")

// 政府机构
const governmentItems = ref(["四川省人民政府网站", "四川省人力资源和社会保障厅", "四川省发展和改革委员会", "甘孜藏族自治州人民政府网站"])
const governmentValue = ref("四川省人民政府网站")

// 系统链接
const systemItems = ref(["华电集团门户网站", "华电国际门户网站", "四川分公司网站", "集团公司OA系统"])
const systemValue = ref("华电集团门户网站")
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  display: flex;
  position: relative;
  padding-bottom: 50px;
  justify-content: center;

  // 背景
  &__bg {
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  // 内容包裹
  &__wrapper {
    gap: 150px;
    width: 100%;
    display: flex;
    padding: 50px 160px;
    align-items: center;
    justify-content: space-between;
  }

  // 链接区域
  &__links {
    flex: 1;
    gap: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  // 链接列
  &__column {
    gap: 12px;
    display: flex;
    flex-direction: column;
  }

  // 列标题
  &__column-title {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: #333333;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  // 二维码
  &__qrcode {
    width: 150px;
    height: 150px;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
  }

  // 二维码图片
  &__qrcode-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
