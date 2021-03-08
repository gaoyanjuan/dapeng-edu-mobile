import emotionslist from '@/assets/emotion'
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import xss from 'xss'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// 正则获取表情文字并替换为表情icon
const formatEmotions = function (_html) {
  let xssContent = ''
  if (_html) {
    xssContent = xss(_html)
  } else {
    return xssContent
  }
  if (xssContent) {
    let replaceHtml = xssContent.replace(/\[(.+?)\]/g, function (
      title,
      titleStr
    ) {
      if (emotionslist[titleStr]) {
        return (
          '<img src="' + emotionslist[titleStr] +'"  ' +'alt="' +titleStr +'" class="emotion">'
        )
      } else {
        return title
      }
    })
    replaceHtml = replaceHtml.includes('emotion')
      ? replaceHtml
      : replaceHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return replaceHtml
  }
}

/**
 * 格式化时间的过滤器
 *
 * @param {Date} date 时间对象
 */
const formatDate = function (date) {
  // 1. 如果日期不存在，返回 ---
  // 2. 如果日期是字符串格式的，先转为日期对象
  // 3. 格式化日期

  if (!date) {
    return '---'
  }
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss') // 使用 dayjs 格式化时间
}

// 活动时间过滤
const activitiesDate = function (date) {
  if (!date) {
    return '---'
  }
  return dayjs(date).format('YYYY/MM/DD') // 使用 dayjs 格式化时间
}

// 我的荣誉时间过滤
const honorDate = function (date) {
  if (!date) {
    return '---'
  }
  return dayjs(date).format('YYYY年MM月DD日') // 使用 dayjs 格式化时间
}


/** 
 * 通用时间过滤
 * 60000 一分钟
 * 3600000 一小时
 * 43200000 半天
 * 86400000 一天
 * 172800000 两天
 * 259200000 三天
 */
const commonDate = function (data) {
  if (!data) {
    return '---'
  }
  const now = new dayjs()
  const date = new dayjs(data)
  const nowTimestamp = new dayjs().valueOf()
  const delta = nowTimestamp - data
  if (delta < (60000)) {
    return '刚刚'
  } else if (delta < 3600000) {
    return dayjs(delta).format('m分钟前')
  } else if (delta < 43200000) {
    const hour = Math.floor(delta / 3600000)
    return `${hour}小时前`
  } else if (now.year() === date.year()) {
    return dayjs(data).format('MM月DD日 HH:mm')
  } else if (now.year() > date.year()) {
    return dayjs(data).format('YYYY年MM月DD日 HH:mm')
  }
}
const taskDate = function (data) {
  if (!data) {
    return '---'
  }
  const now = new dayjs()
  const date = new dayjs(data)
  const nowTimestamp = new dayjs().valueOf()
  const delta = nowTimestamp - data
  if (delta < (60000)) {
    return '刚刚'
  } else if (delta < 3600000) {
    return dayjs(delta).format('m分钟前')
  }else if (delta < 86400000) {
    const hour = Math.floor(delta / 3600000)
    return `${hour}小时前`
  } else if (delta < 259200000) {
    return dayjs(data).format('D天前')
  }else if (now.year() === date.year()) {
    return dayjs(data).format('M-D')
  } else if (now.year() > date.year()) {
    return dayjs(data).format('YYYY-M-D')
  }
}
const dateCount = function (start, end) {
  // 现在时间
  var now = new Date(end);
  //截止时间
  var until= new Date(start);
  // 计算时会发生隐式转换，调用valueOf()方法，转化成时间戳的形式
  var days = (until - now) / 1000 / 3600 / 24; 
  // 下面都是简单的数学计算 
  var day = Math.floor(days);
  var hours = (days - day)*24;
  var hour = Math.floor(hours);
  var back = '剩余' + day + '天' + hour + '小时';
  return back;
}
// 数字转换为万单位
const formatNumber = function (num) {
  num = Number(num);
  if (num == 0) {
    return num + '';
  } else if (num > 1 && num < 10000) {
    return num + '';
  } else {
    return (num / 10000).toFixed(1) + '万';
  }
}
//作业要求时间戳
const requireData = function (data) {
  return dayjs(data).format('YYYY年MM月DD日 HH:mm')
}

//作业要求时间戳移动端
const requireDataH5 = function (data) {
  if (!data) {
    return '-----'
  }
  return dayjs(data).format('YYYY-MM-DD HH:mm')
}

