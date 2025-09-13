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
        route: "/gsgk/gsjj",
        child: [
          {
            title: "公司简介",
            route: "/gsgk/gsjj",
          },
          {
            title: "领导班子",
            route: "/gsgk/gsjj",
          },
          {
            title: "组织机构",
            route: "/gsgk/gsjj",
          },
          {
            title: "大事记",
            route: "/gsgk/dsj",
          },
        ],
      },
      {
        title: "新闻中心",
        route: "/gsgk/gsjj",
        child: [
          {
            title: "公司要闻",
            route: "/gsgk/gsjj",
          },
          {
            title: "公司新闻",
            route: "/gsgk/gsjj",
          },
          {
            title: "媒体聚焦",
            route: "/gsgk/gsjj",
          },
          {
            title: "图片新闻",
            route: "/gsgk/gsjj",
          },
          {
            title: "专题聚焦",
            route: "/gsgk/gsjj",
          },
          {
            title: "职工园地",
            route: "/gsgk/gsjj",
          },
        ],
      },
      {
        title: "党的建设",
        route: "/gsgk/gsjj",
        child: [
          {
            title: "党建工作",
            route: "/gsgk/gsjj",
          },
          {
            title: "工会团青",
            route: "/gsgk/gsjj",
          },
          {
            title: "企业文化",
            route: "/gsgk/gsjj",
          },
          {
            title: "厂务公开",
            route: "/gsgk/gsjj",
          },
          {
            title: "党务公开",
            route: "/gsgk/gsjj",
          },
          {
            title: "纪检监察",
            route: "/gsgk/gsjj",
          },
          {
            title: "人力资源",
            route: "/gsgk/gsjj",
          },
        ],
      },
    ]
  })
}
