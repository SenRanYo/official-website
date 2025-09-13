<template>
  <div class="news-detail">
    <div class="detail-header">
      <button class="back-btn" @click="$emit('back')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        返回列表
      </button>
    </div>
    
    <article class="detail-content">
      <header class="article-header">
        <h1 class="article-title">{{ news.title }}</h1>
        <div class="article-meta">
          <span class="publish-date">{{ formatDate(news.publishDate) }}</span>
          <span class="category">{{ news.category }}</span>
          <span class="views">阅读量：{{ news.views }}</span>
        </div>
      </header>
      
      <div class="article-body">
        <div v-if="news.coverImage" class="cover-image">
          <img :src="news.coverImage" :alt="news.title" />
        </div>
        
        <div class="content" v-html="news.content"></div>
        
        <div v-if="news.tags && news.tags.length" class="tags">
          <span class="tag-label">标签：</span>
          <span v-for="tag in news.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
      
      <footer class="article-footer">
        <div class="share-section">
          <span class="share-label">分享到：</span>
          <button class="share-btn" @click="shareToWeChat">微信</button>
          <button class="share-btn" @click="shareToWeibo">微博</button>
          <button class="share-btn" @click="copyLink">复制链接</button>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
interface NewsItem {
  id: number
  title: string
  content: string
  publishDate: string
  category: string
  views: number
  coverImage?: string
  tags?: string[]
}

interface Props {
  news: NewsItem
}

defineProps<Props>()
defineEmits<{
  back: []
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareToWeChat = () => {
  // 微信分享逻辑
  console.log('分享到微信')
}

const shareToWeibo = () => {
  // 微博分享逻辑
  console.log('分享到微博')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style lang="scss" scoped>
.news-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.detail-header {
  margin-bottom: 30px;
  
  .back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #f5f5f5;
    border: none;
    border-radius: 6px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #e0e0e0;
      color: #333;
    }
  }
}

.detail-content {
  .article-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    
    .article-title {
      font-size: 28px;
      font-weight: 700;
      color: #333;
      line-height: 1.4;
      margin-bottom: 15px;
    }
    
    .article-meta {
      display: flex;
      gap: 20px;
      color: #666;
      font-size: 14px;
      
      .category {
        background: #e3f2fd;
        color: #1976d2;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
      }
    }
  }
  
  .article-body {
    .cover-image {
      margin-bottom: 30px;
      text-align: center;
      
      img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
    
    .content {
      font-size: 16px;
      line-height: 1.8;
      color: #333;
      margin-bottom: 30px;
      
      :deep(p) {
        margin-bottom: 16px;
      }
      
      :deep(h2) {
        font-size: 20px;
        font-weight: 600;
        margin: 30px 0 15px;
        color: #333;
      }
      
      :deep(h3) {
        font-size: 18px;
        font-weight: 600;
        margin: 25px 0 12px;
        color: #333;
      }
    }
    
    .tags {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 30px;
      
      .tag-label {
        color: #666;
        font-size: 14px;
      }
      
      .tag {
        background: #f0f0f0;
        color: #666;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
      }
    }
  }
  
  .article-footer {
    padding-top: 20px;
    border-top: 1px solid #eee;
    
    .share-section {
      display: flex;
      align-items: center;
      gap: 15px;
      
      .share-label {
        color: #666;
        font-size: 14px;
      }
      
      .share-btn {
        padding: 6px 12px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #666;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
        
        &:hover {
          background: #f5f5f5;
          border-color: #ccc;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .news-detail {
    padding: 15px;
    margin: 10px;
  }
  
  .detail-content {
    .article-header {
      .article-title {
        font-size: 24px;
      }
      
      .article-meta {
        flex-direction: column;
        gap: 8px;
      }
    }
    
    .article-body .content {
      font-size: 15px;
    }
  }
}
</style>