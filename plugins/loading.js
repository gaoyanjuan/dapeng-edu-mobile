import vue from 'vue'
import loadingComponent from '~/components/global/m-loading'

const loadingConstructor = vue.extend(loadingComponent)

function showLoading(status, duration = 2000) {
  const loadingDom = new loadingConstructor({
    el: document.createElement('div'),
    data() {
      return {
        status,
        // 是否显示组件
        showWrap: true
      }
    }
  })

  // 在添加loading之前,先进行dom清理操作
  const loadings = document.getElementsByClassName('loading') || []
  for (let i = loadings.length - 1; i >= 0; i--) {
    loadings[i].remove()
  }

  // 往body添加loading
  document.body.appendChild(loadingDom.$el)

  // 过了duration时间后隐藏整个组件
  setTimeout(() => {
    loadingDom.showWrap = false
  }, duration)
}

// 每次页面刷新后执行
if (window.performance.navigation.type === 1) {
  showLoading()
}
