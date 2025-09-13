<template>
  <div class="news-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">新闻大事件</h1>
      <p class="page-subtitle">了解最新资讯动态</p>
    </div>

    <!-- 过渡动画容器 -->
    <Transition name="slide" mode="out-in">
      <!-- 新闻列表视图 -->
      <div v-if="!showDetail" key="list" class="news-list-view">
        <!-- 搜索和筛选 -->
        <div class="filter-section">
          <div class="search-box">
            <input 
              v-model="searchKeyword" 
              type="text" 
              placeholder="搜索新闻标题或内容..."
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

        <!-- 新闻列表 -->
        <div class="news-list">
          <div 
            v-for="news in paginatedNews" 
            :key="news.id"
            class="news-item"
            @click="showNewsDetail(news)"
          >
            <div class="news-image">
              <img :src="news.coverImage" :alt="news.title" />
              <div class="category-tag">{{ news.category }}</div>
            </div>
            
            <div class="news-content">
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-summary">{{ news.summary }}</p>
              
              <div class="news-meta">
                <span class="publish-date">{{ formatDate(news.publishDate) }}</span>
                <span class="views">{{ news.views }} 阅读</span>
                <span class="author">{{ news.author }}</span>
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

      <!-- 新闻详情视图 -->
      <NewsDetail 
        v-else 
        key="detail" 
        :news="selectedNews!" 
        @back="backToList"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import NewsDetail from '~/components/NewsDetail/index.vue'

