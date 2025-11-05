import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxt/image", "@nuxt/scripts", "@nuxt/test-utils", "nuxt-aos", "v-gsap-nuxt", "@pinia/nuxt"],

  css: ["~/assets/css/main.css"],

  // 配置不同环境的API地址
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://2444450wnth3.vicp.fun",
    },
  },
  ui: {
    fonts: false,
  },
  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/css/variables.scss" as *;
            @use "~/assets/css/mixins.scss" as *;
          `,
        },
      },
    },
  },

  pages: {
    pattern: ["**/*.vue", "!**/*.spec.*", "!components/**"],
  },

  postcss: {
    plugins: {
      "postcss-pxtorem": {
        rootValue: 16, // 基准值：1rem = 16px
        propList: ["*"], // 哪些属性需要转换
        minPixelValue: 2, // 小于2px的值不转换（防止边框问题）
        mediaQuery: true, // 媒体查询里的px也转换
        selectorBlackList: [], // 哪些选择器不应用转换
      },
    },
  },

  components: {
    dirs: [
      {
        path: "~/components",
        extensions: [".vue", ".ts"],
        pattern: "**/index.{vue,ts}",
        pathPrefix: false,
      },
    ],
  },

  aos: {
    // 全局设置:
    disable: false, // 禁用AOS，可接受的值：'phone'、'tablet'、'mobile'、布尔值、表达式或函数
    startEvent: "DOMContentLoaded", // 初始化AOS的文档事件名称
    initClassName: "aos-init", // 初始化后应用的类名
    animatedClassName: "aos-animate", // 动画时应用的类名
    useClassNames: false, // 如果为true，将data-aos的内容作为类名添加到滚动时
    disableMutationObserver: false, // 禁用自动突变检测（高级）
    debounceDelay: 50, // 调整窗口大小时的防抖延迟（高级）
    throttleDelay: 99, // 页面滚动时的节流延迟（高级）

    // 可以通过data-aos-*属性在每个元素基础上覆盖的设置：
    offset: 120, // 触发点的偏移量（像素）
    delay: 0, // 延迟值，0到3000，步长50ms
    duration: 400, // 持续时间，0到3000，步长50ms
    easing: "ease", // AOS动画的默认缓动函数
    once: false, // 动画是否只在向下滚动时触发一次
    mirror: false, // 元素在滚动经过时是否应该反向动画
    anchorPlacement: "top-bottom", // 定义元素相对于窗口的哪个位置触发动画
  },

  // 配置 Nitro 服务器代理以解决开发环境跨域问题
  nitro: {
    // 开发环境代理配置
    devProxy: {
      "/api": {
        target: "http://2444450wnth3.vicp.fun",
        changeOrigin: true,
        prependPath: true,
      },
    },
    // 生产环境代理配置 - 解决部署后的CORS问题
    routeRules: {
      "/api/**": {
        proxy: "http://2444450wnth3.vicp.fun/**",
      },
      "/uploads/**": {
        proxy: "http://2444450wnth3.vicp.fun/**",
      },
    },
  },
})
