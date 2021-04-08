// pages/administrator/club/activities/activities.js
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
    triggered:false,
    active: 0,
    activities: {
      undetermined: [],
      approve: [],
      unapprove: []
    },
     complete:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getactivites() {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      try {
        const activies = await fetch({
          url: `${config.baseUrl}${config.getActivitiesClub}/${wx.getStorageSync('roleid')}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
        }).then(res => {
          wx.hideLoading();
          console.log(res)
          this.setData({
            activities: res.data,
          })
        }).catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: err.message,
            icon: 'error'
          })
        })

      } catch (err) {
        console.log(err),
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content:err.message,
          showCancel:false,
        })
      }
      this.setData({
        complete:true
      })
    },
    onRefresh(e){
      this.setData({
        triggered:false
      })
    },
    onRestore(e){
      this.getactivites();
    },
    computeScrollViewHeight() {
        //scroll-view的高度 = 屏幕高度- tab高(50) - 10 - 10 - titleHeight
        //获取屏幕可用高度
        let screenHeight = wx.getSystemInfoSync().windowHeight
        //计算 scroll-view 的高度
        let scrollHeight = screenHeight - 50 - 60
        this.setData({
          scrollHeight: scrollHeight
        })
        console.log(scrollHeight)
      
    },


  },

  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.computeScrollViewHeight();
    this.getactivites();
  },
})