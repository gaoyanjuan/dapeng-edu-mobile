// 详情页route-name
const detailsList = [
  'details-dynamic',
  'details-growth',
  'details-homework',
  'details-reading',
  'details-video',
  'details-works'
]

function isDetails (name) {
  const result = detailsList.some((element) => {
    return element === name
  })
  return result
}

function getFunctionName (name) {
  if (name === 'dynamic-hot') {
    return 'dynamic/changeHotDynamicList'
  } else if (name === 'dynamic-new') {
    return 'dynamic/changeNewDynamicList'
  } else if (name === 'attention') {
    return 'attention/changeAttentionList'
  } else if (name === 'growth') {
    return 'growth/changeGrowthList'
  } else if (name === 'homework') {
    return 'homework/changeHomeworkList'
  } else if (name === 'recommend') {
    return 'recommend/changeRecommendList'
  } else if (name === 'work') {
    return 'work/changeWorkList'
  } else if (name === 'small-video') {
    return 'video/changeSmallVideoList'
  }
}

import Vue from 'vue'
Vue.prototype.$isDetails = isDetails
Vue.prototype.$getFunctionName = getFunctionName

export default {
  isDetails,
  getFunctionName
}
