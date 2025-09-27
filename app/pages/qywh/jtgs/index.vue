<template>
  <div class="enterprise-culture">
    <div class="container">
      <div class="culture-layout">
        <!-- 左侧菜单 -->
        <div class="culture-sidebar">
          <div class="sidebar-title">
            <h2>集团公司</h2>
          </div>
          <nav class="culture-menu">
            <ul>
              <li 
                v-for="(item, index) in cultureMenu" 
                :key="index"
                :class="{ active: activeMenuIndex === index }"
                @click="setActiveMenu(index)"
              >
                <span class="menu-icon">▶</span>
                <span class="menu-text">{{ item.title }}</span>
              </li>
            </ul>
          </nav>
        </div>

        <!-- 右侧内容 -->
        <div class="culture-content">
          <div class="content-header">
            <h1>{{ currentContent.title }}</h1>
          </div>
          <div class="content-body">
            <div v-html="currentContent.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

// 集团公司菜单数据
const cultureMenu = ref([
  { title: '集团概况', key: 'overview' },
  { title: '发展历程', key: 'history' },
  { title: '业务领域', key: 'business' },
  { title: '企业文化', key: 'culture' },
  { title: '社会责任', key: 'responsibility' },
  { title: '科技创新', key: 'innovation' },
  { title: '人才建设', key: 'talent' },
  { title: '国际合作', key: 'international' }
])

// 当前激活的菜单索引
const activeMenuIndex = ref(0) // 默认选中"集团概况"

