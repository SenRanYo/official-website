<template>
  <div class="party-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">党的建设</h1>
      <p class="page-subtitle">坚持党的领导，加强党的建设</p>
    </div>

    <!-- 过渡动画容器 -->
    <Transition name="slide" mode="out-in">
      <!-- 党建工作列表视图 -->
      <div v-if="!showDetail" key="list" class="party-list-view">
        <!-- 搜索和筛选 -->
        <div class="filter-section">
          <div class="search-box">
            <input 
              v-model="searchKeyword" 
              type="text" 
              placeholder="搜索党建工作标题或内容..."
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

        <!-- 党建工作列表 -->
        <div class="party-list">
          <div 
            v-for="party in paginatedParty" 
            :key="party.id"
            class="party-item"
            @click="showPartyDetail(party)"
          >
            <div class="party-image">
              <img :src="party.coverImage" :alt="party.title" />
              <div class="category-tag">{{ party.category }}</div>
            </div>
            
            <div class="party-content">
              <h3 class="party-title">{{ party.title }}</h3>
              <p class="party-summary">{{ party.summary }}</p>
              
              <div class="party-meta">
                <span class="publish-date">{{ formatDate(party.publishDate) }}</span>
                <span class="views">{{ party.views }} 阅读</span>
                <span class="author">{{ party.author }}</span>
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

      <!-- 党建工作详情视图 -->
      <NewsDetail 
        v-else 
        key="detail" 
        :news="selectedParty!" 
        @back="backToList"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import NewsDetail from '~/components/NewsDetail/index.vue'

