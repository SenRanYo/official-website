<template>
  <div class="index-swiper-slide-three">
    <!-- 顶部模块标签 -->
    <div class="module-tabs" :class="{ 'tabs-visible': isVisible }">
      <div v-for="module in moduleList" :key="module.id" class="tab-item" :class="{ active: selectedModule === module.id }" @click="selectModule(module.id)">
        <span class="tab-text">{{ module.name }}</span>
        <span class="tab-count">{{ getModuleTotalCount(module.id) }}</span>
      </div>
    </div>

    <div class="content">
      <!-- 左侧年份目录 -->
      <div class="year-sidebar" :class="{ 'sidebar-visible': isVisible }">
        <div class="year-list">
          <div v-for="year in currentModuleYears" :key="year.year" class="year-item" :class="{ active: selectedYear === year.year }" @click="selectYear(year.year)">
            <span class="year-text">{{ year.year }}</span>
            <span class="year-count">{{ year.count }}项</span>
          </div>
        </div>
      </div>

      <!-- 右侧内容列表 -->
      <div class="content-main" :class="{ 'main-visible': isVisible }">
        <div v-if="isLoading" class="loading-overlay">
          <div class="loading-spinner"></div>
        </div>

        <!-- 空状态提示 -->
        <div v-if="!selectedModule || !selectedYear" class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
              stroke="#d1d5db"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <polyline points="14,2 14,8 20,8" stroke="#d1d5db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h3>请选择模块和年份</h3>
          <p>点击左侧模块，然后选择年份查看文件列表</p>
        </div>

        <!-- 文件列表 -->
        <transition-group v-else-if="!isLoading" name="list" tag="div" class="file-list" @before-enter="beforeEnter" @enter="enterItem">
          <div v-for="(file, index) in currentFileData" :key="`${selectedModule}-${selectedYear}-${file.id}`" class="file-item" :data-index="index">
            <div class="file-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="file-info">
              <h3 class="file-name">{{ file.fileName }}</h3>
              <p class="file-description">{{ file.description }}</p>
            </div>
            <div class="file-meta">
              <span class="file-size">{{ file.size }}</span>
              <span class="file-date">{{ file.date }}</span>
            </div>
            <div class="file-actions">
              <button class="action-btn view-btn" title="查看" @click="viewFile(file)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <button class="action-btn download-btn" title="下载" @click="downloadFile(file)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 数据接口定义
interface ModuleData {
  id: string
  name: string
}

interface YearData {
  year: string
  count: number
}

interface FileItem {
  id: number
  fileName: string
  description: string
  date: string
  size: string
  type: string
  url?: string
}

// 控制动画状态的响应式变量
const isVisible = ref(false)
const isLoading = ref(false)
const selectedModule = ref<string>("")
const selectedYear = ref<string>("")

// 模块数据
const moduleList = ref<ModuleData[]>([
  { id: "party-central", name: "党中央重要精神" },
  { id: "company-speech", name: "上级公司讲话" },
  { id: "safety-production", name: "安全生产" },
  { id: "discipline-supervision", name: "纪检监督" },
])

// 每个模块的年份数据
const moduleYearData = ref<Record<string, YearData[]>>({
  "party-central": [
    { year: "2024", count: 8 },
    { year: "2023", count: 6 },
    { year: "2022", count: 4 },
  ],
  "company-speech": [
    { year: "2024", count: 5 },
    { year: "2023", count: 7 },
    { year: "2022", count: 3 },
  ],
  "safety-production": [
    { year: "2024", count: 10 },
    { year: "2023", count: 8 },
    { year: "2022", count: 5 },
  ],
  "discipline-supervision": [
    { year: "2024", count: 4 },
    { year: "2023", count: 3 },
    { year: "2022", count: 2 },
  ],
})

