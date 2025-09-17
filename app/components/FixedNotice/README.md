# FixedNotice 组件使用说明

## 组件简介

`FixedNotice` 是一个固定在页面右下角的公告循环滚动组件，支持自动滚动、hover暂停、点击跳转等功能。

## 功能特性

- ✅ **固定定位**：组件固定在页面右下角，不影响页面布局
- ✅ **循环滚动**：公告列表自动无缝循环滚动
- ✅ **交互控制**：支持展开/收起切换
- ✅ **hover暂停**：鼠标悬停时暂停滚动
- ✅ **点击跳转**：点击公告项可跳转到详细页面
- ✅ **响应式设计**：自动适配移动端尺寸
- ✅ **深色模式**：支持系统深色模式
- ✅ **可配置性**：支持多种配置选项

## Props 配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `notices` | `NoticeItem[]` | `[]` | 公告数据列表 |
| `scrollSpeed` | `number` | `30` | 滚动速度（像素/秒） |
| `autoScroll` | `boolean` | `true` | 是否自动滚动 |
| `maxHeight` | `string` | `'240px'` | 展开时的最大高度 |

## NoticeItem 数据结构

```typescript
interface NoticeItem {
  id: string | number     // 唯一标识符
  title: string          // 公告标题
  date: string          // 发布日期 (YYYY-MM-DD 格式)
  url?: string          // 可选：跳转链接
}
```

## 基础使用

### 1. 使用默认数据

```vue
<template>
  <FixedNotice />
</template>
```

### 2. 自定义公告数据

```vue
<template>
  <FixedNotice :notices="customNotices" />
</template>

<script setup>
const customNotices = [
  {
    id: 1,
    title: '重要系统维护通知',
    date: '2024-01-20',
    url: '/notice/system-maintenance'
  },
  {
    id: 2,
    title: '新功能发布公告',
    date: '2024-01-18',
    url: '/notice/new-features'
  }
]
</script>
```

### 3. 自定义配置

```vue
<template>
  <FixedNotice 
    :notices="notices"
    :scroll-speed="50"
    :auto-scroll="true"
    max-height="300px"
  />
</template>
```

## 在布局中使用

推荐在 `layouts/default.vue` 中添加组件，这样所有页面都会显示：

```vue
<template>
  <div>
    <LayoutHeader />
    <main>
      <slot />
    </main>
    <LayoutFooter />
    
    <!-- 固定公告组件 -->
    <FixedNotice />
  </div>
</template>
```

## 样式自定义

组件支持通过 CSS 变量进行样式自定义：

```scss
// 在你的全局样式中
:root {
  --notice-primary-color: #your-color;
  --notice-shadow: your-shadow;
  --notice-border-radius: your-radius;
}
```

## 移动端适配

组件已自动适配移动端：
- 在小屏幕设备上宽度调整为 280px
- 左右边距相应缩小
- 触摸交互优化

## 无障碍访问

组件已集成无障碍访问支持：
- 键盘导航支持
- 屏幕阅读器友好
- 合适的 ARIA 标签

## API 方法

组件暴露以下方法（通过 ref 访问）：

```vue
<template>
  <FixedNotice ref="noticeRef" />
</template>

<script setup>
const noticeRef = ref()

// 手动开始滚动
noticeRef.value.startScroll()

// 手动停止滚动
noticeRef.value.stopScroll()

// 切换展开状态
noticeRef.value.toggleExpand()
</script>
```

## 注意事项

1. **数据更新**：如果需要动态更新公告数据，确保传入的 `notices` 是响应式的
2. **性能优化**：组件内部已做了性能优化，包括虚拟滚动和动画优化
3. **浏览器兼容**：支持现代浏览器，IE11+ 
4. **Z-index**：组件的 z-index 为 1000，确保不被其他元素遮挡

## 常见问题

### Q: 如何修改滚动方向？
A: 目前组件只支持垂直向上滚动，如需其他方向可修改 `scrollOffset` 计算逻辑。

### Q: 如何禁用自动滚动？
A: 设置 `auto-scroll="false"` 即可禁用自动滚动。

### Q: 如何自定义样式主题？
A: 可以通过覆盖 SCSS 变量或直接修改组件样式文件。

### Q: 组件会影响页面性能吗？
A: 不会，组件使用了 `will-change` 和 `transform` 进行硬件加速，性能优化良好。
