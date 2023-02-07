//index.js
//获取应用实例



const app = getApp()
Page({
  data: {

  },

  onLoad: function () {
    if(wx.getStorageSync('token')){
      console.log("有token")
      let role = wx.getStorageSync('role');
      console.log(role)
      //student,club,union,teacher,guide
      if(role=="student"){
        wx.reLaunch({
          url: `/pages/student/student/student`
        })
      }else{
        wx.reLaunch({
          url: `/pages/administrator/${role}/${role}/${role}`
        })
      }
    }else{
      console.log("无token")
      console.log(wx.getStorageSync('token'))
    }
  },
  onShow:function(){
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 //选中效果 当前tabBar页面在list中对应的下标， 
      })
    }
  }
})
