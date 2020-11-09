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