//选课列表时间戳移动端
const formatHomeworkDate = function (data) {
  if (!data) {
    return '-----'
  }
  return dayjs(data).format('YYYY.MM.DD HH:mm')
}

const lecturerCommentDate = function (data) {
  const now = new dayjs()
  const date = new dayjs(data)
  const nowTimestamp = new dayjs().valueOf()
  const delta = nowTimestamp - data
  if (delta < (60000)) {
    return '刚刚'
  } else if (delta < 3600000) {
    return dayjs(delta).format('mm分钟前').replace(/0/, '')
  } else if (delta < 86400000) {
    const hour = Math.floor(delta / 3600000)
    return `${hour}小时前`
  } else if (delta < 172800000) {
    return dayjs(data).format('昨天 HH:mm')
  } else if (delta < 259200000) {
    return dayjs(data).format('前天 HH:mm')
  } else if (now.year() === date.year()) {
    return dayjs(data).format('MM月DD日 HH:mm')
  } else if (now.year() > date.year()) {
    return dayjs(data).format('YYYY年MM月DD日')
  }
}

// 在学习的学生数量，超过一万过滤，显示w
const studentsCount = function (value) {
  let num
  if (value > 9999) {
    // 大于9999显示x.xx万
    num = (Math.floor(value / 1000) / 10).toFixed(1) + 'w'
  } else {
    num = value
  }
  return num
}

// 通用数量过滤
const commonCount = function (value) {
  let num
  if (value > 9999) {
    // 大于9999显示x.xx万
    num = (Math.floor(value / 1000) / 10).toFixed(1) + 'w'
  } else {
    num = value
  }
  return num
}

/**
 * 手机号掩码
 * @param {*} mobile
 */
const maskMobile = function (mobile) {
  if (mobile.length > 5) {
    return mobile.substr(0, 3) + '******' + mobile.substr(9, 11)
  } else {
    return mobile
  }
}
const studyProcess = function (val) {
  let str = Number(val * 100).toFixed(2)
  str += '%'
  return str
}

// 学院为空的情况下过滤
const filterCollageName = function (college) {
  if (!college) {
    return ''
  }
  return college.name.replace(/学院/, '')
}

export function formatSlashDate(date) {
  if (!date) {
    return '---'
  }
  return dayjs(date).format('YYYY-MM-DD') // 使用 dayjs 格式化时间
}

const formatLiveTime = function (startTime, finishTime) {
  const start = Number(startTime)
  const finish = Number(finishTime)
  
  const startDate = dayjs(start).format('MM-DD')
  const sTime = dayjs(start).format('HH:mm')
  const fTime = dayjs(finish).format('HH:mm')
  return `${startDate} ${sTime} ~ ${fTime}` // 使用 dayjs 格式化时间
}

const formatChapterTime = function (startTime, finishTime) {
  const start = Number(startTime)
  const finish = Number(finishTime)
  
  const sTime = dayjs(start).format('HH:mm')
  const fTime = dayjs(finish).format('HH:mm')
  return `${sTime} - ${fTime}` // 使用 dayjs 格式化时间
}

const formatLiveDate = function (dateTime) {
  const date = dayjs(dateTime).format('MM月DD日')
  let day = ''
  switch (dayjs(dateTime).day()) {
    case 0:
      day = '星期天'
      break;
    case 1:
      day = '星期一'
      break;
    case 2:
      day = '星期二'
      break;
    case 3:
      day = '星期三'
      break;
    case 4:
      day = '星期四'
      break;
    case 5:
      day = '星期五'
      break;
    case 6:
      day = '星期六'
      break;
    default:
      break;
  }
  return `${date} ${day}` // 使用 dayjs 格式化时间
}

const filter = {
  formatDate,
  activitiesDate,
  commonDate,
  taskDate,
  dateCount,
  formatNumber,
  lecturerCommentDate,
  studentsCount,
  commonCount,
  maskMobile,
  studyProcess,
  requireData,
  requireDataH5,
  formatEmotions,
  filterCollageName,
  formatSlashDate,
  formatHomeworkDate,
  formatLiveTime,
  formatLiveDate,
  formatChapterTime,
  honorDate
}
Object.keys(filter).forEach((key) => {
  Vue.filter(key, filter[key])
})
export default filter
