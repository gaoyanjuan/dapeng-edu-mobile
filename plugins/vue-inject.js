import Vue from 'vue'

/**
 * 注册并监听事件
 */

Vue.prototype.$eventListener = (obj, type, fn) => {
  if (obj.attachEvent) {
    obj.attachEvent('on' + type, function() {
      fn.call(obj)
    })
  } else {
    obj.addEventListener(type, fn, false)
  }
}


const defaultImg = require('@/assets/icons/common/photos-bg.png')
function errorImg() {
  let img = event.srcElement
  img.src = defaultImg
  img.onerror = null
}

Vue.prototype.$errorImg = errorImg