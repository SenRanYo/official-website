<template>
  <div class="enterprise-culture">
    <div class="container">
      <div class="culture-layout">
        <!-- 左侧菜单 -->
        <div class="culture-sidebar">
          <div class="sidebar-title">
            <h2>四川公司</h2>
          </div>
          <nav class="culture-menu">
            <ul>
              <li v-for="(item, index) in cultureMenu" :key="index" :class="{ active: activeMenuIndex === index }" @click="setActiveMenu(index)">
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

// 四川公司菜单数据
const cultureMenu = ref([
  { title: "公司概况", key: "overview" },
  { title: "发展历程", key: "history" },
  { title: "业务布局", key: "business" },
  { title: "企业文化", key: "culture" },
  { title: "科技创新", key: "innovation" },
  { title: "社会责任", key: "responsibility" },
  { title: "人才建设", key: "talent" },
  { title: "未来展望", key: "future" },
])

// 当前激活的菜单索引
const activeMenuIndex = ref(0) // 默认选中"公司概况"

// 四川公司内容数据
const cultureContent = ref({
  overview: {
    title: "公司概况",
    content: `
      <h3>华电四川发电有限公司</h3>
      <p>华电四川发电有限公司（简称"华电四川"）是中国华电集团有限公司在四川省设立的区域性公司，负责华电集团在四川省的电力项目投资、建设和运营管理。</p>
      
      <h4>公司规模：</h4>
      <ul>
        <li><strong>装机容量：</strong>超过2000万千瓦</li>
        <li><strong>资产总额：</strong>超过500亿元</li>
        <li><strong>员工总数：</strong>超过5000人</li>
        <li><strong>项目数量：</strong>30多个电力项目</li>
      </ul>
      
      <h4>业务范围：</h4>
      <ul>
        <li>水电开发与运营</li>
        <li>火电建设与管理</li>
        <li>新能源项目开发</li>
        <li>电力销售与服务</li>
        <li>能源技术咨询</li>
      </ul>
      
      <h4>发展优势：</h4>
      <ul>
        <li>四川丰富的水力资源</li>
        <li>完善的电力基础设施</li>
        <li>先进的技术和管理</li>
        <li>良好的政企合作关系</li>
      </ul>
    `,
  },
  history: {
    title: "发展历程",
    content: `
      <h3>发展历程</h3>
      <p>华电四川公司自成立以来，在四川省委省政府和华电集团的大力支持下，实现了快速发展。</p>
      
      <h4>重要节点：</h4>
      <ul>
        <li><strong>2003年：</strong>华电四川公司正式成立</li>
        <li><strong>2005年：</strong>首个大型水电站投产发电</li>
        <li><strong>2010年：</strong>装机容量突破1000万千瓦</li>
        <li><strong>2015年：</strong>清洁能源装机占比超过60%</li>
        <li><strong>2020年：</strong>装机容量突破2000万千瓦</li>
        <li><strong>2025年：</strong>清洁能源装机占比达到80%以上</li>
      </ul>
      
      <h4>发展成就：</h4>
      <ul>
        <li>成为四川省最大的发电企业之一</li>
        <li>在清洁能源领域保持领先地位</li>
        <li>获得多项国家级和省级荣誉</li>
        <li>为四川经济社会发展做出重要贡献</li>
      </ul>
      
      <h4>里程碑项目：</h4>
      <ul>
        <li>泸定水电站（920MW）</li>
        <li>瀑布沟水电站（3600MW）</li>
        <li>深溪沟水电站（660MW）</li>
        <li>多个风电、光伏项目</li>
      </ul>
    `,
  },
  business: {
    title: "业务布局",
    content: `
      <h3>业务布局</h3>
      <p>华电四川公司形成了以水电为主，火电、新能源协调发展的业务格局。</p>
      
      <h4>水电业务：</h4>
      <ul>
        <li><strong>大型水电站：</strong>瀑布沟、深溪沟、泸定等</li>
        <li><strong>中型水电站：</strong>多个梯级开发项目</li>
        <li><strong>小水电：</strong>分布式水电项目</li>
        <li><strong>抽水蓄能：</strong>规划建设抽水蓄能电站</li>
      </ul>
      
      <h4>火电业务：</h4>
      <ul>
        <li>高效燃煤发电机组</li>
        <li>燃气发电项目</li>
        <li>热电联产项目</li>
        <li>超低排放改造</li>
      </ul>
      
      <h4>新能源业务：</h4>
      <ul>
        <li><strong>风电：</strong>陆上风电项目开发</li>
        <li><strong>光伏：</strong>集中式和分布式光伏</li>
        <li><strong>储能：</strong>电化学储能项目</li>
        <li><strong>综合能源：</strong>多能互补项目</li>
      </ul>
      
      <h4>服务业务：</h4>
      <ul>
        <li>电力销售服务</li>
        <li>能源技术咨询</li>
        <li>运维服务</li>
        <li>工程承包</li>
      </ul>
    `,
  },
  culture: {
    title: "企业文化",
    content: `
      <h3>企业文化</h3>
      <p>华电四川公司秉承华电集团企业文化，结合四川地域特色，形成了独具特色的企业文化体系。</p>
      
      <h4>企业使命：</h4>
      <p><strong>"奉献清洁能源，服务四川发展"</strong></p>
      
      <h4>企业愿景：</h4>
      <p><strong>"建设西南地区一流的清洁能源企业"</strong></p>
      
      <h4>核心价值观：</h4>
      <ul>
        <li><strong>求实：</strong>实事求是，真抓实干</li>
        <li><strong>创新：</strong>解放思想，开拓进取</li>
        <li><strong>团结：</strong>同心同德，团结协作</li>
        <li><strong>奉献：</strong>服务社会，奉献能源</li>
      </ul>
      
      <h4>企业精神：</h4>
      <p>自强不息，追求卓越，团结协作，开拓创新</p>
      
      <h4>管理理念：</h4>
      <ul>
        <li>以人为本，和谐发展</li>
        <li>精细管理，持续改进</li>
        <li>科技创新，引领发展</li>
        <li>开放合作，互利共赢</li>
      </ul>
    `,
  },
  innovation: {
    title: "科技创新",
    content: `
      <h3>科技创新</h3>
      <p>华电四川公司坚持创新驱动发展战略，不断提升自主创新能力，在多个技术领域取得重大突破。</p>
      
      <h4>创新体系：</h4>
      <ul>
        <li>省级技术中心</li>
        <li>博士后科研工作站</li>
        <li>院士专家工作站</li>
        <li>产学研合作平台</li>
      </ul>
      
      <h4>技术成果：</h4>
      <ul>
        <li>大型水轮发电机组技术</li>
        <li>高水头水电站技术</li>
        <li>智能水电技术</li>
        <li>新能源并网技术</li>
        <li>储能技术应用</li>
      </ul>
      
      <h4>创新投入：</h4>
      <ul>
        <li>研发投入占营业收入比重超过2%</li>
        <li>拥有专利技术超过1000项</li>
        <li>获得省部级科技进步奖50余项</li>
        <li>参与制定行业标准20余项</li>
      </ul>
      
      <h4>创新平台：</h4>
      <ul>
        <li>与高校建立联合实验室</li>
        <li>与科研院所开展合作</li>
        <li>参与国家重大科技项目</li>
        <li>开展国际技术交流</li>
      </ul>
    `,
  },
  responsibility: {
    title: "社会责任",
    content: `
      <h3>社会责任</h3>
      <p>华电四川公司积极履行社会责任，为四川省经济社会发展做出重要贡献。</p>
      
      <h4>经济贡献：</h4>
      <ul>
        <li>年发电量超过800亿kW·h</li>
        <li>年上缴税收超过20亿元</li>
        <li>带动相关产业发展</li>
        <li>创造就业机会超过1万个</li>
      </ul>
      
      <h4>社会贡献：</h4>
      <ul>
        <li>参与扶贫攻坚工作</li>
        <li>支持教育事业发展</li>
        <li>开展公益活动</li>
        <li>促进民族团结</li>
      </ul>
      
      <h4>环境贡献：</h4>
      <ul>
        <li>发展清洁能源，减少碳排放</li>
        <li>保护生态环境</li>
        <li>推进绿色发展</li>
        <li>建设美丽四川</li>
      </ul>
      
      <h4>民生改善：</h4>
      <ul>
        <li>提供稳定可靠的电力供应</li>
        <li>改善当地基础设施</li>
        <li>促进就业增收</li>
        <li>提升生活水平</li>
      </ul>
    `,
  },
  talent: {
    title: "人才建设",
    content: `
      <h3>人才建设</h3>
      <p>华电四川公司坚持人才强企战略，建立完善的人才培养体系，打造高素质专业化人才队伍。</p>
      
      <h4>人才理念：</h4>
      <p><strong>"以人为本，人才强企"</strong></p>
      
      <h4>人才结构：</h4>
      <ul>
        <li>专业技术人才占比超过70%</li>
        <li>本科以上学历占比超过85%</li>
        <li>高级职称人员超过800人</li>
        <li>享受国务院特殊津贴专家20余人</li>
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
      
      <h4>人才引进：</h4>
      <ul>
        <li>校园招聘</li>
        <li>社会招聘</li>
        <li>高端人才引进</li>
        <li>海外人才引进</li>
      </ul>
    `,
  },
  future: {
    title: "未来展望",
    content: `
      <h3>未来展望</h3>
      <p>华电四川公司将继续坚持科学发展，不断提升发展质量，为四川省经济社会发展做出更大贡献。</p>
      
      <h4>发展目标：</h4>
      <ul>
        <li>建设成为西南地区一流的清洁能源企业</li>
        <li>装机容量达到3000万千瓦以上</li>
        <li>清洁能源装机占比达到90%以上</li>
        <li>年发电量超过1000亿kW·h</li>
      </ul>
      
      <h4>重点任务：</h4>
      <ul>
        <li>大力发展清洁能源</li>
        <li>推进传统能源清洁化改造</li>
        <li>加强科技创新和人才培养</li>
        <li>提升企业管理水平</li>
      </ul>
      
      <h4>发展方向：</h4>
      <ul>
        <li>智能化运营管理</li>
        <li>数字化技术应用</li>
        <li>综合能源服务</li>
        <li>储能技术应用</li>
      </ul>
      
      <h4>合作展望：</h4>
      <ul>
        <li>加强与地方政府合作</li>
        <li>推进产学研合作</li>
        <li>开展国际合作</li>
        <li>参与"一带一路"建设</li>
      </ul>
    `,
  },
})

// 计算当前显示的内容
const currentContent = computed(() => {
  const currentKey = cultureMenu.value[activeMenuIndex.value]?.key
  if (!currentKey) return { title: "", content: "" }
  return cultureContent.value[currentKey as keyof typeof cultureContent.value] || { title: "", content: "" }
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

        p,
        ul li {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
