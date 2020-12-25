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

let sizeOf
let url
let http
if (!process.browser) {
  sizeOf = require('image-size')
  url = require('url')
  http = require('http')
}
// 获取图片宽高
const defaultHeight = 224
const defaultImg = require('@/assets/icons/common/photos-bg.png')
export function waterFallImgPromise(data, index, defaultWidth = 167) {
  return new Promise((resolve) => {
    if (process.browser) {
      const img = new Image()
      img.src = data[index].videoImg
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
        data[index].videoImg = defaultImg
        data[index].width = defaultWidth
        data[index].height = defaultHeight
        resolve(false)
      }
    } else {
      const videoImg = data[index].videoImg
      const options = url.parse(videoImg)
      http.get(options, function (response) {
        const chunks = []
        response.on('data', function (chunk) {
          chunks.push(chunk)
        }).on('end', function() {
          try {
            const img = sizeOf(Buffer.concat(chunks))
            data[index].width = defaultWidth
            const ratio = img.width / defaultWidth
            data[index].height = parseInt(img.height / ratio)
            resolve(true)
          } catch (error) {
            data[index].width = defaultWidth
            data[index].height = defaultHeight
            resolve(false)
          }
        })
      }).on('error', (e) => {
        data[index].videoImg = defaultImg
        data[index].width = defaultWidth
        data[index].height = defaultHeight
        resolve(false)
      })
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