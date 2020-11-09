import { get_cookie } from '@/utils/cookie-tool';
import jwt_decode from "jwt-decode";

export default {
  state: () => {
    return {}
  },
  mutations: {},
  actions: {
    nuxtServerInit({commit}, {req}) {
      //获取服务端cookie
      const access_token = get_cookie(req.headers.cookie, 'access_token')
      if (access_token) {
        commit('user/appendUserInfo', jwt_decode(access_token).origin.users[0]);
      } else {
        commit('user/appendUserInfo', null);
      }
    },
  },
  getters: {}
}