<template>
  <div class="enterprise-culture">
    <div class="container">
      <div class="culture-layout">
        <!-- 左侧菜单 -->
        <div class="culture-sidebar">
          <div class="sidebar-title">
            <h2>泸定公司</h2>
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

// 泸定公司菜单数据
const cultureMenu = ref([
  { title: '公司简介', key: 'intro' },
  { title: '电站概况', key: 'station' },
  { title: '发展历程', key: 'history' },
  { title: '技术特色', key: 'technology' },
  { title: '环保理念', key: 'environment' },
  { title: '社会责任', key: 'responsibility' },
  { title: '企业文化', key: 'culture' },
  { title: '未来规划', key: 'future' }
])

// 当前激活的菜单索引
const activeMenuIndex = ref(0) // 默认选中"公司简介"

// 泸定公司内容数据
const cultureContent = ref({
  intro: {
    title: '公司简介',
    content: `
      <h3>四川华电泸定水电有限公司</h3>
      <p>四川华电泸定水电有限公司（以下简称公司）于2006年6月注册成立，由华电国际电力股份有限公司全资设立，负责泸定水电站的投资、建设和运营。</p>
      
      <h4>公司规模：</h4>
      <ul>
        <li><strong>装机容量：</strong>920MW，年发电量37.8亿kW·h</li>
        <li><strong>投资总额：</strong>约60亿元人民币</li>
        <li><strong>员工人数：</strong>200余人</li>
        <li><strong>投产时间：</strong>2012年全面投产发电</li>
      </ul>
      
      <h4>地理位置：</h4>
      <p>泸定水电站位于四川省甘孜藏族自治州泸定县境内，是大渡河干流中游河段梯级开发的重要电站，坝址距下游泸定县城2.5公里。</p>
      
      <h4>主要功能：</h4>
      <ul>
        <li>发电：为四川电网提供清洁电力</li>
        <li>防洪：提高下游地区防洪能力</li>
        <li>航运：改善大渡河航运条件</li>
        <li>旅游：促进当地旅游业发展</li>
      </ul>
    `
  },
  station: {
    title: '电站概况',
    content: `
      <h3>泸定水电站</h3>
      <p>泸定水电站是一座以发电为主，兼顾防洪、航运等综合利用的大型水电站。</p>
      
      <h4>工程规模：</h4>
      <ul>
        <li><strong>坝型：</strong>混凝土重力坝</li>
        <li><strong>坝高：</strong>85.5米</li>
        <li><strong>坝长：</strong>约500米</li>
        <li><strong>水库总库容：</strong>2.4亿立方米</li>
        <li><strong>调节库容：</strong>1.2亿立方米</li>
      </ul>
      
      <h4>发电机组：</h4>
      <ul>
        <li><strong>机组台数：</strong>4台</li>
        <li><strong>单机容量：</strong>230MW</li>
        <li><strong>总装机容量：</strong>920MW</li>
        <li><strong>年发电量：</strong>37.8亿kW·h</li>
        <li><strong>机组类型：</strong>混流式水轮发电机组</li>
      </ul>
      
      <h4>技术特点：</h4>
      <ul>
        <li>采用先进的自动化控制系统</li>
        <li>具备远程监控和调度能力</li>
        <li>实现无人值守运行</li>
        <li>环保指标达到国际先进水平</li>
      </ul>
    `
  },
  history: {
    title: '发展历程',
    content: `
      <h3>发展历程</h3>
      <p>泸定水电站从规划到建成投产，经历了多个重要阶段，见证了我国水电事业的发展历程。</p>
      
      <h4>重要节点：</h4>
      <ul>
        <li><strong>2003年：</strong>项目可行性研究报告通过审查</li>
        <li><strong>2006年：</strong>四川华电泸定水电有限公司成立</li>
        <li><strong>2007年：</strong>工程正式开工建设</li>
        <li><strong>2010年：</strong>首台机组投产发电</li>
        <li><strong>2012年：</strong>全部4台机组投产发电</li>
        <li><strong>2013年：</strong>工程通过竣工验收</li>
      </ul>
      
      <h4>建设成就：</h4>
      <ul>
        <li>建设周期短，质量优良</li>
        <li>技术创新成果显著</li>
        <li>环保措施落实到位</li>
        <li>移民安置工作圆满完成</li>
        <li>获得多项工程奖项</li>
      </ul>
      
      <h4>运营成果：</h4>
      <ul>
        <li>累计发电量超过300亿kW·h</li>
        <li>为四川电网稳定运行做出重要贡献</li>
        <li>实现安全生产零事故</li>
        <li>经济效益和社会效益显著</li>
      </ul>
    `
  },
  technology: {
    title: '技术特色',
    content: `
      <h3>技术特色</h3>
      <p>泸定水电站采用多项先进技术，在安全、环保、效率等方面达到国际先进水平。</p>
      
      <h4>水轮机技术：</h4>
      <ul>
        <li>采用混流式水轮机，效率高</li>
        <li>适应水头变化范围大</li>
        <li>运行稳定可靠</li>
        <li>维护方便</li>
      </ul>
      
      <h4>发电机技术：</h4>
      <ul>
        <li>同步发电机，功率因数高</li>
        <li>绝缘等级高，运行安全</li>
        <li>冷却系统先进</li>
        <li>自动化程度高</li>
      </ul>
      
      <h4>控制系统：</h4>
      <ul>
        <li>计算机监控系统</li>
        <li>自动发电控制（AGC）</li>
        <li>自动电压控制（AVC）</li>
        <li>故障诊断系统</li>
      </ul>
      
      <h4>环保技术：</h4>
      <ul>
        <li>生态流量下泄设施</li>
        <li>鱼类保护措施</li>
        <li>水土保持工程</li>
        <li>环境监测系统</li>
      </ul>
    `
  },
  environment: {
    title: '环保理念',
    content: `
      <h3>环保理念</h3>
      <p>泸定水电站始终坚持绿色发展理念，在建设和运营过程中高度重视生态环境保护。</p>
      
      <h4>环保措施：</h4>
      <ul>
        <li><strong>生态流量：</strong>确保下游生态用水需求</li>
        <li><strong>鱼类保护：</strong>建设鱼类增殖放流站</li>
        <li><strong>水土保持：</strong>实施水土保持工程</li>
        <li><strong>植被恢复：</strong>库区及周边植被恢复</li>
      </ul>
      
      <h4>环境监测：</h4>
      <ul>
        <li>水质监测系统</li>
        <li>空气质量监测</li>
        <li>噪声监测</li>
        <li>生态监测</li>
      </ul>
      
      <h4>环保成效：</h4>
      <ul>
        <li>库区水质保持优良</li>
        <li>生态环境得到改善</li>
        <li>生物多样性得到保护</li>
        <li>获得环保部门认可</li>
      </ul>
      
      <h4>绿色运营：</h4>
      <ul>
        <li>清洁能源生产</li>
        <li>节能减排措施</li>
        <li>循环经济模式</li>
        <li>可持续发展</li>
      </ul>
    `
  },
  responsibility: {
    title: '社会责任',
    content: `
      <h3>社会责任</h3>
      <p>泸定水电站积极履行社会责任，为地方经济社会发展做出重要贡献。</p>
      
      <h4>经济贡献：</h4>
      <ul>
        <li>年发电量37.8亿kW·h，产值约15亿元</li>
        <li>年上缴税收超过2亿元</li>
        <li>带动相关产业发展</li>
        <li>创造就业机会</li>
      </ul>
      
      <h4>社会贡献：</h4>
      <ul>
        <li>改善当地交通条件</li>
        <li>促进旅游业发展</li>
        <li>支持教育事业</li>
        <li>参与扶贫工作</li>
      </ul>
      
      <h4>民生改善：</h4>
      <ul>
        <li>提供清洁电力</li>
        <li>改善防洪条件</li>
        <li>促进就业增收</li>
        <li>提升生活水平</li>
      </ul>
      
      <h4>公益事业：</h4>
      <ul>
        <li>捐资助学</li>
        <li>扶贫济困</li>
        <li>环境保护</li>
        <li>文化传承</li>
      </ul>
    `
  },
  culture: {
    title: '企业文化',
    content: `
      <h3>企业文化</h3>
      <p>泸定水电站秉承华电集团企业文化，结合自身特点，形成了独具特色的企业文化体系。</p>
      
      <h4>企业使命：</h4>
      <p><strong>"奉献清洁能源，服务地方发展"</strong></p>
      
      <h4>企业愿景：</h4>
      <p><strong>"建设一流的水电企业"</strong></p>
      
      <h4>核心价值观：</h4>
      <ul>
        <li><strong>安全：</strong>安全第一，预防为主</li>
        <li><strong>环保：</strong>绿色发展，生态优先</li>
        <li><strong>创新：</strong>持续改进，追求卓越</li>
        <li><strong>责任：</strong>勇于担当，服务社会</li>
      </ul>
      
      <h4>企业精神：</h4>
      <p>团结协作，艰苦奋斗，开拓创新，追求卓越</p>
      
      <h4>管理理念：</h4>
      <ul>
        <li>以人为本，和谐发展</li>
        <li>精细管理，持续改进</li>
        <li>科技创新，引领发展</li>
        <li>开放合作，互利共赢</li>
      </ul>
    `
  },
  future: {
    title: '未来规划',
    content: `
      <h3>未来规划</h3>
      <p>泸定水电站将继续坚持科学发展，不断提升运营水平，为地方经济社会发展做出更大贡献。</p>
      
      <h4>发展目标：</h4>
      <ul>
        <li>建设成为西南地区一流的水电企业</li>
        <li>实现安全、环保、高效运营</li>
        <li>为四川电网提供稳定可靠的清洁电力</li>
        <li>促进地方经济社会可持续发展</li>
      </ul>
      
      <h4>重点任务：</h4>
      <ul>
        <li>加强设备维护，确保安全运行</li>
        <li>推进技术改造，提高发电效率</li>
        <li>强化环保措施，保护生态环境</li>
        <li>加强人才培养，提升管理水平</li>
      </ul>
      
      <h4>创新方向：</h4>
      <ul>
        <li>智能化运营管理</li>
        <li>数字化技术应用</li>
        <li>新能源技术集成</li>
        <li>环保技术升级</li>
      </ul>
      
      <h4>合作展望：</h4>
      <ul>
        <li>加强与科研院所合作</li>
        <li>推进产学研一体化</li>
        <li>开展国际技术交流</li>
        <li>参与行业标准制定</li>
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
