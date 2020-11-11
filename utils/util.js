// 节流函数
let startTime = new Date()
export function throttle(fn, time = 100) {
  if (typeof fn !== 'function') {
    throw new TypeError('必须传入一个函数作为参数')
  }
  const currentTime = new Date()
  if (currentTime - startTime > time) {
    startTime = currentTime
    fn()
  }
}

// 防抖函数
let timer
export function debounce(fn, time = 100) {
  if (typeof fn !== 'function') {
    throw new TypeError('必须传入一个函数作为参数')
  }
  timer && clearTimeout(timer)

  timer = setTimeout(() => {
    fn()
  }, time)
}

// 获取图片宽高
export function waterFallImgPromise(data, index, defaultWidth = 167) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = data[index].imgUrl
    if (img.complete) {
      data[index].width = defaultWidth
      const ratio = img.width / defaultWidth
      data[index].height = parseInt(img.height / ratio)
      resolve(true)
      return
    }
    img.onload = function () {
      data[index].width = defaultWidth
      const ratio = this.width / defaultWidth
      data[index].height = parseInt(this.height / ratio)
      resolve(true)
    }
    img.onerror = function () {
      data[index].width = defaultWidth
      data[index].height = 363
      resolve(false)
    }
  })
}

// 随机生成文件名
export function randomFileName (len) {
  len = len || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz12345678'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}