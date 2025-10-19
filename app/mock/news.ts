import Mock from "mockjs"
import { defineMock } from "@alova/mock"

export default defineMock(
  {
    "/api/news/list": () => {
      const data = Mock.mock({
        "list|5-10": [
          {
            date: "@date('yyyy.MM')",
            day: "@integer(1, 30)",
            title: "@ctitle(10, 30)",
            description: "@csentence(20, 50)",
          },
        ],
      })
      return data.list
    },

    "/api/history/list": (options: any) => {
      const { year } = JSON.parse(options.body || "{}")
      const data = Mock.mock({
        "list|2": [
          {
            id: () => Mock.Random.guid(),
            date: `${year}年@pick(["1月", "3月", "6月", "9月", "12月"])`,
            title: "@ctitle(4, 8)",
            desc: "@csentence(15, 30)",
          },
        ],
      })
      return data.list
    },
  },
  true,
)