// 集团公司内容数据
const cultureContent = ref({
  overview: {
    title: '集团概况',
    content: `
      <h3>中国华电集团有限公司</h3>
      <p>中国华电集团有限公司（简称"中国华电"）是2002年底国家电力体制改革时组建的国有独资发电企业集团，属于国务院国资委监管的特大型中央企业。</p>
      
      <h4>企业规模：</h4>
      <ul>
        <li><strong>装机容量：</strong>超过1.8亿千瓦，位居全国前列</li>
        <li><strong>资产总额：</strong>超过1万亿元</li>
        <li><strong>员工总数：</strong>超过10万人</li>
        <li><strong>业务覆盖：</strong>全国31个省、自治区、直辖市</li>
      </ul>
      
      <h4>核心业务：</h4>
      <ul>
        <li>电力生产与供应</li>
        <li>煤炭开发与销售</li>
        <li>新能源开发</li>
        <li>金融投资</li>
        <li>科技研发</li>
      </ul>
    `
  },
  history: {
    title: '发展历程',
    content: `
      <h3>发展历程</h3>
      <p>中国华电集团自成立以来，始终坚持科学发展，不断深化改革，实现了跨越式发展。</p>
      
      <h4>重要节点：</h4>
      <ul>
        <li><strong>2002年：</strong>中国华电集团正式成立</li>
        <li><strong>2005年：</strong>在香港联交所成功上市</li>
        <li><strong>2010年：</strong>装机容量突破1亿千瓦</li>
        <li><strong>2015年：</strong>清洁能源装机占比超过30%</li>
        <li><strong>2020年：</strong>实现碳达峰目标</li>
        <li><strong>2025年：</strong>清洁能源装机占比达到50%以上</li>
      </ul>
      
      <h4>发展成就：</h4>
      <ul>
        <li>连续多年入选《财富》世界500强</li>
        <li>获得多项国家级科技进步奖</li>
        <li>在清洁能源领域保持领先地位</li>
        <li>积极参与"一带一路"建设</li>
      </ul>
    `
  },
  business: {
    title: '业务领域',
    content: `
      <h3>业务领域</h3>
      <p>中国华电集团形成了以电力为核心，多元化发展的产业格局。</p>
      
      <h4>电力业务：</h4>
      <ul>
        <li><strong>火电：</strong>燃煤、燃气发电，技术先进，效率领先</li>
        <li><strong>水电：</strong>大型水电站开发运营，清洁高效</li>
        <li><strong>风电：</strong>陆上、海上风电项目，规模领先</li>
        <li><strong>光伏：</strong>集中式、分布式光伏发电</li>
        <li><strong>核电：</strong>参与核电项目投资建设</li>
      </ul>
      
      <h4>煤炭业务：</h4>
      <ul>
        <li>煤炭资源开发</li>
        <li>煤炭生产销售</li>
        <li>煤炭物流运输</li>
        <li>煤炭深加工</li>
      </ul>
      
      <h4>其他业务：</h4>
      <ul>
        <li>金融投资服务</li>
        <li>科技研发创新</li>
        <li>工程建设承包</li>
        <li>国际贸易合作</li>
      </ul>
    `
  },
  culture: {
    title: '企业文化',
    content: `
      <h3>企业文化</h3>
      <p>中国华电集团秉承"奉献清洁能源，创造美好生活"的企业使命，形成了独具特色的企业文化体系。</p>
      
      <h4>企业使命：</h4>
      <p><strong>"奉献清洁能源，创造美好生活"</strong></p>
      
      <h4>企业愿景：</h4>
      <p><strong>"建设具有全球竞争力的世界一流能源企业"</strong></p>
      
      <h4>核心价值观：</h4>
      <ul>
        <li><strong>求实：</strong>实事求是，真抓实干</li>
        <li><strong>创新：</strong>解放思想，开拓进取</li>
        <li><strong>团结：</strong>同心同德，团结协作</li>
        <li><strong>奉献：</strong>服务社会，奉献能源</li>
      </ul>
      
      <h4>企业精神：</h4>
      <p>自强不息，追求卓越，团结协作，开拓创新</p>
    `
  },
  responsibility: {
    title: '社会责任',
    content: `
      <h3>社会责任</h3>
      <p>中国华电集团始终把履行社会责任作为企业的重要使命，积极承担经济、社会、环境责任。</p>
      
      <h4>经济责任：</h4>
      <ul>
        <li>保障国家能源安全</li>
        <li>促进经济社会发展</li>
        <li>创造就业机会</li>
        <li>贡献税收收入</li>
      </ul>
      
      <h4>社会责任：</h4>
      <ul>
        <li>参与扶贫攻坚</li>
        <li>支持教育事业</li>
        <li>开展公益活动</li>
        <li>促进民族团结</li>
      </ul>
      
      <h4>环境责任：</h4>
      <ul>
        <li>发展清洁能源</li>
        <li>减少碳排放</li>
        <li>保护生态环境</li>
        <li>推进绿色发展</li>
      </ul>
    `
  },
  innovation: {
    title: '科技创新',
    content: `
      <h3>科技创新</h3>
      <p>中国华电集团坚持创新驱动发展战略，不断提升自主创新能力，在多个技术领域取得重大突破。</p>
      
      <h4>创新体系：</h4>
      <ul>
        <li>国家级技术中心</li>
        <li>博士后科研工作站</li>
        <li>院士专家工作站</li>
        <li>产学研合作平台</li>
      </ul>
      
      <h4>技术成果：</h4>
      <ul>
        <li>超超临界发电技术</li>
        <li>大型水轮发电机组技术</li>
        <li>海上风电技术</li>
        <li>储能技术</li>
        <li>智能电网技术</li>
      </ul>
      
      <h4>创新投入：</h4>
      <ul>
        <li>研发投入占营业收入比重超过3%</li>
        <li>拥有专利技术超过5000项</li>
        <li>获得国家科技进步奖20余项</li>
        <li>参与制定行业标准100余项</li>
      </ul>
    `
  },
  talent: {
    title: '人才建设',
    content: `
      <h3>人才建设</h3>
      <p>中国华电集团坚持人才强企战略，建立完善的人才培养体系，打造高素质专业化人才队伍。</p>
      
      <h4>人才理念：</h4>
      <p><strong>"以人为本，人才强企"</strong></p>
      
      <h4>人才结构：</h4>
      <ul>
        <li>专业技术人才占比超过60%</li>
        <li>本科以上学历占比超过80%</li>
        <li>高级职称人员超过5000人</li>
        <li>享受国务院特殊津贴专家100余人</li>
      </ul>
      
      <h4>培养体系：</h4>
      <ul>
        <li>新员工入职培训</li>
        <li>专业技术培训</li>
        <li>管理能力培训</li>
        <li>国际化人才培养</li>
        <li>继续教育支持</li>
      </ul>
      
      <h4>激励机制：</h4>
      <ul>
        <li>薪酬激励体系</li>
        <li>股权激励计划</li>
        <li>职业发展通道</li>
        <li>荣誉表彰制度</li>
      </ul>
    `
  },
  international: {
    title: '国际合作',
    content: `
      <h3>国际合作</h3>
      <p>中国华电集团积极参与"一带一路"建设，开展广泛的国际合作，推动全球能源事业发展。</p>
      
      <h4>合作领域：</h4>
      <ul>
        <li>电力项目投资</li>
        <li>技术交流合作</li>
        <li>设备出口贸易</li>
        <li>工程承包服务</li>
        <li>人才培养交流</li>
      </ul>
      
      <h4>重点区域：</h4>
      <ul>
        <li>东南亚地区</li>
        <li>南亚地区</li>
        <li>非洲地区</li>
        <li>拉美地区</li>
        <li>欧洲地区</li>
      </ul>
      
      <h4>合作成果：</h4>
      <ul>
        <li>海外装机容量超过1000万千瓦</li>
        <li>在20多个国家开展业务</li>
        <li>与50多家国际企业建立合作关系</li>
        <li>获得多项国际工程奖项</li>
      </ul>
    `
  }
})

