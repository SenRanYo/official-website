export default function () {
  return useState("menuData", () => {
    return [
      {
        title: "首页",
        route: "/",
        child: [],
      },
      {
        title: "公司概况",
        route: "/gsgk",
        child: [
          {
            title: "公司简介",
            route: "/gsgk#gsjj",
          },
          {
            title: "领导班子",
            route: "/gsgk#ldbz",
          },
          {
            title: "组织机构",
            route: "/gsgk#zzjg",
          },
          {
            title: "发展历程",
            route: "/gsgk#fzlc",
          },
        ],
      },
      {
        title: "新闻中心",
        route: "/xwzx/gsyw",
        child: [
          {
            title: "媒体聚焦",
            route: "/xwzx/mtjj",
          },
          {
            title: "公司要闻",
            route: "/xwzx/gsyw",
          },
          {
            title: "公司新闻",
            route: "/xwzx/gsxw",
          },
          {
            title: "职工园地",
            route: "/xwzx/zgyd",
          },
          {
            title: "图片新闻",
            route: "/xwzx/tpxw",
          },
        ],
      },
      {
        title: "党的建设",
        route: "/ddjs/djgz",
        child: [
          {
            title: "党建工作",
            route: "/ddjs/djgz",
          },
          {
            title: "工会团青",
            route: "/ddjs/ghtq",
          },
          {
            title: "党务公开",
            route: "/ddjs/dwgk",
          },
        ],
      },
      {
        title: "企业文化",
        route: "/qywh/main",
        child: [
          {
            title: "集团公司",
            route: "/qywh/jtgs",
          },
          {
            title: "四川公司",
            route: "/qywh/scgs",
          },
          {
            title: "泸定公司",
            route: "/qywh/ldgs",
          },
        ],
      },
    ]
  })
}
