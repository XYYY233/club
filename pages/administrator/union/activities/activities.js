// pages/administrator/club_manage/activity_check/activity_check.js
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
    scrollHeight:'',
    active: 0,
    activities: {
      week: [],
      month: [],
      undetermined: [],
      held: [],
      unapprove: []
    },
    time:'',
    present:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择学年
    bindTimeChange(e) {
      console.log(e.detail.value)
      this.setData({
        time: e.detail.value
      })
      if (this.getPresentYear() == e.detail.value) {
        this.setData({
          present: true
        })
      } else {
        this.setData({
          present: false
        })
      }
      this.getactivites(e.detail.value)
    },
    // 获取活动总览列表
    async getactivites(time) {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });

      try {
        const activies = await fetch({
          url: `${config.baseUrl}${config.getActivitiesUnion}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
          data:{
            year:parseInt(time)
          }
        }).then(res => {
          wx.hideLoading();
          console.log(res)
          this.setData({
            activities: res.data

          })
        }).catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: err.message,
            icon: 'error'
          })
        })

      } catch (err) {
        console.log(err)
      }
      this.setData({
        complete:true
      })
    },
    // 获取当前学年
    getPresentYear(){
      let myDate = new Date();
      let year = myDate.getFullYear();
      let month = myDate.getMonth();
      if(month<=7){
        year -=1;
      }
      return year;
    },
    // 下拉刷新
    onRefresh(e){
      this.getactivites(this.data.time);
      this.setData({
        triggered:false
      })
    },
    onRestore(e){
      
    },
    computeScrollViewHeight() {
      let that = this
      let query = wx.createSelectorQuery().in(this)
      query.select('.picker').boundingClientRect(function(res) {
      //   //得到标题的高度
        let pickerHeight = res.height
        //scroll-view的高度 = 屏幕高度- tab高(50) - 10 - 10 - titleHeight
        //获取屏幕可用高度
        let screenHeight = wx.getSystemInfoSync().windowHeight
        //计算 scroll-view 的高度
        let scrollHeight = screenHeight - 52 - 60 - pickerHeight
        that.setData({
          scrollHeight: scrollHeight
        })
        console.log(scrollHeight)
      }).exec()
      
    },

  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.computeScrollViewHeight();
    this.setData({
      time: this.getPresentYear()
    })
    this.getactivites(this.getPresentYear())
  }
})