// 文件数据 - 三层结构: 模块 -> 年份 -> 文件
const allData = ref<Record<string, Record<string, FileItem[]>>>({
  "party-central": {
    "2024": [
      {
        id: 1,
        fileName: "习近平总书记关于高质量发展重要讲话精神.pdf",
        description: "深入学习贯彻习近平总书记关于推动高质量发展的重要讲话精神",
        date: "2024-09-15",
        size: "2.4 MB",
        type: "PDF",
        url: "/files/party-central/2024/high-quality-development.pdf",
      },
      {
        id: 2,
        fileName: "党的二十大报告学习材料.docx",
        description: "全面学习领会党的二十大报告精神要点解析",
        date: "2024-08-20",
        size: "3.2 MB",
        type: "DOCX",
        url: "/files/party-central/2024/20th-congress-report.docx",
      },
      {
        id: 3,
        fileName: "新时代中国特色社会主义思想学习纲要.pptx",
        description: "习近平新时代中国特色社会主义思想学习培训材料",
        date: "2024-07-10",
        size: "4.5 MB",
        type: "PPTX",
        url: "/files/party-central/2024/new-era-socialism.pptx",
      },
    ],
    "2023": [
      {
        id: 4,
        fileName: "关于加强党的建设重要指示精神.pdf",
        description: "深入贯彻落实党中央关于加强党的建设的重要指示精神",
        date: "2023-12-05",
        size: "1.8 MB",
        type: "PDF",
        url: "/files/party-central/2023/party-building.pdf",
      },
      {
        id: 5,
        fileName: "经济工作会议精神传达.xlsx",
        description: "中央经济工作会议精神传达学习要点汇总",
        date: "2023-11-18",
        size: "1.2 MB",
        type: "XLSX",
        url: "/files/party-central/2023/economic-meeting.xlsx",
      },
    ],
  },
  "company-speech": {
    "2024": [
      {
        id: 20,
        fileName: "集团公司2024年工作会议讲话.pdf",
        description: "集团公司董事长在2024年度工作会议上的重要讲话",
        date: "2024-08-15",
        size: "2.8 MB",
        type: "PDF",
        url: "/files/company-speech/2024/annual-meeting.pdf",
      },
      {
        id: 21,
        fileName: "关于深化改革创新的指导意见.docx",
        description: "上级公司关于深化企业改革创新发展的指导意见",
        date: "2024-07-20",
        size: "1.9 MB",
        type: "DOCX",
        url: "/files/company-speech/2024/reform-innovation.docx",
      },
    ],
    "2023": [
      {
        id: 22,
        fileName: "数字化转型动员大会讲话.pptx",
        description: "集团领导在数字化转型动员大会上的重要讲话",
        date: "2023-12-10",
        size: "3.4 MB",
        type: "PPTX",
        url: "/files/company-speech/2023/digital-transformation.pptx",
      },
    ],
  },
  "safety-production": {
    "2024": [
      {
        id: 30,
        fileName: "2024年安全生产责任制.pdf",
        description: "企业安全生产责任制度及实施细则",
        date: "2024-09-01",
        size: "2.1 MB",
        type: "PDF",
        url: "/files/safety/2024/responsibility-system.pdf",
      },
      {
        id: 31,
        fileName: "安全风险隐患排查治理办法.docx",
        description: "安全风险隐患排查治理工作实施办法",
        date: "2024-08-25",
        size: "1.6 MB",
        type: "DOCX",
        url: "/files/safety/2024/risk-investigation.docx",
      },
    ],
    "2023": [
      {
        id: 32,
        fileName: "应急预案管理制度.xlsx",
        description: "生产安全事故应急预案管理制度汇编",
        date: "2023-11-30",
        size: "2.3 MB",
        type: "XLSX",
        url: "/files/safety/2023/emergency-plan.xlsx",
      },
    ],
  },
  "discipline-supervision": {
    "2024": [
      {
        id: 40,
        fileName: "党风廉政建设责任制.pdf",
        description: "党风廉政建设责任制实施办法及考核标准",
        date: "2024-08-10",
        size: "1.8 MB",
        type: "PDF",
        url: "/files/discipline/2024/integrity-responsibility.pdf",
      },
      {
        id: 41,
        fileName: "违规违纪典型案例通报.docx",
        description: "近期违规违纪典型案例通报及警示教育",
        date: "2024-07-05",
        size: "1.3 MB",
        type: "DOCX",
        url: "/files/discipline/2024/case-notification.docx",
      },
    ],
    "2023": [
      {
        id: 42,
        fileName: "内部监督检查报告.xlsx",
        description: "第二季度内部监督检查情况报告",
        date: "2023-09-28",
        size: "2.0 MB",
        type: "XLSX",
        url: "/files/discipline/2023/supervision-report.xlsx",
      },
    ],
  },
})

// 当前模块的年份数据
const currentModuleYears = computed(() => {
  return moduleYearData.value[selectedModule.value] || []
})

// 当前文件数据
const currentFileData = computed(() => {
  if (!selectedModule.value || !selectedYear.value || isLoading.value) return []
  return allData.value[selectedModule.value]?.[selectedYear.value] || []
})

// 获取模块总文件数
function getModuleTotalCount(moduleId: string): number {
  const moduleData = allData.value[moduleId]
  if (!moduleData) return 0

  return Object.values(moduleData).reduce((total, yearFiles) => total + yearFiles.length, 0)
}

