<template>
  <div class="trends-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">行业动态</h1>
      <p class="page-subtitle">把握行业脉搏，洞察发展趋势</p>
    </div>

    <!-- 过渡动画容器 -->
    <Transition name="slide" mode="out-in">
      <!-- 行业动态列表视图 -->
      <div v-if="!showDetail" key="list" class="trends-list-view">
        <!-- 搜索和筛选 -->
        <div class="filter-section">
          <div class="search-box">
            <input 
              v-model="searchKeyword" 
              type="text" 
              placeholder="搜索行业动态标题或内容..."
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

        <!-- 行业动态列表 -->
        <div class="trends-list">
          <div 
            v-for="trend in paginatedTrends" 
            :key="trend.id"
            class="trend-item"
            @click="showTrendDetail(trend)"
          >
            <div class="trend-image">
              <img :src="trend.coverImage" :alt="trend.title" />
              <div class="category-tag">{{ trend.category }}</div>
            </div>
            
            <div class="trend-content">
              <h3 class="trend-title">{{ trend.title }}</h3>
              <p class="trend-summary">{{ trend.summary }}</p>
              
              <div class="trend-meta">
                <span class="publish-date">{{ formatDate(trend.publishDate) }}</span>
                <span class="views">{{ trend.views }} 阅读</span>
                <span class="author">{{ trend.author }}</span>
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

      <!-- 行业动态详情视图 -->
      <NewsDetail 
        v-else 
        key="detail" 
        :news="selectedTrend!" 
        @back="backToList"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import NewsDetail from '~/components/NewsDetail/index.vue'

