import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/scripts", "@nuxt/test-utils", "@nuxt/ui", "@unocss/nuxt", "nuxt-aos", "v-gsap-nuxt", "@pinia/nuxt"],

  css: ["~/assets/css/main.scss"],
  plugins: ["~/plugins/rem"],

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

  postcss: {
    plugins: {
      "postcss-pxtorem": {
        rootValue: 100, // 指定转换倍率，我现在设置这个表示1rem=37.5px;
        propList: ["*"], // 属性列表，表示你要把哪些css属性的px转换成rem，这个*表示所有
        mediaQuery: true, // 是否允许使用媒体查询，false媒体查询的代码可用，true不可用
        exclude: "ignore",
        replace: true, // 替换包含rem的规则，而不是添加回退
        minPixelValue: 1, // 需要转换的最小值，一般1px像素不转换，以上才转换
        unitPrecision: 6, // 转换成rem单位的小数点后的保留位数
        selectorBalckList: ["van", "el"], // 匹配不被转换为rem的选择器
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
})