// 选择模块
async function selectModule(moduleId: string) {
  if (moduleId === selectedModule.value) return

  // 立即清除当前内容
  selectedYear.value = ""
  isLoading.value = true
  selectedModule.value = moduleId

  // 默认选中第一个年份
  const years = moduleYearData.value[moduleId]
  if (years && years.length > 0) {
    const firstYear = years[0]
    if (firstYear) {
      selectedYear.value = firstYear.year
    }
  }

  // 模拟加载延迟
  await new Promise((resolve) => setTimeout(resolve, 300))
  isLoading.value = false
}

// 选择年份
async function selectYear(year: string) {
  if (year === selectedYear.value) return

  // 立即清除当前内容并显示加载状态
  isLoading.value = true
  selectedYear.value = year

  // 模拟加载延迟
  await new Promise((resolve) => setTimeout(resolve, 200))
  isLoading.value = false
}

// 进入时触发动画
function enter() {
  isVisible.value = true
}

// 离开时重置动画
function leave() {
  isVisible.value = false
}

// 文件操作方法
function viewFile(file: FileItem) {
  if (file.url) {
    window.open(file.url, "_blank")
  } else {
    console.log("查看文件:", file.fileName)
    // 这里可以添加文件预览逻辑
  }
}

function downloadFile(file: FileItem) {
  if (file.url) {
    const link = document.createElement("a")
    link.href = file.url
    link.download = file.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    console.log("下载文件:", file.fileName)
    // 这里可以添加文件下载逻辑
  }
}

// 列表项过渡动画 - 简单的从右到左进入
function beforeEnter(el: Element) {
  const element = el as HTMLElement
  element.style.opacity = "0"
  element.style.transform = "translateX(30px)"
}

function enterItem(el: Element, done: () => void) {
  const element = el as HTMLElement
  const index = parseInt(element.dataset.index || "0")

  setTimeout(() => {
    element.style.transition = "all 0.3s ease"
    element.style.opacity = "1"
    element.style.transform = "translateX(0)"
    done()
  }, index * 80)
}

// 初始化
onMounted(() => {
  // 默认选中第一个模块
  if (moduleList.value && moduleList.value.length > 0) {
    const firstModule = moduleList.value[0]
    if (firstModule) {
      selectModule(firstModule.id)
    }
  }
})

// 导出方法供父组件调用
defineExpose({
  enter,
  leave,
})
</script>

