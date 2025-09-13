<template>
  <div class="integrity-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">廉政建设</h1>
      <p class="page-subtitle">严守纪律底线，筑牢廉洁防线</p>
    </div>

    <!-- 过渡动画容器 -->
    <Transition name="slide" mode="out-in">
      <!-- 廉政建设内容列表视图 -->
      <div v-if="!showDetail" key="list" class="integrity-list-view">
        <!-- 搜索和筛选 -->
        <div class="filter-section">
          <div class="search-box">
            <input 
              v-model="searchKeyword" 
              type="text" 
              placeholder="搜索廉政建设内容标题或内容..."
              class="search-input"
            />
            <button class="search-btn" @click="handleSearch">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.514 16.506M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div class="category-filter">
            <button 
              v-for="category in categories" 
              :key="category"
              :class="['category-btn', { active: selectedCategory === category }]"
              @click="filterByCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- 廉政建设内容列表 -->
        <div class="integrity-list">
          <div 
            v-for="integrity in paginatedIntegrity" 
            :key="integrity.id"
            class="integrity-item"
            @click="showIntegrityDetail(integrity)"
          >
            <div class="integrity-image">
              <img :src="integrity.coverImage" :alt="integrity.title" />
              <div class="category-tag">{{ integrity.category }}</div>
            </div>
            
            <div class="integrity-content">
              <h3 class="integrity-title">{{ integrity.title }}</h3>
              <p class="integrity-summary">{{ integrity.summary }}</p>
              
              <div class="integrity-meta">
                <span class="publish-date">{{ formatDate(integrity.publishDate) }}</span>
                <span class="views">{{ integrity.views }} 阅读</span>
                <span class="author">{{ integrity.author }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div v-if="totalPages > 1" class="pagination">
          <button 
            :disabled="currentPage === 1"
            class="page-btn"
            @click="changePage(currentPage - 1)"
          >
            上一页
          </button>
          
          <span 
            v-for="page in visiblePages" 
            :key="page"
            :class="['page-number', { active: page === currentPage }]"
            @click="changePage(page)"
          >
            {{ page }}
          </span>
          
          <button 
            :disabled="currentPage === totalPages"
            class="page-btn"
            @click="changePage(currentPage + 1)"
          >
            下一页
          </button>
        </div>
      </div>

      <!-- 廉政建设详情视图 -->
      <NewsDetail 
        v-else 
        key="detail" 
        :news="selectedIntegrity!" 
        @back="backToList"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import NewsDetail from '~/components/NewsDetail/index.vue'

interface IntegrityItem {
  id: number
  title: string
  summary: string
  content: string
  publishDate: string
  category: string
  views: number
  author: string
  coverImage: string
  tags?: string[]
}

// 响应式数据
const showDetail = ref(false)
const selectedIntegrity = ref<IntegrityItem | null>(null)
const searchKeyword = ref('')
const selectedCategory = ref('全部')
const currentPage = ref(1)
const pageSize = 6

// 分类数据
const categories = ['全部', '制度建设', '警示教育', '监督检查', '案例分析', '学习培训', '廉政文化']

// 模拟廉政建设数据
const integrityData = ref<IntegrityItem[]>([
  {
    id: 1,
    title: '公司廉洁从业管理制度修订完善',
    summary: '为进一步规范员工廉洁从业行为，公司对廉洁从业管理制度进行了全面修订完善，明确了各项纪律要求...',
    content: '<p>公司廉洁从业管理制度修订完善。</p><p>新修订的制度进一步明确了廉洁从业的具体要求，完善了监督检查机制，强化了责任追究措施。</p>',
    publishDate: '2024-01-16',
    category: '制度建设',
    views: 3280,
    author: '纪检监察部',
    coverImage: 'https://picsum.photos/400/240?random=61',
    tags: ['制度建设', '廉洁从业', '规范管理']
  },
  {
    id: 2,
    title: '廉政警示教育专题讲座成功举办',
    summary: '公司组织开展廉政警示教育专题讲座，通过典型案例分析，教育引导员工增强廉洁自律意识...',
    content: '<p>廉政警示教育专题讲座成功举办。</p><p>讲座通过分析典型违纪违法案例，深刻剖析了腐败问题的危害性，教育员工要时刻保持清醒头脑。</p>',
    publishDate: '2024-01-14',
    category: '警示教育',
    views: 2945,
    author: '党委办公室',
    coverImage: 'https://picsum.photos/400/240?random=62'
  },
  {
    id: 3,
    title: '开展节前廉政提醒谈话活动',
    summary: '在重要节日前夕，公司纪检监察部门开展廉政提醒谈话活动，提醒党员干部严守纪律规定...',
    content: '<p>开展节前廉政提醒谈话活动。</p><p>通过个别谈话、集体提醒等方式，教育引导党员干部严格遵守中央八项规定精神，过一个廉洁祥和的节日。</p>',
    publishDate: '2024-01-12',
    category: '监督检查',
    views: 2156,
    author: '纪检监察部',
    coverImage: 'https://picsum.photos/400/240?random=63'
  },
  {
    id: 4,
    title: '违纪违法典型案例通报分析',
    summary: '公司通报了近期查处的违纪违法典型案例，深入分析案件特点和教训，警示教育全体员工...',
    content: '<p>违纪违法典型案例通报分析。</p><p>通过对典型案例的深入分析，揭示了违纪违法行为的严重后果，为全体员工敲响了警钟。</p>',
    publishDate: '2024-01-10',
    category: '案例分析',
    views: 1987,
    author: '纪检监察部',
    coverImage: 'https://picsum.photos/400/240?random=64'
  },
  {
    id: 5,
    title: '党纪法规学习培训班圆满结束',
    summary: '公司举办的党纪法规学习培训班圆满结束，全体党员干部系统学习了最新的党纪法规知识...',
    content: '<p>党纪法规学习培训班圆满结束。</p><p>培训内容涵盖了党章党规、法律法规等多个方面，有效提升了党员干部的纪律意识和法治观念。</p>',
    publishDate: '2024-01-08',
    category: '学习培训',
    views: 1756,
    author: '党委组织部',
    coverImage: 'https://picsum.photos/400/240?random=65'
  },
  {
    id: 6,
    title: '廉政文化建设成果展示活动',
    summary: '公司开展廉政文化建设成果展示活动，通过多种形式展现廉政文化建设的丰硕成果...',
    content: '<p>廉政文化建设成果展示活动。</p><p>活动通过展板展示、文艺演出、知识竞赛等形式，营造了浓厚的廉政文化氛围，增强了廉洁教育效果。</p>',
    publishDate: '2024-01-06',
    category: '廉政文化',
    views: 1534,
    author: '宣传部',
    coverImage: 'https://picsum.photos/400/240?random=66'
  },
  {
    id: 7,
    title: '内控制度执行情况专项检查',
    summary: '公司组织开展内控制度执行情况专项检查，重点检查关键岗位和重要环节的制度执行情况...',
    content: '<p>内控制度执行情况专项检查。</p><p>检查发现了一些制度执行不到位的问题，并要求相关部门立即整改，确保内控制度有效运行。</p>',
    publishDate: '2024-01-04',
    category: '监督检查',
    views: 1423,
    author: '审计部',
    coverImage: 'https://picsum.photos/400/240?random=67'
  },
  {
    id: 8,
    title: '廉洁从业承诺书签订仪式',
    summary: '公司举行廉洁从业承诺书签订仪式，全体员工郑重承诺严格遵守廉洁从业各项规定...',
    content: '<p>廉洁从业承诺书签订仪式。</p><p>通过签订承诺书，进一步强化了员工的廉洁意识，明确了廉洁从业的责任和义务。</p>',
    publishDate: '2024-01-02',
    category: '制度建设',
    views: 1256,
    author: '人力资源部',
    coverImage: 'https://picsum.photos/400/240?random=68'
  }
])

// 计算属性
const filteredIntegrity = computed(() => {
  let result = integrityData.value
  
  // 按分类筛选
  if (selectedCategory.value !== '全部') {
    result = result.filter(integrity => integrity.category === selectedCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(integrity => 
      integrity.title.toLowerCase().includes(keyword) || 
      integrity.summary.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

const totalPages = computed(() => Math.ceil(filteredIntegrity.value.length / pageSize))

const paginatedIntegrity = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredIntegrity.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    }
  }
  
  return pages
})

// 方法
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleSearch = () => {
  currentPage.value = 1
}

const filterByCategory = (category: string) => {
  selectedCategory.value = category
  currentPage.value = 1
}

const changePage = (page: number | string) => {
  if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const showIntegrityDetail = (integrity: IntegrityItem) => {
  selectedIntegrity.value = integrity
  showDetail.value = true
  // 增加阅读量
  integrity.views++
}

const backToList = () => {
  showDetail.value = false
  selectedIntegrity.value = null
}

// 监听搜索关键词变化
watch(searchKeyword, () => {
  currentPage.value = 1
})
</script>

<style lang="scss" scoped>
.integrity-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f3e5f5 0%, #9c27b0 100%);
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  
  .page-title {
    font-size: 36px;
    font-weight: 700;
    color: #4a148c;
    margin-bottom: 10px;
  }
  
  .page-subtitle {
    font-size: 16px;
    color: #7b1fa2;
  }
}

.integrity-list-view {
  max-width: 1200px;
  margin: 0 auto;
}

.filter-section {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(74, 20, 140, 0.1);
  margin-bottom: 30px;
  
  .search-box {
    display: flex;
    margin-bottom: 20px;
    
    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #f3e5f5;
      border-radius: 8px 0 0 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s ease;
      
      &:focus {
        border-color: #7b1fa2;
      }
    }
    
    .search-btn {
      padding: 12px 16px;
      background: #7b1fa2;
      border: none;
      border-radius: 0 8px 8px 0;
      color: #fff;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &:hover {
        background: #4a148c;
      }
    }
  }
  
  .category-filter {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    
    .category-btn {
      padding: 8px 16px;
      background: #f8f9fa;
      border: 1px solid #f3e5f5;
      border-radius: 20px;
      color: #7b1fa2;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      
      &:hover {
        background: #f3e5f5;
        border-color: #9c27b0;
      }
      
      &.active {
        background: #7b1fa2;
        border-color: #7b1fa2;
        color: #fff;
      }
    }
  }
}