// 计算当前显示的内容
const currentContent = computed(() => {
  const currentKey = cultureMenu.value[activeMenuIndex.value]?.key
  if (!currentKey) return { title: '', content: '' }
  return cultureContent.value[currentKey as keyof typeof cultureContent.value] || { title: '', content: '' }
})

// 设置激活菜单
const setActiveMenu = (index: number) => {
  activeMenuIndex.value = index
}
</script>

<style scoped lang="scss">
.enterprise-culture {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.culture-layout {
  display: flex;
  gap: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.culture-sidebar {
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  
  .sidebar-title {
    padding: 20px;
    background: #2c5aa0;
    color: #fff;
    
    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
  }
  
  .culture-menu {
    padding: 0;
    
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      
      li {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-bottom: 1px solid #e9ecef;
        
        &:hover {
          background-color: #e9ecef;
        }
        
        &.active {
          background-color: #2c5aa0;
          color: #fff;
          
          .menu-icon {
            color: #fff;
          }
        }
        
        .menu-icon {
          margin-right: 10px;
          font-size: 12px;
          color: #6c757d;
          transition: color 0.3s ease;
        }
        
        .menu-text {
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }
}

.culture-content {
  flex: 1;
  padding: 30px;
  
  .content-header {
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e9ecef;
    
    h1 {
      margin: 0;
      font-size: 24px;
      color: #2c5aa0;
      font-weight: 600;
    }
  }
  
  .content-body {
    line-height: 1.8;
    color: #333;
    
    h3 {
      color: #2c5aa0;
      font-size: 20px;
      margin: 30px 0 15px 0;
      font-weight: 600;
    }
    
    h4 {
      color: #495057;
      font-size: 16px;
      margin: 20px 0 10px 0;
      font-weight: 600;
    }
    
    p {
      margin: 15px 0;
      font-size: 14px;
      
      strong {
        color: #2c5aa0;
        font-weight: 600;
      }
    }
    
    ul {
      margin: 15px 0;
      padding-left: 20px;
      
      li {
        margin: 8px 0;
        font-size: 14px;
        
        strong {
          color: #2c5aa0;
          font-weight: 600;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .culture-layout {
    flex-direction: column;
    
    .culture-sidebar {
      width: 100%;
      
      .culture-menu ul li {
        padding: 12px 15px;
        
        .menu-text {
          font-size: 13px;
        }
      }
    }
    
    .culture-content {
      padding: 20px;
      
      .content-header h1 {
        font-size: 20px;
      }
      
      .content-body {
        h3 {
          font-size: 18px;
        }
        
        h4 {
          font-size: 15px;
        }
        
        p, ul li {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
