# 官方网站

一个基于 Nuxt 4 构建的现代化企业官方网站，采用 Vue 3 + TypeScript + Tailwind CSS 技术栈。

## 🚀 技术栈

- **框架**: [Nuxt 4](https://nuxt.com/) - Vue.js 全栈框架
- **前端**: [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/) + [UnoCSS](https://unocss.dev/) + SCSS
- **UI 组件**: [@nuxt/ui](https://ui.nuxt.com/)
- **动画**: [AOS](https://michalsnik.github.io/aos/) + [GSAP](https://greensock.com/gsap/)
- **图标**: [Lucide Vue Next](https://lucide.dev/)
- **代码规范**: ESLint + Prettier
- **包管理**: pnpm

## 📁 项目结构

```
official-website/
├── app/
│   ├── components/          # 可复用组件
│   │   ├── Banner/          # 横幅组件
│   │   ├── Breadcrumb/      # 面包屑导航
│   │   ├── Footer/          # 页脚组件
│   │   ├── Header/          # 页头组件
│   │   └── NewsDetail/      # 新闻详情组件
│   ├── layouts/             # 布局模板
│   │   └── default.vue      # 默认布局
│   ├── pages/               # 页面路由
│   │   ├── index.vue        # 首页
│   │   ├── about.vue        # 关于我们
│   │   ├── gsgk/            # 公司概况
│   │   │   ├── dsj.vue      # 董事长致辞
│   │   │   └── gsjj.vue     # 公司简介
│   │   ├── news/            # 新闻中心
│   │   │   ├── company-news.vue     # 公司新闻
│   │   │   ├── industry-trends.vue  # 行业动态
│   │   │   └── media-focus.vue      # 媒体聚焦
│   │   └── party/           # 党建工作
│   │       ├── integrity-building.vue  # 廉政建设
│   │       ├── party-building.vue      # 党建工作
│   │       └── union-youth.vue         # 工会青年
│   ├── assets/              # 静态资源
│   │   ├── css/             # 样式文件
│   │   └── images/          # 图片资源
│   ├── composables/         # 组合式函数
│   │   └── useMenuData.ts   # 菜单数据管理
│   ├── store/               # 状态管理
│   └── utils/               # 工具函数
├── public/                  # 公共静态文件
├── nuxt.config.ts          # Nuxt 配置文件
├── package.json            # 项目依赖配置
├── tsconfig.json           # TypeScript 配置
├── uno.config.ts           # UnoCSS 配置
└── eslint.config.mjs       # ESLint 配置
```

## 🛠️ 开发环境设置

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

### 生成静态站点

```bash
pnpm generate
```

## 📝 代码规范

### 格式化代码

```bash
# 格式化所有文件
pnpm format

# 检查代码格式
pnpm format:check
```

### 代码检查

```bash
# 运行 ESLint
pnpm lint

# 自动修复 ESLint 问题
pnpm lint:fix
```

## ✨ 主要功能

- 🏠 **首页**: 展示安全生产无事故天数计数器
- 📋 **公司概况**: 包含董事长致辞和公司简介
- 📰 **新闻中心**: 公司新闻、行业动态、媒体聚焦
- 🏛️ **党建工作**: 党建工作、廉政建设、工会青年
- 📱 **响应式设计**: 适配各种设备屏幕
- 🎨 **现代化UI**: 使用 Tailwind CSS 和 Nuxt UI 组件
- ⚡ **性能优化**: 基于 Nuxt 4 的服务端渲染和静态生成
- 🎭 **动画效果**: AOS 滚动动画和 GSAP 交互动画

## 🔧 配置说明

### Nuxt 配置

项目使用 Nuxt 4 的最新特性，包括：
- 自动导入组件和组合式函数
- 服务端渲染 (SSR)
- 静态站点生成 (SSG)
- 图片优化
- SEO 优化

### 样式配置

- **Tailwind CSS 4**: 现代化的原子化 CSS 框架
- **UnoCSS**: 即时按需的原子化 CSS 引擎
- **SCSS**: 支持变量和混入
- **响应式设计**: 移动端优先的设计理念

### 动画配置

- **AOS**: 滚动触发动画，配置了全局设置
- **GSAP**: 高性能的 JavaScript 动画库