.integrity-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.integrity-item {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(74, 20, 140, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(74, 20, 140, 0.2);
  }
  
  .integrity-image {
    position: relative;
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .category-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(123, 31, 162, 0.9);
      color: #fff;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
  }
  
  .integrity-content {
    padding: 20px;
    
    .integrity-title {
      font-size: 18px;
      font-weight: 600;
      color: #4a148c;
      margin-bottom: 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .integrity-summary {
      color: #666;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .integrity-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #999;
      
      .publish-date {
        font-weight: 500;
        color: #7b1fa2;
      }
    }
  }
  
  &:hover .integrity-image img {
    transform: scale(1.05);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  
  .page-btn {
    padding: 8px 16px;
    background: #fff;
    border: 1px solid #f3e5f5;
    border-radius: 6px;
    color: #7b1fa2;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: #f3e5f5;
      border-color: #9c27b0;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .page-number {
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #f3e5f5;
    border-radius: 6px;
    color: #7b1fa2;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 40px;
    text-align: center;
    
    &:hover {
      background: #f3e5f5;
      border-color: #9c27b0;
    }
    
    &.active {
      background: #7b1fa2;
      border-color: #7b1fa2;
      color: #fff;
    }
  }
}

// 过渡动画
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

// 响应式设计
@media (max-width: 768px) {
  .integrity-page {
    padding: 15px;
  }
  
  .page-header .page-title {
    font-size: 28px;
  }
  
  .filter-section {
    padding: 15px;
    
    .category-filter {
      .category-btn {
        font-size: 12px;
        padding: 6px 12px;
      }
    }
  }
  
  .integrity-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .integrity-item {
    .integrity-content {
      padding: 15px;
      
      .integrity-title {
        font-size: 16px;
      }
      
      .integrity-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
    }
  }
  
  .pagination {
    flex-wrap: wrap;
    gap: 4px;
    
    .page-btn,
    .page-number {
      padding: 6px 10px;
      font-size: 12px;
    }
  }
}
</style>