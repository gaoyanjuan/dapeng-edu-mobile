// 详情页route-name
const detailsList = [
  'index-course-courseId',
  'details-dynamic',
  'details-growth',
  'details-homework',
  'details-reading',
  'details-video',
  'details-works',
  'details-course'
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
  } else if (name === 'label') {
    return 'label/changeLabelList'
  } else if (name === 'article')  {
    return 'reading/changeReadingList'
  }
}

const saveList = [
  'index',
  'index-works',
  'index-dynamic',
  'index-attention',
  'index-homework',
  'index-growth',
  'index-reading',
  'index-small-video',
  'label'
]

function isSave (name) {
  const result = saveList.some((element) => {
    return element === name
  })
  return result
}

function goback () {
  const isLogin = $nuxt.$cookiz.get('isLogin')
  if (isLogin) {
    const isDetails = $nuxt.$isDetails($nuxt.$route.name)
    $nuxt.$cookiz.set('isLogin', false, {
      path: '/'
    })
    if (isDetails) {
      $nuxt.$router.go(-4)
    } else {
      $nuxt.$router.go(-1)
    }
  } else {
    $nuxt.$router.go(-1)
  }
}


import Vue from 'vue'
Vue.prototype.$isDetails = isDetails
Vue.prototype.$getFunctionName = getFunctionName
Vue.prototype.$isSave = isSave
Vue.prototype.$goback = goback

export default {
  isDetails,
  getFunctionName,
  goback,
  isSave
}
