// 这里的判断类型是自己整理的,覆盖面只涵盖我工作领域的
// 可以按需追加

/**
 *
 * @param {*} UA ,就是userAgent
 * @returns  type: 设备类型
 *           env: 访问环境(微信/微博/qq)
 *           masklayer: 就是给外部拿到判断是否显示遮罩层的,一些特殊环境要引导用户到外部去打开访问
 */

function isMobile(UA) {
  return /(Android|webOS|iPhone|iPad|tablet|BlackBerry|Mobile)/i.test(UA)
    ? true
    : false;
}

function isIPad(UA) {
  return /iPad/i.test(UA) ? true : false;
}

export function deviceType(UA) {
  if (isMobile(UA)) {
    if (isIPad(UA)) {
      return {
        type: "pc",
      };
    }
    return {
      type: "mobile",
    };
  } else {
    return {
      type: "pc",
    };
  }
}


/**
 * 检测是安卓还是OS
 * @param {*} params 
 */
export function appSource(params) {
  const u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isMobile(u)) {
    if (isiOS) {
      return { type: 'ios' }
    } else {
      return { type: 'andriod' }
    }
  } else { 
    return { type: 'pc' }
  }
}

/**
 * 区分宿主浏览器-微信
 */
export function checkBrowser() {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') != -1) { 
    return true
  } else { 
    return false
  }
}

/**
 * 唤起app
 * @param {*} params 
 */
export function openInApp() {

  const device = appSource()
  
  if (device.type === 'ios') {
    location.href = 'https://enroll.dapengjiaoyu.cn'
  }

  if (device.type === 'andriod') {
    
    if (checkBrowser()) {
      $nuxt.$router.push('/call-app')
      return
    }
    
    const parent = document.getElementsByTagName('body')[0]
    
    if (document.getElementById('openIframe')) {
      parent.removeChild(document.getElementById('openIframe'))
    }

    if (document.getElementById('downiframe')) {
      parent.removeChild(document.getElementById('downiframe'))
    }
    
    let ifr = document.createElement('iframe')
    ifr.id = 'openIframe'
    ifr.src = 'dpedu://com.app.zhijin'
    ifr.style.display = 'none'
    parent.appendChild(ifr)

    // 等待一段时间后，无反应则URL跳转
    let downloadTimeout = setTimeout(function () {
      $nuxt.$store.$axios.get('/app-version').then((res) => { 
        let iframe = document.createElement('iframe')
        iframe.id = 'downiframe'
        iframe.src = JSON.parse(res.data.content).url
        iframe.style.display = 'none'
        parent.appendChild(iframe)
      })
    }, 1500)

    /* 判读是否唤起app成功 浏览器是否进入后台 */
    var visibilityChange = null
    if (typeof document.hidden !== 'undefined') {
      visibilityChange = 'visibilitychange'
    } else if (typeof document.mozHidden !== 'undefined') {
      visibilityChange = 'mozvisibilitychange'
    } else if (typeof document.msHidden !== 'undefined') {
      visibilityChange = 'msvisibilitychange'
    } else if (typeof document.webkitHidden !== 'undefined') {
      visibilityChange = 'webkitvisibilitychange'
    }

    // 添加监听器
    document.addEventListener(visibilityChange, function () {
      clearTimeout(downloadTimeout)
    }, false)
  }
}