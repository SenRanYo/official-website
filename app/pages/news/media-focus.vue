<template>
  <div class="media-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">媒体聚焦</h1>
      <p class="page-subtitle">关注媒体报道，了解行业声音</p>
    </div>

    <!-- 过渡动画容器 -->
    <Transition name="slide" mode="out-in">
      <!-- 媒体报道列表视图 -->
      <div v-if="!showDetail" key="list" class="media-list-view">
        <!-- 搜索和筛选 -->
        <div class="filter-section">
          <div class="search-box">
            <input 
              v-model="searchKeyword" 
              type="text" 
              placeholder="搜索媒体报道标题或内容..."
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

        <!-- 媒体报道列表 -->
        <div class="media-list">
          <div 
            v-for="media in paginatedMedia" 
            :key="media.id"
            class="media-item"
            @click="showMediaDetail(media)"
          >
            <div class="media-image">
              <img :src="media.coverImage" :alt="media.title" />
              <div class="source-tag">{{ media.category }}</div>
            </div>
            
            <div class="media-content">
              <h3 class="media-title">{{ media.title }}</h3>
              <p class="media-summary">{{ media.summary }}</p>
              
              <div class="media-meta">
                <span class="publish-date">{{ formatDate(media.publishDate) }}</span>
                <span class="views">{{ media.views }} 阅读</span>
                <span class="source">{{ media.category }}</span>
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

      <!-- 媒体报道详情视图 -->
      <NewsDetail 
        v-else 
        key="detail" 
        :news="selectedMedia!" 
        @back="backToList"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import NewsDetail from '~/components/NewsDetail/index.vue'

