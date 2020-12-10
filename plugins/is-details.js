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

import Vue from 'vue'
Vue.prototype.$isDetails = isDetails

export default isDetails
