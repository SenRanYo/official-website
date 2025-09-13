<template>
  <div class="union-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">工会青年</h1>
      <p class="page-subtitle">凝聚青春力量，展现青年风采</p>
    </div>

    <!-- 过渡动画容器 -->
    <Transition name="slide" mode="out-in">
      <!-- 工会青年活动列表视图 -->
      <div v-if="!showDetail" key="list" class="union-list-view">
        <!-- 搜索和筛选 -->
        <div class="filter-section">
          <div class="search-box">
            <input 
              v-model="searchKeyword" 
              type="text" 
              placeholder="搜索工会青年活动标题或内容..."
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

        <!-- 工会青年活动列表 -->
        <div class="union-list">
          <div 
            v-for="union in paginatedUnion" 
            :key="union.id"
            class="union-item"
            @click="showUnionDetail(union)"
          >
            <div class="union-image">
              <img :src="union.coverImage" :alt="union.title" />
              <div class="category-tag">{{ union.category }}</div>
            </div>
            
            <div class="union-content">
              <h3 class="union-title">{{ union.title }}</h3>
              <p class="union-summary">{{ union.summary }}</p>
              
              <div class="union-meta">
                <span class="publish-date">{{ formatDate(union.publishDate) }}</span>
                <span class="views">{{ union.views }} 阅读</span>
                <span class="author">{{ union.author }}</span>
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

      <!-- 工会青年活动详情视图 -->
      <NewsDetail 
        v-else 
        key="detail" 
        :news="selectedUnion!" 
        @back="backToList"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import NewsDetail from '~/components/NewsDetail/index.vue'

