import Mock from "mockjs"
import { defineMock } from "@alova/mock"

export default defineMock(
  {
    "/api/news/all": () => {
      const data = Mock.mock({
        "list|1-10": [
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
  },
  true,
)
