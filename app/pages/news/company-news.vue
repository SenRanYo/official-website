<template>
  <div class="news-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">公司新闻</h1>
      <p class="page-subtitle">了解公司最新动态和发展资讯</p>
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
              placeholder="搜索公司新闻标题或内容..."
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
const categories = ['全部', '公司要闻', '经营动态', '项目进展', '人事任免', '企业荣誉', '社会责任']

// 模拟新闻数据
const newsData = ref<NewsItem[]>([
  {
    id: 1,
    title: '公司召开2024年度工作会议',
    summary: '1月15日，公司在总部召开2024年度工作会议，总结2023年工作成果，部署2024年重点任务...',
    content: '<p>1月15日，公司在总部召开2024年度工作会议。</p><p>会议总结了2023年各项工作成果，分析了当前面临的机遇和挑战，明确了2024年的发展目标和重点任务。</p>',
    publishDate: '2024-01-15',
    category: '公司要闻',
    views: 1580,
    author: '办公室',
    coverImage: 'https://picsum.photos/400/240?random=11',
    tags: ['年度会议', '工作部署', '发展规划']
  },
  {
    id: 2,
    title: '公司与知名企业签署战略合作协议',
    summary: '近日，公司与行业领军企业正式签署战略合作协议，双方将在技术研发、市场拓展等方面深化合作...',
    content: '<p>公司与行业领军企业签署战略合作协议。</p><p>此次合作将充分发挥双方优势，实现资源共享、优势互补，共同推动行业发展。</p>',
    publishDate: '2024-01-12',
    category: '经营动态',
    views: 1245,
    author: '市场部',
    coverImage: 'https://picsum.photos/400/240?random=12'
  },
  {
    id: 3,
    title: '重点项目建设取得重大进展',
    summary: '公司承建的重点工程项目顺利通过关键节点验收，标志着项目建设进入新阶段...',
    content: '<p>重点工程项目通过关键节点验收。</p><p>项目团队克服各种困难，确保了工程质量和进度，为后续工作奠定了坚实基础。</p>',
    publishDate: '2024-01-10',
    category: '项目进展',
    views: 987,
    author: '工程部',
    coverImage: 'https://picsum.photos/400/240?random=13'
  },
  {
    id: 4,
    title: '公司荣获行业优秀企业称号',
    summary: '在行业协会举办的年度评选中，公司凭借出色的经营业绩和社会贡献荣获优秀企业称号...',
    content: '<p>公司荣获行业优秀企业称号。</p><p>这一荣誉是对公司多年来坚持高质量发展、履行社会责任的充分肯定。</p>',
    publishDate: '2024-01-08',
    category: '企业荣誉',
    views: 756,
    author: '品牌部',
    coverImage: 'https://picsum.photos/400/240?random=14'
  },
  {
    id: 5,
    title: '公司开展员工技能培训活动',
    summary: '为提升员工专业技能和综合素质，公司组织开展了为期一周的技能培训活动...',
    content: '<p>公司开展员工技能培训活动。</p><p>培训内容涵盖专业技能、安全生产、团队协作等多个方面，有效提升了员工综合能力。</p>',
    publishDate: '2024-01-05',
    category: '公司要闻',
    views: 634,
    author: '人力资源部',
    coverImage: 'https://picsum.photos/400/240?random=15'
  },
  {
    id: 6,
    title: '公司积极参与公益慈善活动',
    summary: '公司响应社会号召，积极参与当地公益慈善活动，展现企业社会责任担当...',
    content: '<p>公司积极参与公益慈善活动。</p><p>通过捐资助学、环保公益等多种形式，为社会发展贡献企业力量。</p>',
    publishDate: '2024-01-03',
    category: '社会责任',
    views: 523,
    author: '党群工作部',
    coverImage: 'https://picsum.photos/400/240?random=16'
  },
  {
    id: 7,
    title: '公司新产品研发取得突破性进展',
    summary: '经过研发团队的不懈努力，公司新产品研发项目取得突破性进展，预计将于年内投入市场...',
    content: '<p>新产品研发取得突破性进展。</p><p>该产品采用先进技术，具有良好的市场前景，将为公司发展注入新动力。</p>',
    publishDate: '2024-01-01',
    category: '经营动态',
    views: 445,
    author: '研发中心',
    coverImage: 'https://picsum.photos/400/240?random=17'
  },
  {
    id: 8,
    title: '公司领导班子调整任免通知',
    summary: '根据公司发展需要和组织安排，现对公司部分领导职务进行调整...',
    content: '<p>公司领导班子调整任免通知。</p><p>此次调整旨在优化管理结构，提升管理效能，为公司持续发展提供组织保障。</p>',
    publishDate: '2023-12-28',
    category: '人事任免',
    views: 678,
    author: '组织人事部',
    coverImage: 'https://picsum.photos/400/240?random=18'
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
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  
  .page-title {
    font-size: 36px;
    font-weight: 700;
    color: #1565c0;
    margin-bottom: 10px;
  }
  
  .page-subtitle {
    font-size: 16px;
    color: #1976d2;
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
  box-shadow: 0 4px 20px rgba(21, 101, 192, 0.1);
  margin-bottom: 30px;
  
  .search-box {
    display: flex;
    margin-bottom: 20px;
    
    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #e3f2fd;
      border-radius: 8px 0 0 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s ease;
      
      &:focus {
        border-color: #1976d2;
      }
    }
    
    .search-btn {
      padding: 12px 16px;
      background: #1976d2;
      border: none;
      border-radius: 0 8px 8px 0;
      color: #fff;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &:hover {
        background: #1565c0;
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
      border: 1px solid #e3f2fd;
      border-radius: 20px;
      color: #1976d2;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      
      &:hover {
        background: #e3f2fd;
        border-color: #bbdefb;
      }
      
      &.active {
        background: #1976d2;
        border-color: #1976d2;
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
  box-shadow: 0 4px 20px rgba(21, 101, 192, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(21, 101, 192, 0.2);
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
      background: rgba(25, 118, 210, 0.9);
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
      color: #1565c0;
      margin-bottom: 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .news-summary {
      color: #666;
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
      color: #999;
      
      .publish-date {
        font-weight: 500;
        color: #1976d2;
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
    border: 1px solid #e3f2fd;
    border-radius: 6px;
    color: #1976d2;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: #e3f2fd;
      border-color: #bbdefb;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .page-number {
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #e3f2fd;
    border-radius: 6px;
    color: #1976d2;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 40px;
    text-align: center;
    
    &:hover {
      background: #e3f2fd;
      border-color: #bbdefb;
    }
    
    &.active {
      background: #1976d2;
      border-color: #1976d2;
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