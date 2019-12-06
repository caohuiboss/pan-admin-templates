const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  id: state => state.user.id,
  name: state => state.user.name,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  buttons: state => state.user.buttons,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  permission_routes: state => state.permission.routes
}
export default getters
