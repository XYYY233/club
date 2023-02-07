// pages/administrator/guide/mine/mine.js
const config = require('../../../../config')
import {
  fetch
} from '../../../../request/request.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    name:"",
    clubs:[
      
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getMine() {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      try {
        const mine = await fetch({
          url: `${config.baseUrl}${config.getGuideMine}/${wx.getStorageSync('roleid')}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
        })
        console.log(mine)
        this.setData({
          ...mine.data
        })
        wx.hideLoading();
      } catch (err) {
        console.log(err)
      }
    },
  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.getMine()
  },
})
