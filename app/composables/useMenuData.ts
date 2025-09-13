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
        route: "/news/company-news",
        child: [
          {
            title: "公司要闻",
            route: "/news/company-news",
          },
          {
            title: "公司新闻",
            route: "/news/company-news",
          },
          {
            title: "媒体聚焦",
            route: "/news/media-focus",
          },
          {
            title: "图片新闻",
            route: "/news/photo-news",
          },
          {
            title: "专题聚焦",
            route: "/news/special-focus",
          },
          {
            title: "职工园地",
            route: "/news/employee-garden",
          },
        ],
      },
      {
        title: "党的建设",
        route: "/party/party-building",
        child: [
          {
            title: "党建工作",
            route: "/party/party-building",
          },
          {
            title: "工会团青",
            route: "/party/union-youth",
          },
          {
            title: "企业文化",
            route: "/party/corporate-culture",
          },
          {
            title: "厂务公开",
            route: "/party/factory-affairs",
          },
          {
            title: "党务公开",
            route: "/party/party-affairs",
          },
          {
            title: "纪检监察",
            route: "/party/discipline-inspection",
          },
          {
            title: "人力资源",
            route: "/party/human-resources",
          },
        ],
      },
    ]
  })
}
