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
import { ref, onMounted, watch } from "vue"
import { articlePageListByAlias } from "~/api"
import qrcode from "~/assets/images/qrcode.webp"
import footerBg from "~/assets/images/footer-bg.png"

const mediaItems = ref<any[]>([])
const mediaValue = ref("")
const mediaData = ref<any[]>([])

const networkItems = ref<any[]>([])
const networkValue = ref("")
const networkData = ref<any[]>([])

const governmentItems = ref<any[]>([])
const governmentValue = ref("")
const governmentData = ref<any[]>([])

const systemItems = ref<any[]>([])
const systemValue = ref("")
const systemData = ref<any[]>([])

const openLink = (url: string) => {
  if (url) {
    window.open(url, "_blank")
  }
}

const handleMediaChange = () => {
  const item = mediaData.value.find((i: any) => (i.name || i.title) === mediaValue.value)
  if (item?.description) {
    openLink(item.description)
  }
}

const handleNetworkChange = () => {
  const item = networkData.value.find((i: any) => (i.name || i.title) === networkValue.value)
  if (item?.description) {
    openLink(item.description)
  }
}

const handleGovernmentChange = () => {
  const item = governmentData.value.find((i: any) => (i.name || i.title) === governmentValue.value)
  if (item?.description) {
    openLink(item.description)
  }
}

const handleSystemChange = () => {
  const item = systemData.value.find((i: any) => (i.name || i.title) === systemValue.value)
  if (item?.description) {
    openLink(item.description)
  }
}

const fetchLinkData = async () => {
  try {
    const [media, network, government, system] = await Promise.all([
      articlePageListByAlias({ alias: "xinwenmeiti" }),
      articlePageListByAlias({ alias: "huadianwangqun" }),
      articlePageListByAlias({ alias: "zhenfujigou" }),
      articlePageListByAlias({ alias: "jituanwangqun" }),
    ])

    mediaData.value = media || []
    networkData.value = network || []
    governmentData.value = government || []
    systemData.value = system || []

    mediaItems.value = mediaData.value.map((item: any) => item.name || item.title)
    networkItems.value = networkData.value.map((item: any) => item.name || item.title)
    governmentItems.value = governmentData.value.map((item: any) => item.name || item.title)
    systemItems.value = systemData.value.map((item: any) => item.name || item.title)

    mediaValue.value = mediaItems.value[0] || ""
    networkValue.value = networkItems.value[0] || ""
    governmentValue.value = governmentItems.value[0] || ""
    systemValue.value = systemItems.value[0] || ""
  } catch (error) {
    console.error("Failed to fetch footer links:", error)
  }
}

watch(mediaValue, handleMediaChange)
watch(networkValue, handleNetworkChange)
watch(governmentValue, handleGovernmentChange)
watch(systemValue, handleSystemChange)

onMounted(() => {
  fetchLinkData()
})
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