interface PartyItem {
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
const selectedParty = ref<PartyItem | null>(null)
const searchKeyword = ref('')
const selectedCategory = ref('全部')
const currentPage = ref(1)
const pageSize = 6

// 分类数据
const categories = ['全部', '理论学习', '组织建设', '党员教育', '主题活动', '廉政建设', '先进典型']

// 模拟党建工作数据
const partyData = ref<PartyItem[]>([
  {
    id: 1,
    title: '深入学习贯彻党的二十大精神',
    summary: '公司党委组织全体党员深入学习贯彻党的二十大精神，通过专题学习会、研讨交流等形式，确保学习成效...',
    content: '<p>公司党委高度重视党的二十大精神学习贯彻工作。</p><p>通过多种形式的学习活动，引导党员干部深刻理解党的二十大精神实质，切实把思想和行动统一到党中央决策部署上来。</p>',
    publishDate: '2024-01-16',
    category: '理论学习',
    views: 2580,
    author: '党委办公室',
    coverImage: 'https://picsum.photos/400/240?random=41',
    tags: ['二十大精神', '理论学习', '党员教育']
  },
  {
    id: 2,
    title: '加强基层党组织建设工作',
    summary: '公司持续加强基层党组织建设，完善组织架构，规范组织生活，提升组织活力和战斗力...',
    content: '<p>公司不断加强基层党组织建设。</p><p>通过完善组织架构、规范组织生活、创新活动方式等措施，有效提升了基层党组织的凝聚力和战斗力。</p>',
    publishDate: '2024-01-14',
    category: '组织建设',
    views: 2145,
    author: '组织部',
    coverImage: 'https://picsum.photos/400/240?random=42'
  },
  {
    id: 3,
    title: '开展党员教育培训活动',
    summary: '公司党委组织开展党员教育培训活动，通过专题讲座、实地参观等方式，提升党员素质和能力...',
    content: '<p>公司党委重视党员教育培训工作。</p><p>通过系统性的教育培训，帮助党员提升政治素养、业务能力和综合素质，更好地发挥先锋模范作用。</p>',
    publishDate: '2024-01-12',
    category: '党员教育',
    views: 1987,
    author: '宣传部',
    coverImage: 'https://picsum.photos/400/240?random=43'
  },
  {
    id: 4,
    title: '"不忘初心、牢记使命"主题党日活动',
    summary: '公司各党支部开展"不忘初心、牢记使命"主题党日活动，重温入党誓词，坚定理想信念...',
    content: '<p>各党支部开展主题党日活动。</p><p>通过重温入党誓词、参观红色教育基地等活动，进一步坚定了党员的理想信念和使命担当。</p>',
    publishDate: '2024-01-10',
    category: '主题活动',
    views: 1756,
    author: '党支部',
    coverImage: 'https://picsum.photos/400/240?random=44'
  },
  {
    id: 5,
    title: '深入推进党风廉政建设',
    summary: '公司党委深入推进党风廉政建设，加强廉政教育，完善监督机制，营造风清气正的发展环境...',
    content: '<p>公司党委高度重视党风廉政建设。</p><p>通过加强廉政教育、完善制度建设、强化监督检查等措施，有效推进了党风廉政建设工作。</p>',
    publishDate: '2024-01-08',
    category: '廉政建设',
    views: 1534,
    author: '纪检监察部',
    coverImage: 'https://picsum.photos/400/240?random=45'
  },
  {
    id: 6,
    title: '表彰优秀党员和先进党支部',
    summary: '公司党委表彰了一批优秀党员和先进党支部，充分发挥先进典型的示范引领作用...',
    content: '<p>公司党委开展先进典型表彰活动。</p><p>通过表彰优秀党员和先进党支部，树立了学习榜样，激发了广大党员的工作热情和创新活力。</p>',
    publishDate: '2024-01-06',
    category: '先进典型',
    views: 1323,
    author: '党委办公室',
    coverImage: 'https://picsum.photos/400/240?random=46'
  },
  {
    id: 7,
    title: '党员志愿服务活动深入开展',
    summary: '公司党员积极参与志愿服务活动，深入社区、学校等地开展公益服务，展现党员风采...',
    content: '<p>党员志愿服务活动深入开展。</p><p>广大党员积极参与各类志愿服务活动，用实际行动践行党员的初心使命，展现了良好的精神风貌。</p>',
    publishDate: '2024-01-04',
    category: '主题活动',
    views: 1245,
    author: '团委',
    coverImage: 'https://picsum.photos/400/240?random=47'
  },
  {
    id: 8,
    title: '加强党建工作制度化规范化建设',
    summary: '公司不断完善党建工作制度体系，推进党建工作制度化、规范化、科学化发展...',
    content: '<p>公司加强党建工作制度化建设。</p><p>通过建立健全各项制度，规范党建工作流程，提升党建工作质量和效果。</p>',
    publishDate: '2024-01-02',
    category: '组织建设',
    views: 1156,
    author: '党委办公室',
    coverImage: 'https://picsum.photos/400/240?random=48'
  }
])

// 计算属性
const filteredParty = computed(() => {
  let result = partyData.value
  
  // 按分类筛选
  if (selectedCategory.value !== '全部') {
    result = result.filter(party => party.category === selectedCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(party => 
      party.title.toLowerCase().includes(keyword) || 
      party.summary.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

const totalPages = computed(() => Math.ceil(filteredParty.value.length / pageSize))

const paginatedParty = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredParty.value.slice(start, end)
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

const showPartyDetail = (party: PartyItem) => {
  selectedParty.value = party
  showDetail.value = true
  // 增加阅读量
  party.views++
}

const backToList = () => {
  showDetail.value = false
  selectedParty.value = null
}

// 监听搜索关键词变化
watch(searchKeyword, () => {
  currentPage.value = 1
})
</script>

<style lang="scss" scoped>
.party-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  
  .page-title {
    font-size: 36px;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 10px;
  }
  
  .page-subtitle {
    font-size: 16px;
    color: #d32f2f;
  }
}

.party-list-view {
  max-width: 1200px;
  margin: 0 auto;
}

.filter-section {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(198, 40, 40, 0.1);
  margin-bottom: 30px;
  
  .search-box {
    display: flex;
    margin-bottom: 20px;
    
    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #ffebee;
      border-radius: 8px 0 0 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s ease;
      
      &:focus {
        border-color: #d32f2f;
      }
    }
    
    .search-btn {
      padding: 12px 16px;
      background: #d32f2f;
      border: none;
      border-radius: 0 8px 8px 0;
      color: #fff;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &:hover {
        background: #c62828;
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
      border: 1px solid #ffebee;
      border-radius: 20px;
      color: #d32f2f;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      
      &:hover {
        background: #ffebee;
        border-color: #ffcdd2;
      }
      
      &.active {
        background: #d32f2f;
        border-color: #d32f2f;
        color: #fff;
      }
    }
  }
}

.party-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.party-item {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(198, 40, 40, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(198, 40, 40, 0.2);
  }
  
  .party-image {
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
      background: rgba(211, 47, 47, 0.9);
      color: #fff;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
  }
  
  .party-content {
    padding: 20px;
    
    .party-title {
      font-size: 18px;
      font-weight: 600;
      color: #c62828;
      margin-bottom: 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .party-summary {
      color: #666;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .party-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #999;
      
      .publish-date {
        font-weight: 500;
        color: #d32f2f;
      }
    }
  }
  
  &:hover .party-image img {
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
    border: 1px solid #ffebee;
    border-radius: 6px;
    color: #d32f2f;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: #ffebee;
      border-color: #ffcdd2;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .page-number {
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #ffebee;
    border-radius: 6px;
    color: #d32f2f;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 40px;
    text-align: center;
    
    &:hover {
      background: #ffebee;
      border-color: #ffcdd2;
    }
    
    &.active {
      background: #d32f2f;
      border-color: #d32f2f;
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
  .party-page {
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
  
  .party-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .party-item {
    .party-content {
      padding: 15px;
      
      .party-title {
        font-size: 16px;
      }
      
      .party-meta {
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