<style scoped lang="scss">
.index-swiper-slide-three {
  height: calc(100% - 80px);
  display: flex;
  padding: 30px 12.5%;
  flex-direction: column;
  background-color: #f8f9fa;

  .module-tabs {
    display: flex;
    gap: 2px;
    margin-bottom: 30px;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.6s ease;

    &.tabs-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .tab-item {
      flex: 1;
      padding: 16px 24px;
      background: #fff;
      border-radius: 8px 8px 0 0;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      position: relative;
      border-bottom: 3px solid transparent;

      &:hover {
        background: #f8fafc;
      }

      &.active {
        background: #fff;
        border-bottom-color: #3b82f6;

        .tab-text {
          color: #3b82f6;
          font-weight: 600;
        }

        .tab-count {
          background: #3b82f6;
          color: white;
        }
      }

      .tab-text {
        font-size: 15px;
        font-weight: 500;
        color: #374151;
        transition: color 0.2s ease;
      }

      .tab-count {
        font-size: 12px;
        font-weight: 500;
        background: #e5e7eb;
        color: #6b7280;
        padding: 4px 8px;
        border-radius: 12px;
        transition: all 0.2s ease;
        min-width: 24px;
        text-align: center;
      }
    }
  }

  .content {
    display: flex;
    gap: 40px;
    flex: 1;
    height: calc(100vh - 380px);

    // 左侧年份目录
    .year-sidebar {
      width: 200px;
      opacity: 0;
      transform: translateX(-20px);
      transition: all 0.6s ease;

      &.sidebar-visible {
        opacity: 1;
        transform: translateX(0);
      }

      .year-list {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        position: sticky;
        top: 20px;
        border: 1px solid #e5e7eb;

        .year-item {
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          background: #fff;

          &:not(:last-child) {
            border-bottom: 1px solid #f3f4f6;
          }

          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 0;
            background: #3b82f6;
            transition: width 0.2s ease;
          }

          &:hover {
            background: #f8fafc;

            &::before {
              width: 3px;
            }
          }

          &.active {
            background: #f1f5f9;

            &::before {
              width: 3px;
            }

            .year-text {
              color: #3b82f6;
              font-weight: 600;
            }

            .year-count {
              background: #3b82f6;
              color: white;
            }
          }

          .year-text {
            font-size: 16px;
            font-weight: 500;
            color: #374151;
            transition: color 0.2s ease;
          }

          .year-count {
            font-size: 12px;
            font-weight: 500;
            background: #e5e7eb;
            color: #6b7280;
            padding: 4px 8px;
            border-radius: 12px;
            transition: all 0.2s ease;
            min-width: 32px;
            text-align: center;
          }
        }
      }
    }

    // 右侧内容区域
    .content-main {
      flex: 1;
      opacity: 0;
      transform: translateX(30px);
      transition: all 0.8s ease-out 0.2s;
      position: relative;

      &.main-visible {
        opacity: 1;
        transform: translateX(0);
      }

      .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        border-radius: 12px;

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #9ca3af;
        text-align: center;

        h3 {
          margin: 16px 0 8px 0;
          font-size: 18px;
          font-weight: 600;
          color: #6b7280;
        }

        p {
          margin: 0;
          font-size: 14px;
          color: #9ca3af;
        }
      }

      .file-list {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        height: 100%;
        overflow-y: auto;
        border: 1px solid #e5e7eb;

        // 自定义滚动条
        &::-webkit-scrollbar {
          width: 6px;
        }

        &::-webkit-scrollbar-track {
          background: #f9fafb;
        }

        &::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;

          &:hover {
            background: #9ca3af;
          }
        }

        .file-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s ease;
          cursor: pointer;

          &:last-child {
            border-bottom: none;
          }

          &:hover {
            background-color: #f8fafc;

            .file-actions {
              opacity: 1;
            }
          }

          .file-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            background: #3b82f6;
            border-radius: 6px;
            color: white;
            margin-right: 16px;
            flex-shrink: 0;
          }

          .file-info {
            flex: 1;
            min-width: 0;

            .file-name {
              font-size: 15px;
              font-weight: 600;
              color: #111827;
              margin: 0 0 4px 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .file-description {
              font-size: 13px;
              color: #6b7280;
              margin: 0;
              line-height: 1.4;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }

          .file-meta {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin: 0 16px 0 0;
            flex-shrink: 0;

            .file-size {
              font-size: 13px;
              font-weight: 600;
              color: #3b82f6;
              margin-bottom: 2px;
            }

            .file-date {
              font-size: 12px;
              color: #9ca3af;
            }
          }

          .file-actions {
            display: flex;
            gap: 8px;
            opacity: 0;
            transition: opacity 0.2s ease;

            .action-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 32px;
              height: 32px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              transition: all 0.2s ease;

              &:hover {
                transform: scale(1.05);
              }

              &.view-btn {
                background: #3b82f6;
                color: white;

                &:hover {
                  background: #2563eb;
                }
              }

              &.download-btn {
                background: #10b981;
                color: white;

                &:hover {
                  background: #059669;
                }
              }
            }
          }
        }
      }
    }
  }
}

// 列表过渡动画
.list-enter-active {
  transition: all 0.3s ease;
}

.list-leave-active {
  transition: all 0.1s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.list-move {
  transition: all 0.2s ease;
}

// 加载动画
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .index-swiper-slide-three {
    .content {
      .content-main {
        .content-list {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .index-swiper-slide-three {
    padding: 0 5%;
    padding-top: 80px;

    .title {
      font-size: 24px;
      margin-bottom: 40px;
    }

    .content {
      flex-direction: column;
      gap: 20px;

      .module-sidebar {
        width: 100%;

        .module-list {
          display: flex;
          overflow-x: auto;
          border-radius: 6px;

          &::-webkit-scrollbar {
            height: 3px;
          }

          &::-webkit-scrollbar-track {
            background: #f3f4f6;
          }

          &::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 2px;
          }

          .module-item {
            min-width: 140px;
            padding: 12px 16px;
            margin-right: 4px;
            border-radius: 6px;
            border: none;
            white-space: nowrap;

            &:last-child {
              margin-right: 0;
            }

            .module-text {
              font-size: 13px;
              margin-right: 8px;
            }

            .module-count {
              font-size: 11px;
            }
          }
        }
      }

      .content-main {
        .file-list {
          border-radius: 6px;

          .file-item {
            padding: 14px 16px;

            .file-icon {
              width: 40px;
              height: 40px;
              margin-right: 12px;
              border-radius: 4px;
            }

            .file-info {
              flex: 1;
              min-width: 0;

              .file-name {
                font-size: 14px;
                font-weight: 600;
              }

              .file-description {
                font-size: 12px;
                -webkit-line-clamp: 1;
                line-clamp: 1;
              }
            }

            .file-meta {
              margin: 0 12px 0 0;
              flex-direction: column;
              align-items: flex-end;
              flex-shrink: 0;

              .file-size {
                font-size: 12px;
                margin-bottom: 2px;
              }

              .file-date {
                font-size: 11px;
              }
            }

            .file-actions {
              opacity: 1;
              gap: 6px;

              .action-btn {
                width: 30px;
                height: 30px;
                border-radius: 4px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