interface NewsItem {
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
const selectedNews = ref<NewsItem | null>(null)
const searchKeyword = ref('')
const selectedCategory = ref('全部')
const currentPage = ref(1)
const pageSize = 6

// 分类数据
const categories = ['全部', '政策法规', '行业动态', '技术创新', '企业新闻', '国际资讯']

// 模拟新闻数据
const newsData = ref<NewsItem[]>([
  {
    id: 1,
    title: '国家发布新能源汽车产业发展规划',
    summary: '为推动新能源汽车产业高质量发展，国家发改委发布了《新能源汽车产业发展规划（2021-2035年）》...',
    content: '<p>为推动新能源汽车产业高质量发展，国家发改委发布了《新能源汽车产业发展规划（2021-2035年）》。</p><p>规划明确了新能源汽车产业发展的总体要求、发展目标、重点任务和保障措施。</p>',
    publishDate: '2024-01-15',
    category: '政策法规',
    views: 1250,
    author: '政策研究部',
    coverImage: 'https://picsum.photos/400/240?random=1',
    tags: ['新能源', '汽车', '政策']
  },
  {
    id: 2,
    title: '人工智能技术在制造业中的应用前景',
    summary: '随着人工智能技术的不断发展，其在制造业中的应用越来越广泛，为传统制造业带来了新的发展机遇...',
    content: '<p>人工智能技术正在深刻改变制造业的面貌。</p><p>从智能制造到预测性维护，AI技术为制造业提供了全新的解决方案。</p>',
    publishDate: '2024-01-12',
    category: '技术创新',
    views: 980,
    author: '技术部',
    coverImage: 'https://picsum.photos/400/240?random=2'
  },
  {
    id: 3,
    title: '绿色发展理念引领企业转型升级',
    summary: '在碳达峰、碳中和目标指引下，越来越多的企业开始践行绿色发展理念，推动产业结构优化升级...',
    content: '<p>绿色发展已成为企业可持续发展的必由之路。</p><p>通过技术创新和管理创新，企业正在实现经济效益与环境效益的双赢。</p>',
    publishDate: '2024-01-10',
    category: '企业新闻',
    views: 756,
    author: '环保部',
    coverImage: 'https://picsum.photos/400/240?random=3'
  },
  {
    id: 4,
    title: '数字化转型助力中小企业发展',
    summary: '数字化转型已成为中小企业提升竞争力的重要途径，通过数字技术的应用，企业运营效率显著提升...',
    content: '<p>数字化转型为中小企业带来了新的发展机遇。</p><p>云计算、大数据、物联网等技术的应用，帮助企业降本增效。</p>',
    publishDate: '2024-01-08',
    category: '行业动态',
    views: 642,
    author: '数字化部',
    coverImage: 'https://picsum.photos/400/240?random=4'
  },
  {
    id: 5,
    title: '国际贸易新格局下的机遇与挑战',
    summary: '全球贸易格局正在发生深刻变化，我国企业需要在新的国际环境中寻找发展机遇，应对各种挑战...',
    content: '<p>国际贸易环境的变化为我国企业带来了新的机遇和挑战。</p><p>企业需要加强国际合作，提升自身竞争力。</p>',
    publishDate: '2024-01-05',
    category: '国际资讯',
    views: 523,
    author: '国际部',
    coverImage: 'https://picsum.photos/400/240?random=5'
  },
  {
    id: 6,
    title: '科技创新驱动高质量发展',
    summary: '科技创新是推动高质量发展的第一动力，各地正在加大科技投入，培育新的经济增长点...',
    content: '<p>科技创新正在成为经济发展的核心驱动力。</p><p>通过加强研发投入和人才培养，推动产业升级和结构优化。</p>',
    publishDate: '2024-01-03',
    category: '技术创新',
    views: 834,
    author: '科技部',
    coverImage: 'https://picsum.photos/400/240?random=6'
  },
  {
    id: 7,
    title: '供应链管理优化提升企业效率',
    summary: '在全球化背景下，供应链管理的重要性日益凸显，优化供应链管理成为企业提升竞争力的关键...',
    content: '<p>供应链管理优化是企业运营的重要环节。</p><p>通过数字化手段和精细化管理，企业可以显著提升运营效率。</p>',
    publishDate: '2024-01-01',
    category: '企业新闻',
    views: 445,
    author: '运营部',
    coverImage: 'https://picsum.photos/400/240?random=7'
  },
  {
    id: 8,
    title: '新材料产业发展迎来新机遇',
    summary: '随着科技进步和产业升级，新材料产业正迎来前所未有的发展机遇，成为推动经济增长的新引擎...',
    content: '<p>新材料产业是战略性新兴产业的重要组成部分。</p><p>在政策支持和市场需求双重驱动下，新材料产业发展前景广阔。</p>',
    publishDate: '2023-12-28',
    category: '行业动态',
    views: 678,
    author: '材料部',
    coverImage: 'https://picsum.photos/400/240?random=8'
  }
])

// 计算属性
const filteredNews = computed(() => {
  let result = newsData.value
  
  // 按分类筛选
  if (selectedCategory.value !== '全部') {
    result = result.filter(news => news.category === selectedCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(news => 
      news.title.toLowerCase().includes(keyword) || 
      news.summary.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

const totalPages = computed(() => Math.ceil(filteredNews.value.length / pageSize))

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredNews.value.slice(start, end)
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

const showNewsDetail = (news: NewsItem) => {
  selectedNews.value = news
  showDetail.value = true
  // 增加阅读量
  news.views++
}

const backToList = () => {
  showDetail.value = false
  selectedNews.value = null
}

// 监听搜索关键词变化
watch(searchKeyword, () => {
  currentPage.value = 1
})
</script>

<style lang="scss" scoped>
.news-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  
  .page-title {
    font-size: 36px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .page-subtitle {
    font-size: 16px;
    color: #7f8c8d;
  }
}

.news-list-view {
  max-width: 1200px;
  margin: 0 auto;
}

.filter-section {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  
  .search-box {
    display: flex;
    margin-bottom: 20px;
    
    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #e1e8ed;
      border-radius: 8px 0 0 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s ease;
      
      &:focus {
        border-color: #3498db;
      }
    }
    
    .search-btn {
      padding: 12px 16px;
      background: #3498db;
      border: none;
      border-radius: 0 8px 8px 0;
      color: #fff;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &:hover {
        background: #2980b9;
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
      border: 1px solid #dee2e6;
      border-radius: 20px;
      color: #6c757d;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      
      &:hover {
        background: #e9ecef;
        border-color: #adb5bd;
      }
      
      &.active {
        background: #3498db;
        border-color: #3498db;
        color: #fff;
      }
    }
  }
}

.news-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.news-item {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
  
  .news-image {
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
      background: rgba(52, 152, 219, 0.9);
      color: #fff;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
  }
  
  .news-content {
    padding: 20px;
    
    .news-title {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .news-summary {
      color: #7f8c8d;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .news-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #95a5a6;
      
      .publish-date {
        font-weight: 500;
      }
    }
  }
  
  &:hover .news-image img {
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
    border: 1px solid #dee2e6;
    border-radius: 6px;
    color: #6c757d;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: #f8f9fa;
      border-color: #adb5bd;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .page-number {
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    color: #6c757d;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 40px;
    text-align: center;
    
    &:hover {
      background: #f8f9fa;
      border-color: #adb5bd;
    }
    
    &.active {
      background: #3498db;
      border-color: #3498db;
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
  .news-page {
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
  
  .news-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .news-item {
    .news-content {
      padding: 15px;
      
      .news-title {
        font-size: 16px;
      }
      
      .news-meta {
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