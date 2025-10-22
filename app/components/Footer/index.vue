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
          <h3 class="footer__column-title">新闻媒体</h3>
          <ul class="footer__column-list">
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">央视网</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">人民网</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">新华网</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">共产党员网</a>
            </li>
          </ul>
          <button class="footer__more">更多</button>
        </div>

        <!-- 华电网群 -->
        <div class="footer__column">
          <h3 class="footer__column-title">华电网群</h3>
          <ul class="footer__column-list">
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">集团公司门户网站</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">四川公司门户网站</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">OA办公平台</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">财务共享平台</a>
            </li>
          </ul>
          <button class="footer__more">更多</button>
        </div>

        <!-- 政府机构 -->
        <div class="footer__column">
          <h3 class="footer__column-title">政府机构</h3>
          <ul class="footer__column-list">
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">四川省人民政府网站</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">四川省人力资源和社会保障厅</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">四川省发展和改革委员会</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">甘孜藏族自治州人民政府网站</a>
            </li>
          </ul>
          <button class="footer__more">更多</button>
        </div>

        <!-- 系统链接 -->
        <div class="footer__column">
          <h3 class="footer__column-title">系统链接</h3>
          <ul class="footer__column-list">
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">华电集团门户网站</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">华电国际门户网站</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">四川分公司网站</a>
            </li>
            <li class="footer__item">
              <a href="javascript:void(0)" class="footer__link">集团公司OA系统</a>
            </li>
          </ul>
          <button class="footer__more">更多</button>
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
import qrcode from "~/assets/images/qrcode.webp"
import footerBg from "~/assets/images/footer-bg.webp"
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;

  // 背景
  &__bg {
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center bottom;
  }

  // 内容包裹
  &__wrapper {
    gap: 80px;
    width: 100%;
    display: flex;
    padding: 50px 160px;
    align-items: center;
    justify-content: space-between;
  }

  // 链接区域
  &__links {
    flex: 1;
    display: grid;
    gap: 60px;
    grid-template-columns: repeat(4, 1fr);
  }

  // 链接列
  &__column {
    gap: 20px;
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
  }

  // 列表
  &__column-list {
    gap: 12px;
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    flex-direction: column;
  }

  // 列表项
  &__item {
    list-style: none;
  }

  // 链接
  &__link {
    max-width: 160px;
    font-size: 18px;
    color: #666666;
    line-height: 1.5;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 300ms ease-in-out;

    &:hover {
      color: #108cf0;
    }
  }

  // 更多按钮
  &__more {
    border: none;
    padding: 0;
    margin-top: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #108cf0;
    text-align: left;
    display: block;
    cursor: pointer;
    background-color: transparent;
    transition: color 300ms ease-in-out;

    &:hover {
      color: #108cf0;
    }
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
