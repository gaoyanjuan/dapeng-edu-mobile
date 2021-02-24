export default {
  state: () => {
    return {
      tagsList: [
        {
          "name": "设计类",
          "id": 1,
        },
        {
          "name": "LOGO设计",
          "id": 2
        }, {
          "name": "名片设计",
          "id": 1
        }, {
          "name": "VI设计",
          "id": 4
        }, {
          "name": "包装设计",
          "id": 5
        }, {
          "name": "卡通吉祥物",
          "id": 7
        }, {
          "name": "海报设计",
          "id": 17
        }, {
          "name": "Banner设计",
          "id": 20
        }, {
          "name": "封面设计",
          "id": 24
        }, {
          "name": "宣传册页",
          "id": 55
        }, {
          "name": "签名设计",
          "id": 67
        }, {
          "name": "图案/界面设计",
          "id": 68
        }, {
          "name": "招牌/门头设计",
          "id": 113
        }, {
          "name": "照片/PS处理",
          "id": 114
        }, {
          "name": "字体设计",
          "id": 115
        }, {
          "name": "漫画设计",
          "id": 116
        }, {
          "name": "贺卡设计",
          "id": 118
        }, {
          "name": "标签设计",
          "id": 392
        }, {
          "name": "表情包设计",
          "id": 162
        }, {
          "name": "其它设计",
          "id": 119
        }, {
          "name": "IT/软件",
          "id": 38,
        }
      ],
      sortList: [
        {
          "name": "微信开发",
          "id": 433
        }, {
          "name": "小程序开发",
          "id": 434
        }, {
          "name": "嵌入式开发",
          "id": 436
        }, {
          "name": "UI设计",
          "id": 439
        }, {
          "name": "网络开发",
          "id": 449
        }
      ]
    }
  },
  getters: {
    getTagsList: (state) => {
      return state.tagsList
    },
    getSortList: (state) => {
      return state.sortList
    }
  }
}
