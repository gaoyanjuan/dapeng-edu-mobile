import vue from 'vue'
import toastComponent from '~/components/global/m-toast'

const ToastConstructor = vue.extend(toastComponent)

function showToast(content, status, shadow = true, duration = 3500) {
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        content,
        status, // 成功[success]&警告[warning]
        shadow, // 是否显示遮罩层
        showWrap: true, // 是否显示组件
        showContent: true // 作用:在隐藏组件之前,显示隐藏动画
      }
    }
  })
  // 在添加Toast之前,先进行dom清理操作
  const toasts = document.getElementsByClassName('toast-wrap') || []
  for (let i = toasts.length - 1; i >= 0; i--) {
    toasts[i].remove()
  }
  // 往body添加toast提示
  document.body.appendChild(toastDom.$el)
  // 提前 250ms 执行淡出动画(因为css里面设置的隐藏动画持续是250ms)
  setTimeout(() => {
    toastDom.showContent = false
  }, duration - 1250)
  // 过了duration时间后隐藏整个组件
  setTimeout(() => {
    toastDom.showWrap = false
  }, duration)
}

vue.prototype.$myToast = showToast

// export default showToast
