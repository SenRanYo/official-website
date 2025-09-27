<template>
  <div class="enterprise-culture">
    <div class="container">
      <div class="culture-layout">
        <!-- 左侧菜单 -->
        <div class="culture-sidebar">
          <div class="sidebar-title">
            <h2>企业文化</h2>
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

// 企业文化菜单数据
const cultureMenu = ref([
  { title: "前言", key: "preface" },
  { title: "公司使命", key: "mission" },
  { title: "公司愿景", key: "vision" },
  { title: "发展思路", key: "development" },
  { title: "核心价值", key: "values" },
  { title: "工作作风", key: "workstyle" },
  { title: "成长理念", key: "growth" },
  { title: "员工守则", key: "code" },
  { title: "公司标识", key: "logo" },
  { title: "结语", key: "conclusion" },
])

// 当前激活的菜单索引
const activeMenuIndex = ref(4) // 默认选中"核心价值"

// 企业文化内容数据
const cultureContent = ref({
  preface: {
    title: "前言",
    content: `
      <p>企业文化是企业的灵魂，是推动企业发展的不竭动力。四川华电泸定水电有限公司在长期的发展实践中，形成了具有自身特色的企业文化体系，为企业持续健康发展提供了强大的精神动力和文化支撑。</p>
      <p>本企业文化手册旨在传承和弘扬企业优秀文化传统，引导全体员工树立正确的价值观念，增强企业凝聚力和向心力，为实现企业战略目标提供文化保障。</p>
    `,
  },
  mission: {
    title: "公司使命",
    content: `
      <h3>使命宣言</h3>
      <p><strong>"奉献清洁能源，创造美好生活"</strong></p>
      <p>我们致力于开发清洁能源，为社会提供安全、可靠、环保的电力服务，通过我们的努力，让能源更加清洁，让生活更加美好。</p>
      
      <h4>具体内涵：</h4>
      <ul>
        <li><strong>清洁能源：</strong>大力发展水电等可再生能源，减少对环境的负面影响</li>
        <li><strong>安全可靠：</strong>确保电力供应安全稳定，为社会经济发展提供保障</li>
        <li><strong>环保责任：</strong>坚持绿色发展理念，保护生态环境，实现可持续发展</li>
        <li><strong>服务社会：</strong>以服务社会为己任，为地方经济发展和民生改善贡献力量</li>
      </ul>
    `,
  },
  vision: {
    title: "公司愿景",
    content: `
      <h3>愿景目标</h3>
      <p><strong>"建设成为西南地区一流的清洁能源企业"</strong></p>
      <p>我们立志成为西南地区清洁能源领域的领军企业，以卓越的业绩、优秀的管理、先进的技术和良好的形象，赢得社会各界的广泛认可。</p>
      
      <h4>实现路径：</h4>
      <ul>
        <li><strong>技术领先：</strong>持续提升技术水平，采用先进的水电技术和管理模式</li>
        <li><strong>管理卓越：</strong>建立现代化的企业管理体系，提高运营效率</li>
        <li><strong>人才强企：</strong>培养和引进高素质人才，建设学习型组织</li>
        <li><strong>文化引领：</strong>以优秀的企业文化凝聚人心，激发创新活力</li>
      </ul>
    `,
  },
  development: {
    title: "发展思路",
    content: `
      <h3>发展战略</h3>
      <p><strong>"以水为主，多元发展，绿色转型，创新驱动"</strong></p>
      <p>坚持水电主业不动摇，积极拓展新能源业务，推进绿色低碳转型，以科技创新为动力，实现企业高质量发展。</p>
      
      <h4>发展重点：</h4>
      <ul>
        <li><strong>主业做强：</strong>优化现有水电站运营，提高发电效率和经济效益</li>
        <li><strong>业务拓展：</strong>积极开发风电、光伏等新能源项目</li>
        <li><strong>绿色转型：</strong>推进清洁能源技术应用，减少碳排放</li>
        <li><strong>科技创新：</strong>加大研发投入，提升自主创新能力</li>
        <li><strong>区域布局：</strong>立足四川，辐射西南，面向全国</li>
      </ul>
    `,
  },
  values: {
    title: "核心价值",
    content: `
      <h3>核心价值观</h3>
      <p>我们的核心价值观是指导全体员工行为的基本准则，是企业文化的核心和灵魂。</p>
      
      <div class="values-list">
        <div class="value-item">
          <h4>"求实"</h4>
          <p>求实务实，真抓实干。一切从实际出发，实事求是，按客观规律办事，了解实际情况，拿出切实可行的办法，做实实在在的事情，求实实在在的效果，创实实在在的业绩。</p>
        </div>
        
        <div class="value-item">
          <h4>"创新"</h4>
          <p>解放思想，开拓进取。敢于突破思维定式，不断改进新机制，增强创新意识，激发创新活力。</p>
        </div>
        
        <div class="value-item">
          <h4>"团结"</h4>
          <p>同心同德，团结协作。增强对华电企业的认同感、归属感和自豪感，心往一处想，劲往一处使，形成强大的合力。</p>
        </div>
      </div>
    `,
  },
  workstyle: {
    title: "工作作风",
    content: `
      <h3>工作作风要求</h3>
      <p>良好的工作作风是企业发展的重要保障，体现了企业的精神风貌和员工的工作态度。</p>
      
      <h4>作风要求：</h4>
      <ul>
        <li><strong>严谨细致：</strong>工作认真负责，注重细节，追求完美</li>
        <li><strong>高效务实：</strong>雷厉风行，真抓实干，注重实效</li>
        <li><strong>团结协作：</strong>相互支持，密切配合，形成合力</li>
        <li><strong>学习进取：</strong>持续学习，不断提升，追求卓越</li>
        <li><strong>廉洁自律：</strong>遵纪守法，清正廉洁，严于律己</li>
      </ul>
      
      <h4>行为准则：</h4>
      <ul>
        <li>严格遵守公司各项规章制度</li>
        <li>保持良好的工作状态和精神面貌</li>
        <li>主动承担责任，积极解决问题</li>
        <li>注重团队合作，营造和谐氛围</li>
        <li>持续改进工作方法，提高工作效率</li>
      </ul>
    `,
  },
  growth: {
    title: "成长理念",
    content: `
      <h3>成长理念</h3>
      <p><strong>"以人为本，共同成长"</strong></p>
      <p>我们相信员工是企业最宝贵的财富，企业的发展离不开员工的成长，员工的成长也推动着企业的发展。</p>
      
      <h4>成长理念内涵：</h4>
      <ul>
        <li><strong>员工成长：</strong>为员工提供学习培训机会，帮助员工提升技能和素质</li>
        <li><strong>职业发展：</strong>建立完善的职业发展通道，让员工有明确的成长路径</li>
        <li><strong>能力提升：</strong>鼓励员工不断学习新知识、新技能，适应发展需要</li>
        <li><strong>价值实现：</strong>为员工提供施展才华的舞台，实现个人价值</li>
        <li><strong>共同发展：</strong>员工与企业共同成长，共享发展成果</li>
      </ul>
      
      <h4>成长支持：</h4>
      <ul>
        <li>建立完善的培训体系</li>
        <li>提供多样化的学习资源</li>
        <li>实施导师制培养模式</li>
        <li>开展岗位轮换锻炼</li>
        <li>建立激励机制</li>
      </ul>
    `,
  },
  code: {
    title: "员工守则",
    content: `
      <h3>员工行为守则</h3>
      <p>员工守则是全体员工必须遵守的基本行为规范，体现了企业的价值观念和文化要求。</p>
      
      <h4>基本要求：</h4>
      <ul>
        <li><strong>遵纪守法：</strong>严格遵守国家法律法规和公司规章制度</li>
        <li><strong>爱岗敬业：</strong>热爱本职工作，认真履行职责</li>
        <li><strong>诚实守信：</strong>诚实做人，诚信做事，言行一致</li>
        <li><strong>团结协作：</strong>相互尊重，相互帮助，共同进步</li>
        <li><strong>勤俭节约：</strong>厉行节约，反对浪费，珍惜资源</li>
      </ul>
      
      <h4>工作规范：</h4>
      <ul>
        <li>按时上下班，不迟到早退</li>
        <li>保持工作场所整洁有序</li>
        <li>保守企业商业秘密</li>
        <li>积极参加公司组织的活动</li>
        <li>维护企业形象和声誉</li>
      </ul>
      
      <h4>禁止行为：</h4>
      <ul>
        <li>不得利用职务之便谋取私利</li>
        <li>不得泄露企业机密信息</li>
        <li>不得参与违法违规活动</li>
        <li>不得损害企业利益和形象</li>
        <li>不得在工作时间从事与工作无关的活动</li>
      </ul>
    `,
  },
  logo: {
    title: "公司标识",
    content: `
      <h3>企业标识系统</h3>
      <p>企业标识是企业形象的重要组成部分，体现了企业的文化内涵和品牌价值。</p>
      
      <h4>标识含义：</h4>
      <ul>
        <li><strong>华电标识：</strong>体现华电集团的企业形象和品牌价值</li>
        <li><strong>水电元素：</strong>突出水电主业特色，体现清洁能源理念</li>
        <li><strong>地域特色：</strong>融入四川地域文化元素，体现地方特色</li>
        <li><strong>时代特征：</strong>体现现代企业形象，展现时代风貌</li>
      </ul>
      
      <h4>使用规范：</h4>
      <ul>
        <li>严格按照标识使用规范使用企业标识</li>
        <li>保持标识的完整性和一致性</li>
        <li>不得随意修改或变形企业标识</li>
        <li>在正式场合必须使用标准标识</li>
        <li>定期更新和维护标识系统</li>
      </ul>
      
      <h4>应用范围：</h4>
      <ul>
        <li>办公用品和宣传材料</li>
        <li>网站和数字媒体</li>
        <li>建筑标识和导视系统</li>
        <li>员工服装和配饰</li>
        <li>各类活动和会议</li>
      </ul>
    `,
  },
  conclusion: {
    title: "结语",
    content: `
      <h3>结语</h3>
      <p>企业文化是企业发展的精神支柱和动力源泉。四川华电泸定水电有限公司将始终坚持"奉献清洁能源，创造美好生活"的使命，秉承"求实、创新、团结"的核心价值观，努力建设成为西南地区一流的清洁能源企业。</p>
      
      <p>让我们携手共进，在优秀企业文化的引领下，为实现企业战略目标、推动清洁能源事业发展、服务地方经济建设而不懈努力！</p>
      
      <div class="conclusion-highlight">
        <p><strong>让我们共同践行企业文化，创造更加美好的明天！</strong></p>
      </div>
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

    .values-list {
      margin: 20px 0;

      .value-item {
        margin: 25px 0;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #2c5aa0;

        h4 {
          color: #2c5aa0;
          font-size: 18px;
          margin: 0 0 10px 0;
          font-weight: 600;
        }

        p {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
        }
      }
    }

    .conclusion-highlight {
      margin: 30px 0;
      padding: 20px;
      background: linear-gradient(135deg, #2c5aa0, #1e3a8a);
      color: #fff;
      border-radius: 8px;
      text-align: center;

      p {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
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

        .values-list .value-item {
          padding: 15px;

          h4 {
            font-size: 16px;
          }

          p {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