interface UnionItem {
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
const selectedUnion = ref<UnionItem | null>(null)
const searchKeyword = ref('')
const selectedCategory = ref('全部')
const currentPage = ref(1)
const pageSize = 6

// 分类数据
const categories = ['全部', '工会活动', '青年工作', '文体活动', '技能竞赛', '志愿服务', '员工关爱']

// 模拟工会青年活动数据
const unionData = ref<UnionItem[]>([
  {
    id: 1,
    title: '公司工会举办职工技能大赛',
    summary: '为提升职工技能水平，激发工作热情，公司工会成功举办了职工技能大赛，吸引了众多员工积极参与...',
    content: '<p>公司工会举办职工技能大赛。</p><p>本次大赛设置了多个比赛项目，涵盖了公司各个岗位的核心技能，为员工提供了展示才华的平台。</p>',
    publishDate: '2024-01-16',
    category: '技能竞赛',
    views: 2580,
    author: '工会办公室',
    coverImage: 'https://picsum.photos/400/240?random=51',
    tags: ['技能大赛', '职工活动', '能力提升']
  },
  {
    id: 2,
    title: '青年员工座谈会成功举办',
    summary: '公司团委组织召开青年员工座谈会，倾听青年声音，了解青年需求，为青年发展搭建平台...',
    content: '<p>青年员工座谈会成功举办。</p><p>会议围绕青年员工关心的职业发展、工作环境、生活保障等问题进行了深入交流和讨论。</p>',
    publishDate: '2024-01-14',
    category: '青年工作',
    views: 2145,
    author: '团委',
    coverImage: 'https://picsum.photos/400/240?random=52'
  },
  {
    id: 3,
    title: '职工文艺汇演精彩纷呈',
    summary: '公司工会组织的职工文艺汇演圆满落幕，精彩的节目展现了员工的多才多艺和良好精神风貌...',
    content: '<p>职工文艺汇演精彩纷呈。</p><p>演出节目形式多样，包括歌曲、舞蹈、小品等，充分展示了员工的艺术才华和团队精神。</p>',
    publishDate: '2024-01-12',
    category: '文体活动',
    views: 1987,
    author: '文体部',
    coverImage: 'https://picsum.photos/400/240?random=53'
  },
  {
    id: 4,
    title: '工会组织员工健康体检活动',
    summary: '为关爱员工身体健康，公司工会组织了全员健康体检活动，为员工提供全面的健康检查服务...',
    content: '<p>工会组织员工健康体检活动。</p><p>体检项目全面，包括常规检查、专科检查等，体现了公司对员工健康的关心和重视。</p>',
    publishDate: '2024-01-10',
    category: '员工关爱',
    views: 1756,
    author: '工会办公室',
    coverImage: 'https://picsum.photos/400/240?random=54'
  },
  {
    id: 5,
    title: '青年志愿者服务队走进社区',
    summary: '公司青年志愿者服务队深入社区开展志愿服务活动，用实际行动践行社会责任，传递正能量...',
    content: '<p>青年志愿者服务队走进社区。</p><p>志愿者们开展了环境清洁、敬老助残、科普宣传等多项服务活动，受到了社区居民的一致好评。</p>',
    publishDate: '2024-01-08',
    category: '志愿服务',
    views: 1534,
    author: '青年志愿者协会',
    coverImage: 'https://picsum.photos/400/240?random=55'
  },
  {
    id: 6,
    title: '工会举办职工运动会',
    summary: '公司工会成功举办职工运动会，设置了多个比赛项目，员工踊跃参与，展现了良好的体育精神...',
    content: '<p>工会举办职工运动会。</p><p>运动会设置了田径、球类、趣味项目等多个比赛项目，增强了员工体质，促进了团队合作。</p>',
    publishDate: '2024-01-06',
    category: '文体活动',
    views: 1323,
    author: '体育部',
    coverImage: 'https://picsum.photos/400/240?random=56'
  },
  {
    id: 7,
    title: '青年创新创业大赛启动',
    summary: '为激发青年员工创新创业热情，公司启动了青年创新创业大赛，鼓励青年员工积极参与创新实践...',
    content: '<p>青年创新创业大赛启动。</p><p>大赛旨在为青年员工提供创新创业平台，培养创新思维，提升创新能力，推动企业创新发展。</p>',
    publishDate: '2024-01-04',
    category: '青年工作',
    views: 1245,
    author: '创新发展部',
    coverImage: 'https://picsum.photos/400/240?random=57'
  },
  {
    id: 8,
    title: '工会开展困难职工帮扶活动',
    summary: '公司工会深入开展困难职工帮扶活动，通过多种方式为困难职工提供帮助和支持，体现企业温暖...',
    content: '<p>工会开展困难职工帮扶活动。</p><p>通过资金帮扶、就医协助、子女教育支持等多种方式，为困难职工解决实际问题，传递企业关爱。</p>',
    publishDate: '2024-01-02',
    category: '员工关爱',
    views: 1156,
    author: '帮扶中心',
    coverImage: 'https://picsum.photos/400/240?random=58'
  }
])

// 计算属性
const filteredUnion = computed(() => {
  let result = unionData.value
  
  // 按分类筛选
  if (selectedCategory.value !== '全部') {
    result = result.filter(union => union.category === selectedCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(union => 
      union.title.toLowerCase().includes(keyword) || 
      union.summary.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

const totalPages = computed(() => Math.ceil(filteredUnion.value.length / pageSize))

const paginatedUnion = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredUnion.value.slice(start, end)
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

const showUnionDetail = (union: UnionItem) => {
  selectedUnion.value = union
  showDetail.value = true
  // 增加阅读量
  union.views++
}

const backToList = () => {
  showDetail.value = false
  selectedUnion.value = null
}

// 监听搜索关键词变化
watch(searchKeyword, () => {
  currentPage.value = 1
})
</script>

<style lang="scss" scoped>
.union-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%);
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  
  .page-title {
    font-size: 36px;
    font-weight: 700;
    color: #e65100;
    margin-bottom: 10px;
  }
  
  .page-subtitle {
    font-size: 16px;
    color: #f57c00;
  }
}

.union-list-view {
  max-width: 1200px;
  margin: 0 auto;
}

.filter-section {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(230, 81, 0, 0.1);
  margin-bottom: 30px;
  
  .search-box {
    display: flex;
    margin-bottom: 20px;
    
    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #fff3e0;
      border-radius: 8px 0 0 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s ease;
      
      &:focus {
        border-color: #f57c00;
      }
    }
    
    .search-btn {
      padding: 12px 16px;
      background: #f57c00;
      border: none;
      border-radius: 0 8px 8px 0;
      color: #fff;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &:hover {
        background: #e65100;
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
      border: 1px solid #fff3e0;
      border-radius: 20px;
      color: #f57c00;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      
      &:hover {
        background: #fff3e0;
        border-color: #ffcc02;
      }
      
      &.active {
        background: #f57c00;
        border-color: #f57c00;
        color: #fff;
      }
    }
  }
}

.union-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.union-item {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(230, 81, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(230, 81, 0, 0.2);
  }
  
  .union-image {
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
      background: rgba(245, 124, 0, 0.9);
      color: #fff;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
  }
  
  .union-content {
    padding: 20px;
    
    .union-title {
      font-size: 18px;
      font-weight: 600;
      color: #e65100;
      margin-bottom: 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .union-summary {
      color: #666;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .union-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #999;
      
      .publish-date {
        font-weight: 500;
        color: #f57c00;
      }
    }
  }
  
  &:hover .union-image img {
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
    border: 1px solid #fff3e0;
    border-radius: 6px;
    color: #f57c00;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: #fff3e0;
      border-color: #ffcc02;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .page-number {
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #fff3e0;
    border-radius: 6px;
    color: #f57c00;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 40px;
    text-align: center;
    
    &:hover {
      background: #fff3e0;
      border-color: #ffcc02;
    }
    
    &.active {
      background: #f57c00;
      border-color: #f57c00;
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
  .union-page {
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
  
  .union-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .union-item {
    .union-content {
      padding: 15px;
      
      .union-title {
        font-size: 16px;
      }
      
      .union-meta {
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