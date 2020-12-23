// 路由列表
import { routeList } from "~/assets/routes"

export default function ({ route, store }) {

  route.meta.matomo = {
    documentTitle: ['setDocumentTitle', routes(route.name)],
    userId: ['setUserId', store.state.user.userInfo ? store.state.user.userInfo.userId : '未登录用户']
  }

  function routes(params) {

    const routes = routeList.filter(function (item) { 
      return item.key === params
    })

    if (routes && routes[0]) return routes[0].title
    
    if (!routes || !routes[0]) return '未登记页面'
    
  }
}