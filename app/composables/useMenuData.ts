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
            route: "/gsgk/gsjj",
          },
        ],
      },
      {
        title: "新闻中心",
        route: "/estate",
        child: [
          {
            title: "公司要闻",
            route: "/estate?menu=0",
          },
          {
            title: "公司新闻",
            route: "/estate?menu=1",
          },
          {
            title: "媒体聚焦",
            route: "/estate?menu=2",
          },
          {
            title: "图片新闻",
            route: "/estate?menu=2",
          },
          {
            title: "专题聚焦",
            route: "/estate?menu=2",
          },
          {
            title: "职工园地",
            route: "/estate?menu=2",
          },
        ],
      },
      {
        title: "党的建设",
        route: "/join",
        child: [
          {
            title: "党建工作",
            route: "/join?menu=0#rcfz",
          },
          {
            title: "工会团青",
            route: "/join?menu=3#ygfl",
          },
          {
            title: "企业文化",
            route: "/join?menu=3#ygfl",
          },
          {
            title: "厂务公开",
            route: "/join?menu=3#ygfl",
          },
          {
            title: "党务公开",
            route: "/join?menu=3#ygfl",
          },
          {
            title: "纪检监察",
            route: "/join?menu=3#ygfl",
          },
          {
            title: "人力资源",
            route: "/join?menu=3#ygfl",
          },
        ],
      },
    ]
  })
}
