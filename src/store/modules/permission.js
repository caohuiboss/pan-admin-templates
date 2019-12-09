import { constantRoutes } from '@/router'
import Layout from '@/layout'
/**
 * 递归创建动态路由
 * @param {Array} menus 后台返回的用户拥有的菜单权限集合
 */
export function recursionRouter(menus) {
  const dynamicRouters = []
  menus.forEach(menu => {
    const router = {
      // vue缓存组件使用，保证唯一性，并且和组件名一致。暂时乱写。。。
      // name: `${menus.name}`,
      meta: {}
    }
    if (menu.parentId === 0) {
      router.path = `/${menu.path}`
      router.component = Layout
      router.name = menu.name
      router.meta.title = menu.meta.title
      router.meta.icon = menu.meta.icon
    } else {
      router.path = menu.path
      router.component = () => import(`@/views/${menu.component}`)
      router.name = menu.name
      router.meta.title = menu.meta.title
      router.meta.icon = menu.meta.icon
    }

    // 有子路由
    if (menu.children && menu.children.length > 0) {
      router.children = recursionRouter(menu.children)
    }
    dynamicRouters.push(router)
  })
  return dynamicRouters
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [], // 完整路由链
  addRoutes: [] // 动态路由链
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const errorRouter = { path: '*', redirect: '/error/404', hidden: true }
      const asyncRoutes = recursionRouter(menus).concat(errorRouter)
      commit('SET_ROUTES', asyncRoutes)
      resolve(asyncRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
