//index.js
//获取应用实例



const app = getApp()
Page({
  data: {

  },

  onLoad: function () {
  },
  onShow:function(){
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 //选中效果 当前tabBar页面在list中对应的下标， 
      })
    }
  }
})
