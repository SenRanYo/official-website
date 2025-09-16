<template>
  <div class="layout-breadcrumb">
    <div class="left">
      <nav class="breadcrumb-nav">
        <span v-for="(item, index) in breadcrumbItems" :key="index" class="breadcrumb-item">
          <NuxtLink v-if="item.route && index < breadcrumbItems.length - 1" :to="item.route" class="breadcrumb-link">
            {{ item.title }}
          </NuxtLink>
          <span v-else class="breadcrumb-current">
            {{ item.title }}
          </span>
          <span v-if="index < breadcrumbItems.length - 1" class="breadcrumb-separator"> > </span>
        </span>
      </nav>
    </div>
    <div class="right">
      <nav v-if="currentSubMenus.length > 0" class="submenu-nav">
        <NuxtLink v-for="(submenu, index) in currentSubMenus" :key="index" :to="submenu.route" class="submenu-link" :class="{ active: isCurrentSubmenu(submenu.route) }">
          {{ submenu.title }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
const menus = useMenuData()
const route = useRoute()

// 计算面包屑导航项
const breadcrumbItems = computed(() => {
  const items: { title: string; route: string }[] = [{ title: "首页", route: "/" }]

  try {
    const currentPath = route?.path || ""
    const query = route?.query || {}
    const menuData = menus?.value

    if (!menuData || !Array.isArray(menuData)) {
      return items
    }

    for (const menu of menuData) {
      if (!menu || typeof menu.title !== "string" || typeof menu.route !== "string") {
        continue
      }

      // 检查主菜单
      if (menu.route === currentPath) {
        if (menu.title !== "首页") {
          items.push({ title: menu.title, route: menu.route })
        }

        // 检查子菜单
        if (menu.child && Array.isArray(menu.child) && menu.child.length > 0 && query.menu !== undefined) {
          const menuIndex = parseInt(String(query.menu))
          if (!isNaN(menuIndex) && menuIndex >= 0 && menuIndex < menu.child.length) {
            const childItem = menu.child[menuIndex]
            if (childItem && typeof childItem.title === "string" && typeof childItem.route === "string") {
              items.push({ title: childItem.title, route: childItem.route })
            }
          }
        }
        break
      }

      // 检查子菜单
      if (menu.child && Array.isArray(menu.child) && menu.child.length > 0) {
        for (const child of menu.child) {
          if (!child || typeof child.route !== "string" || typeof child.title !== "string") {
            continue
          }

          try {
            const childPath = child.route.split("?")[0]?.split("#")[0] || ""
            if (childPath === currentPath) {
              if (menu.title !== "首页") {
                items.push({ title: menu.title, route: menu.route })
              }
              items.push({ title: child.title, route: child.route })
              return items
            }
          } catch {
            continue
          }
        }
      }
    }
  } catch {
    // 如果出现任何错误，返回默认的首页面包屑
  }

  return items
})

// 计算当前主菜单的子菜单列表
const currentSubMenus = computed(() => {
  try {
    const currentPath = route?.path || ""
    const menuData = menus?.value

    if (!menuData || !Array.isArray(menuData)) {
      return []
    }

    // 查找当前路径对应的主菜单
    for (const menu of menuData) {
      if (!menu || typeof menu.title !== "string" || typeof menu.route !== "string") {
        continue
      }

      // 检查是否是当前主菜单或其子菜单
      if (menu.route === currentPath) {
        // 如果是主菜单页面，返回其子菜单
        if (menu.child && Array.isArray(menu.child) && menu.child.length > 0) {
          return menu.child.filter((child) => child && typeof child.title === "string" && typeof child.route === "string")
        }
        return []
      }

      // 检查是否在子菜单中
      if (menu.child && Array.isArray(menu.child) && menu.child.length > 0) {
        for (const child of menu.child) {
          if (!child || typeof child.route !== "string") continue

          try {
            const childPath = child.route.split("?")[0]?.split("#")[0] || ""
            if (childPath === currentPath) {
              // 如果当前在子菜单页面，返回同级的所有子菜单
              return menu.child.filter((sibling) => sibling && typeof sibling.title === "string" && typeof sibling.route === "string")
            }
          } catch {
            continue
          }
        }
      }
    }
  } catch {
    // 如果出现任何错误，返回空数组
  }

  return []
})

// 判断是否是当前子菜单
const isCurrentSubmenu = (submenuRoute: string) => {
  try {
    const currentPath = route?.path || ""
    const currentQuery = route?.query || {}

    // 解析子菜单路由
    const [path, queryAndHash] = submenuRoute.split("?")
    const basePath = path?.split("#")[0] || ""

    if (basePath !== currentPath) {
      return false
    }

    // 如果有查询参数，检查menu参数是否匹配
    if (queryAndHash) {
      const queryPart = queryAndHash.split("#")[0]
      const urlParams = new URLSearchParams(queryPart)
      const menuParam = urlParams.get("menu")

      if (menuParam !== null) {
        return currentQuery.menu === menuParam
      }
    }

    return true
  } catch {
    return false
  }
}
</script>

<style scoped lang="scss">
.layout-breadcrumb {
  width: 100%;
  height: 50px;
  display: flex;
  padding: 0 12.5%;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: $primary-color;
  }
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
  font-size: 12px;
}

.right {
  margin-left: auto;
}

.submenu-nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.submenu-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #1890ff;
    background-color: #f0f8ff;
  }

  &.active {
    color: $primary-color;
    font-weight: bold;
  }
}
</style>