interface MediaItem {
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
const selectedMedia = ref<MediaItem | null>(null)
const searchKeyword = ref('')
const selectedCategory = ref('全部')
const currentPage = ref(1)
const pageSize = 6

// 分类数据（按媒体类型）
const categories = ['全部', '央视新闻', '人民日报', '新华社', '经济日报', '行业媒体', '地方媒体']

// 模拟媒体报道数据
const mediaData = ref<MediaItem[]>([
  {
    id: 1,
    title: '央视新闻：某公司创新发展模式获得行业认可',
    summary: '央视新闻报道了某公司在创新发展方面的突出表现，其独特的商业模式和技术创新得到了行业专家的高度评价...',
    content: '<p>央视新闻深度报道了某公司的创新发展历程。</p><p>该公司通过持续的技术创新和模式创新，在激烈的市场竞争中脱颖而出，成为行业发展的标杆企业。</p>',
    publishDate: '2024-01-16',
    category: '央视新闻',
    views: 2580,
    author: '央视记者',
    coverImage: 'https://picsum.photos/400/240?random=21',
    tags: ['创新发展', '行业认可', '商业模式']
  },
  {
    id: 2,
    title: '人民日报：企业社会责任担当获得社会好评',
    summary: '人民日报刊发文章，高度评价了某公司在履行社会责任方面的突出表现，特别是在公益慈善、环境保护等方面的贡献...',
    content: '<p>人民日报专题报道企业社会责任实践。</p><p>该企业积极履行社会责任，在公益慈善、环境保护、员工关爱等方面做出了突出贡献。</p>',
    publishDate: '2024-01-14',
    category: '人民日报',
    views: 2145,
    author: '人民日报记者',
    coverImage: 'https://picsum.photos/400/240?random=22'
  },
  {
    id: 3,
    title: '新华社：重大项目建设成果显著',
    summary: '新华社报道了某公司承建的重大基础设施项目取得的显著成果，项目的成功实施为地方经济发展注入了新动力...',
    content: '<p>新华社深度报道重大项目建设成果。</p><p>该项目的成功实施不仅展现了企业的技术实力，也为当地经济社会发展做出了重要贡献。</p>',
    publishDate: '2024-01-12',
    category: '新华社',
    views: 1987,
    author: '新华社记者',
    coverImage: 'https://picsum.photos/400/240?random=23'
  },
  {
    id: 4,
    title: '经济日报：数字化转型成效突出',
    summary: '经济日报专题报道了某公司在数字化转型方面的成功实践，通过技术创新和管理创新实现了企业的高质量发展...',
    content: '<p>经济日报关注企业数字化转型实践。</p><p>该企业通过数字化转型，提升了运营效率，增强了市场竞争力，为行业数字化发展提供了有益借鉴。</p>',
    publishDate: '2024-01-10',
    category: '经济日报',
    views: 1756,
    author: '经济日报记者',
    coverImage: 'https://picsum.photos/400/240?random=24'
  },
  {
    id: 5,
    title: '行业媒体：技术创新引领行业发展',
    summary: '权威行业媒体深度报道了某公司在技术创新方面的突破性进展，其自主研发的核心技术填补了行业空白...',
    content: '<p>行业媒体聚焦技术创新成果。</p><p>该企业的技术创新不仅提升了自身竞争力，也推动了整个行业的技术进步和发展。</p>',
    publishDate: '2024-01-08',
    category: '行业媒体',
    views: 1534,
    author: '行业分析师',
    coverImage: 'https://picsum.photos/400/240?random=25'
  },
  {
    id: 6,
    title: '地方媒体：助力地方经济发展获得赞誉',
    summary: '地方主流媒体报道了某公司在促进地方经济发展、带动就业创业方面的积极作用，得到了政府和社会的高度认可...',
    content: '<p>地方媒体报道企业对地方发展的贡献。</p><p>该企业扎根本地，积极参与地方建设，为区域经济发展和社会进步做出了重要贡献。</p>',
    publishDate: '2024-01-06',
    category: '地方媒体',
    views: 1323,
    author: '地方记者',
    coverImage: 'https://picsum.photos/400/240?random=26'
  },
  {
    id: 7,
    title: '央视新闻：绿色发展理念践行者',
    summary: '央视新闻再次关注某公司，报道了其在绿色发展、节能减排方面的创新实践和显著成效...',
    content: '<p>央视新闻关注企业绿色发展实践。</p><p>该企业坚持绿色发展理念，在节能减排、环境保护方面取得了显著成效，成为行业绿色发展的典型代表。</p>',
    publishDate: '2024-01-04',
    category: '央视新闻',
    views: 1245,
    author: '央视记者',
    coverImage: 'https://picsum.photos/400/240?random=27'
  },
  {
    id: 8,
    title: '新华社：国际合作取得新突破',
    summary: '新华社报道了某公司在国际市场拓展和对外合作方面取得的新突破，为中国企业走出去树立了良好典型...',
    content: '<p>新华社报道企业国际化发展成果。</p><p>该企业积极参与国际合作，在海外市场取得了良好业绩，提升了中国企业的国际形象。</p>',
    publishDate: '2024-01-02',
    category: '新华社',
    views: 1156,
    author: '新华社记者',
    coverImage: 'https://picsum.photos/400/240?random=28'
  }
])

// 计算属性
const filteredMedia = computed(() => {
  let result = mediaData.value
  
  // 按分类筛选
  if (selectedCategory.value !== '全部') {
    result = result.filter(media => media.category === selectedCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(media => 
      media.title.toLowerCase().includes(keyword) || 
      media.summary.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

const totalPages = computed(() => Math.ceil(filteredMedia.value.length / pageSize))

const paginatedMedia = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredMedia.value.slice(start, end)
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

const showMediaDetail = (media: MediaItem) => {
  selectedMedia.value = media
  showDetail.value = true
  // 增加阅读量
  media.views++
}

const backToList = () => {
  showDetail.value = false
  selectedMedia.value = null
}

// 监听搜索关键词变化
watch(searchKeyword, () => {
  currentPage.value = 1
})
</script>

<style lang="scss" scoped>
.media-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  
  .page-title {
    font-size: 36px;
    font-weight: 700;
    color: #7b1fa2;
    margin-bottom: 10px;
  }
  
  .page-subtitle {
    font-size: 16px;
    color: #8e24aa;
  }
}

.media-list-view {
  max-width: 1200px;
  margin: 0 auto;
}

.filter-section {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(123, 31, 162, 0.1);
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
        border-color: #8e24aa;
      }
    }
    
    .search-btn {
      padding: 12px 16px;
      background: #8e24aa;
      border: none;
      border-radius: 0 8px 8px 0;
      color: #fff;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &:hover {
        background: #7b1fa2;
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
      color: #8e24aa;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      
      &:hover {
        background: #f3e5f5;
        border-color: #e1bee7;
      }
      
      &.active {
        background: #8e24aa;
        border-color: #8e24aa;
        color: #fff;
      }
    }
  }
}

.media-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.media-item {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(123, 31, 162, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(123, 31, 162, 0.2);
  }
  
  .media-image {
    position: relative;
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .source-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(142, 36, 170, 0.9);
      color: #fff;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
  }
  
  .media-content {
    padding: 20px;
    
    .media-title {
      font-size: 18px;
      font-weight: 600;
      color: #7b1fa2;
      margin-bottom: 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .media-summary {
      color: #666;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .media-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #999;
      
      .publish-date {
        font-weight: 500;
        color: #8e24aa;
      }
    }
  }
  
  &:hover .media-image img {
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
    color: #8e24aa;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: #f3e5f5;
      border-color: #e1bee7;
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
    color: #8e24aa;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 40px;
    text-align: center;
    
    &:hover {
      background: #f3e5f5;
      border-color: #e1bee7;
    }
    
    &.active {
      background: #8e24aa;
      border-color: #8e24aa;
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
  .media-page {
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
  
  .media-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .media-item {
    .media-content {
      padding: 15px;
      
      .media-title {
        font-size: 16px;
      }
      
      .media-meta {
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