interface TrendItem {
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
const selectedTrend = ref<TrendItem | null>(null)
const searchKeyword = ref('')
const selectedCategory = ref('全部')
const currentPage = ref(1)
const pageSize = 6

// 分类数据
const categories = ['全部', '政策解读', '市场分析', '技术趋势', '竞争态势', '投资动向', '国际视野']

// 模拟行业动态数据
const trendsData = ref<TrendItem[]>([
  {
    id: 1,
    title: '国家发布新政策支持行业数字化转型',
    summary: '近日，国家相关部门发布了支持行业数字化转型的新政策，为企业数字化升级提供了政策保障和资金支持...',
    content: '<p>国家发布数字化转型支持政策。</p><p>该政策从税收优惠、资金扶持、技术支撑等多个方面为企业数字化转型提供全方位支持。</p>',
    publishDate: '2024-01-16',
    category: '政策解读',
    views: 3580,
    author: '政策研究中心',
    coverImage: 'https://picsum.photos/400/240?random=31',
    tags: ['数字化转型', '政策支持', '企业升级']
  },
  {
    id: 2,
    title: '行业市场规模持续扩大，增长势头强劲',
    summary: '最新市场研究报告显示，行业市场规模在过去一年中实现了显著增长，预计未来几年将继续保持强劲的发展势头...',
    content: '<p>行业市场规模持续扩大。</p><p>报告分析了市场增长的主要驱动因素，包括技术创新、消费升级、政策支持等多个方面。</p>',
    publishDate: '2024-01-14',
    category: '市场分析',
    views: 2845,
    author: '市场研究院',
    coverImage: 'https://picsum.photos/400/240?random=32'
  },
  {
    id: 3,
    title: '人工智能技术在行业中的应用日趋成熟',
    summary: '人工智能技术在行业中的应用越来越广泛，从自动化生产到智能决策，AI正在深刻改变着行业的发展模式...',
    content: '<p>AI技术在行业中的应用日趋成熟。</p><p>从机器学习到深度学习，从自然语言处理到计算机视觉，AI技术正在为行业发展注入新动力。</p>',
    publishDate: '2024-01-12',
    category: '技术趋势',
    views: 2567,
    author: '技术分析师',
    coverImage: 'https://picsum.photos/400/240?random=33'
  },
  {
    id: 4,
    title: '行业竞争格局发生重大变化',
    summary: '随着新技术的不断涌现和市场环境的变化，行业竞争格局正在发生深刻变化，传统优势企业面临新的挑战...',
    content: '<p>行业竞争格局发生重大变化。</p><p>新兴企业凭借技术创新和商业模式创新，正在挑战传统行业巨头的市场地位。</p>',
    publishDate: '2024-01-10',
    category: '竞争态势',
    views: 2234,
    author: '行业分析师',
    coverImage: 'https://picsum.photos/400/240?random=34'
  },
  {
    id: 5,
    title: '投资机构看好行业发展前景',
    summary: '多家知名投资机构表示看好行业发展前景，预计将加大对相关企业的投资力度，推动行业快速发展...',
    content: '<p>投资机构看好行业发展前景。</p><p>投资机构认为，行业具有巨大的发展潜力和投资价值，将持续关注和投资优质企业。</p>',
    publishDate: '2024-01-08',
    category: '投资动向',
    views: 1987,
    author: '投资分析师',
    coverImage: 'https://picsum.photos/400/240?random=35'
  },
  {
    id: 6,
    title: '国际市场对中国企业需求持续增长',
    summary: '国际市场对中国企业产品和服务的需求持续增长，为中国企业走出去提供了良好机遇...',
    content: '<p>国际市场需求持续增长。</p><p>中国企业凭借技术优势和成本优势，在国际市场上的竞争力不断提升。</p>',
    publishDate: '2024-01-06',
    category: '国际视野',
    views: 1756,
    author: '国际贸易专家',
    coverImage: 'https://picsum.photos/400/240?random=36'
  },
  {
    id: 7,
    title: '绿色发展成为行业新趋势',
    summary: '随着环保意识的不断提高，绿色发展已成为行业发展的新趋势，越来越多的企业开始重视可持续发展...',
    content: '<p>绿色发展成为行业新趋势。</p><p>企业通过技术创新和管理创新，实现了经济效益和环境效益的双赢。</p>',
    publishDate: '2024-01-04',
    category: '技术趋势',
    views: 1534,
    author: '环保专家',
    coverImage: 'https://picsum.photos/400/240?random=37'
  },
  {
    id: 8,
    title: '行业标准化建设取得重要进展',
    summary: '行业标准化建设取得重要进展，相关标准的制定和实施为行业健康发展提供了重要保障...',
    content: '<p>行业标准化建设取得重要进展。</p><p>标准化建设有助于规范市场秩序，提升产品质量，促进行业健康发展。</p>',
    publishDate: '2024-01-02',
    category: '政策解读',
    views: 1323,
    author: '标准化专家',
    coverImage: 'https://picsum.photos/400/240?random=38'
  }
])

// 计算属性
const filteredTrends = computed(() => {
  let result = trendsData.value
  
  // 按分类筛选
  if (selectedCategory.value !== '全部') {
    result = result.filter(trend => trend.category === selectedCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(trend => 
      trend.title.toLowerCase().includes(keyword) || 
      trend.summary.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

const totalPages = computed(() => Math.ceil(filteredTrends.value.length / pageSize))

const paginatedTrends = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredTrends.value.slice(start, end)
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

const showTrendDetail = (trend: TrendItem) => {
  selectedTrend.value = trend
  showDetail.value = true
  // 增加阅读量
  trend.views++
}

const backToList = () => {
  showDetail.value = false
  selectedTrend.value = null
}

// 监听搜索关键词变化
watch(searchKeyword, () => {
  currentPage.value = 1
})
</script>

<style lang="scss" scoped>
.trends-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  
  .page-title {
    font-size: 36px;
    font-weight: 700;
    color: #2e7d32;
    margin-bottom: 10px;
  }
  
  .page-subtitle {
    font-size: 16px;
    color: #388e3c;
  }
}

.trends-list-view {
  max-width: 1200px;
  margin: 0 auto;
}

.filter-section {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(46, 125, 50, 0.1);
  margin-bottom: 30px;
  
  .search-box {
    display: flex;
    margin-bottom: 20px;
    
    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #e8f5e8;
      border-radius: 8px 0 0 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s ease;
      
      &:focus {
        border-color: #388e3c;
      }
    }
    
    .search-btn {
      padding: 12px 16px;
      background: #388e3c;
      border: none;
      border-radius: 0 8px 8px 0;
      color: #fff;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &:hover {
        background: #2e7d32;
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
      border: 1px solid #e8f5e8;
      border-radius: 20px;
      color: #388e3c;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      
      &:hover {
        background: #e8f5e8;
        border-color: #c8e6c9;
      }
      
      &.active {
        background: #388e3c;
        border-color: #388e3c;
        color: #fff;
      }
    }
  }
}

.trends-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.trend-item {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(46, 125, 50, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(46, 125, 50, 0.2);
  }
  
  .trend-image {
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
      background: rgba(56, 142, 60, 0.9);
      color: #fff;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
  }
  
  .trend-content {
    padding: 20px;
    
    .trend-title {
      font-size: 18px;
      font-weight: 600;
      color: #2e7d32;
      margin-bottom: 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .trend-summary {
      color: #666;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .trend-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #999;
      
      .publish-date {
        font-weight: 500;
        color: #388e3c;
      }
    }
  }
  
  &:hover .trend-image img {
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
    border: 1px solid #e8f5e8;
    border-radius: 6px;
    color: #388e3c;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: #e8f5e8;
      border-color: #c8e6c9;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .page-number {
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #e8f5e8;
    border-radius: 6px;
    color: #388e3c;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 40px;
    text-align: center;
    
    &:hover {
      background: #e8f5e8;
      border-color: #c8e6c9;
    }
    
    &.active {
      background: #388e3c;
      border-color: #388e3c;
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
  .trends-page {
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
  
  .trends-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .trend-item {
    .trend-content {
      padding: 15px;
      
      .trend-title {
        font-size: 16px;
      }
      
      .trend-meta {
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