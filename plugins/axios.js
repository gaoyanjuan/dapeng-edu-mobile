export default function ({store, redirect, req, route, error, app: { $axios }}) {
  // response拦截器，数据返回后，可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(
    response => {
      response.pageInfo = {
        count: parseInt(response.headers['x-pagination-count']) || 0,
        number: parseInt(response.headers['x-pagination-number']) || 0,
        pages: parseInt(response.headers['x-pagination-pages']) || 1,
        size: parseInt(response.headers['x-pagination-size']) || process.env.global.pageSize
      }
      // if (response.headers['x-pagination-pages']) {
      //   response.pageInfo = {
      //     count: parseInt(response.headers['x-pagination-count']) || 0,
      //     number: parseInt(response.headers['x-pagination-number']) || 0,
      //     pages: parseInt(response.headers['x-pagination-pages']) || 1,
      //     size: parseInt(response.headers['x-pagination-size']) || process.env.global.pageSize
      //   }
      // }
      // 请求接口数据正常，返回数据
      return response
    },
    error => {
      if(error.response.status == 409 && error.response.data.code === 404229){
        return error.response
      }
      console.log(error.response , '服务端接口错误信息')
      return Promise.reject(error.response)   // 返回接口返回的错误信息
    }
  )
}