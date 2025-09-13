export default function () {
  return useState("menuData", () => {
    return [
      {
        title: "首页",
        route: "/",
        child: [],
      },
      {
        title: "简介",
        route: "/about",
        child: [
          {
            title: "集团简介",
            route: "/about?menu=0#gsjj",
          },
          {
            title: "发展历程",
            route: "/about?menu=1#fzlc",
          },
          {
            title: "企业文化",
            route: "/about?menu=2#qywh",
          },
        ],
      },
      {
        title: "产业版图",
        route: "/estate",
        child: [
          {
            title: "文化科技板块",
            route: "/estate?menu=0",
          },
          {
            title: "福利营销板块",
            route: "/estate?menu=1",
          },
          {
            title: "文化投资板块",
            route: "/estate?menu=2",
          },
        ],
      },
      {
        title: "公司资讯",
        route: "/news",
        child: [],
        footerHide: true,
      },
      {
        title: "加入我们",
        route: "/join",
        child: [
          {
            title: "人才&招聘",
            route: "/join?menu=0#rcfz",
          },
          {
            title: "福利&环境",
            route: "/join?menu=3#ygfl",
          },
          {
            title: "员工活动",
            route: "/join?menu=5#yghd",
          },
          {
            title: "加入我们",
            route: "/join?menu=6#jrwm",
            footerHide: true,
          },
        ],
      },
      {
        title: "合作伙伴",
        route: "/cooperate",
        child: [],
        footerHide: true,
      },
      {
        title: "联系我们",
        route: "/contact",
        child: [
          {
            title: "福州总部",
            route: "/contact#fzgs",
          },
          {
            title: "北京",
            route: "/contact#bjgs",
          },
          {
            title: "上海",
            route: "/contact#shgs",
          },
        ],
      },
    ]
  })
}
