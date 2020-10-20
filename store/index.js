import Cookies from 'js-cookie'

export default {
  state: () => {
    return {}
  },
  mutations: {},
  actions: {
    nuxtServerInit({commit, state}, {req}) {
      function cookieToJson() {
        let cookieArr =req.headers.cookie.split(";");
        let obj = {} 
        cookieArr.forEach((i) => {
            let arr = i.split("=");
            obj[arr[0]] =arr[1];
        });
        return obj
      }
      if (req.headers.cookie && (cookieToJson().token)) {
        commit('user/appendUserInfo', JSON.parse(decodeURIComponent(cookieToJson().token)));
      }
    },
  },
  getters: {}
}