import Mock from "mockjs"

interface NewsItem {
  date: string
  day: string
  title: string
  description: string
}

const newsListData: Record<number, NewsItem[]> = {
  0: [
    { date: "2025.10", day: "13", title: "公司与知名高校签署产学研合作协议", description: "加强校企合作，推进技术创新" },
    { date: "2025.10", day: "13", title: "第四季度安全生产工作会议召开", description: "强化安全管理，确保生产安全" },
    { date: "2025.10", day: "13", title: "公司参加行业高峰论坛并发表主题演讲", description: "加强校企合作，推进技术创新" },
    { date: "2025.10", day: "13", title: "新员工入职培训圆满结束", description: "加强校企合作，推进技术创新" },
    { date: "2025.10", day: "13", title: "公司参加行业高峰论坛并发表主题演讲", description: "加强校企合作，推进技术创新" },
    { date: "2025.10", day: "13", title: "新员工入职培训圆满结束", description: "加强校企合作，推进技术创新" },
  ],
  1: [
    { date: "2025.10", day: "12", title: "媒体聚焦：公司绿色发展成就获广泛关注", description: "环保理念得到业界认可" },
    { date: "2025.10", day: "12", title: "新闻发布会召开，公司发展方向明确", description: "未来规划布局合理" },
    { date: "2025.10", day: "12", title: "业界媒体采访团实地考察公司", description: "深入了解企业发展" },
    { date: "2025.10", day: "12", title: "公司荣获行业媒体最高奖项", description: "企业品牌形象提升" },
    { date: "2025.10", day: "12", title: "媒体专访：公司总经理谈发展思路", description: "战略目标清晰有力" },
    { date: "2025.10", day: "12", title: "央视新闻报道公司创新成果", description: "创新驱动发展动能" },
  ],
  2: [
    { date: "2025.10", day: "11", title: "公司最新技术突破新闻发布", description: "科技创新取得新进展" },
    { date: "2025.10", day: "11", title: "公司新项目正式启动", description: "未来发展前景广阔" },
    { date: "2025.10", day: "11", title: "公司与合作伙伴签署战略协议", description: "合作共赢新局面" },
    { date: "2025.10", day: "11", title: "公司获得国家重点项目支持", description: "国家认可与扶持" },
    { date: "2025.10", day: "11", title: "公司创新成果获专利授权", description: "知识产权保护到位" },
    { date: "2025.10", day: "11", title: "公司完成重要基础设施升级", description: "发展基础更加坚实" },
  ],
  3: [
    { date: "2025.10", day: "10", title: "职工文化活动圆满收场", description: "丰富职工精神文化生活" },
    { date: "2025.10", day: "10", title: "员工技能大赛完美落幕", description: "职工专业能力得到检验" },
    { date: "2025.10", day: "10", title: "职工运动会成功举办", description: "增强职工体质和凝聚力" },
    { date: "2025.10", day: "10", title: "职工宿舍改造全面完成", description: "关心职工生活条件" },
    { date: "2025.10", day: "10", title: "职工子女教育补贴政策出台", description: "员工福利待遇提升" },
    { date: "2025.10", day: "10", title: "职工健康体检圆满完成", description: "职工健康受关注" },
  ],
  4: [
    { date: "2025.10", day: "09", title: "公司美景图片新闻展播", description: "公司风景优美环境宜人" },
    { date: "2025.10", day: "09", title: "员工工作风采照片集锦", description: "职工风采展示" },
    { date: "2025.10", day: "09", title: "公司基地航拍图片首发", description: "公司规模与实力展现" },
    { date: "2025.10", day: "09", title: "新产品发布会现场图片", description: "创新成果亮相发布" },
    { date: "2025.10", day: "09", title: "公司团队建设活动照片", description: "团队凝聚力体现" },
    { date: "2025.10", day: "09", title: "企业文化建设展示图片", description: "文化底蕴深厚丰富" },
  ],
}

// Mock 获取新闻列表接口
Mock.mock("/api/news/list", "post", (options: any) => {
  const { category } = JSON.parse(options.body)
  return {
    code: 200,
    message: "success",
    data: newsListData[category] || [],
  }
})

// Mock 获取所有新闻数据接口
Mock.mock("/api/news/all", "get", () => {
  return {
    code: 200,
    message: "success",
    data: newsListData,
  }
})

export default Mock
