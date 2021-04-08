// pages/administrator/club_manage/mamberInfo/mamber_info.js
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
    clubs:{
      politics:[
    ],
    technology:[
      
    ],
    business:[
     
    ],
    culture:[
      
    ],
    volunteer:[
    ],
    assistance:[],
    other:[]
  }
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
      this.getClubs(e.detail.value)
    },
    // 获取社团
    async getClubs(time){
      wx.showLoading({
        title: "加载中",
        mask: true,
      });

      try {
        const clubs = await fetch({
          url: `${config.baseUrl}${config.getClubs}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
          data:{
            year:parseInt(time)
          }
        })
        console.log(clubs.data)
        this.setData({clubs:{...clubs.data},getClubs:true})
        wx.hideLoading();
      } catch (err) {
        console.log(err)
        wx.hideLoading();
      }
    },
    // 计算高度
    computeScrollViewHeight() {
      let that = this
      let query = wx.createSelectorQuery().in(this)
      let searchHeight ;
      query.select('.searchContainer').boundingClientRect(function(res) {
        //   //得到搜索框的高度
          searchHeight = res.height
        }).exec()
      query.select('.picker').boundingClientRect(function(res) {
      //   //得到标题的高度
        let pickerHeight = res.height
        //获取屏幕可用高度
        let screenHeight = wx.getSystemInfoSync().windowHeight
        //计算 scroll-view 的高度
        let scrollHeight = screenHeight- pickerHeight -searchHeight - 140
        that.setData({
          scrollHeight: scrollHeight
        })
        // console.log(scrollHeight)
      }).exec()
      
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
      this.getClubs(this.data.time);
      this.setData({
        triggered:false
      })
    },
    onRestore(e){
      
    },
  },
  attached: function() {
    // 在组件实例进入页面节点树时执行
    this.computeScrollViewHeight()
    this.setData({
      time: this.getPresentYear()
    })
    this.getClubs(this.getPresentYear())
  },
})
