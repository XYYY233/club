// pages/administrator/union/clubstop/clubstop.js
const config = require('../../../../config')
import {
  fetch
} from '../../../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
 // 获取社团详情信息
 async getClubInfo(){
  wx.showLoading({
    title: "加载中",
    mask: true,
  });
  try {
    const res = await fetch({
    url:`${config.baseUrl}${config.getClubInfo}`,
    method: "GET",
    header: {
      'Authorization': wx.getStorageSync('token'),
      'content-type': 'application/x-www-form-urlencoded'
    },
    data:{
      club_id:this.data.clubid,
      year:this.getPresentYear()
    }
    })
    this.setData({...res.data})
    wx.hideLoading();
  } catch (error) {
    console.log(error)
    wx.hideLoading();
    wx.showToast({
      title: '',
      icon: 'error'
    })
  }
},
// 暂停招新
stopClub(e) {
  let clubid = this.data.clubid
  let that = this;
  wx.showModal({
    title: '暂停招新',
    content: '您将暂停该社团的招新',
    success(res) {
      if (res.confirm) {
        wx.showLoading({
          title: '加载中',
          mask: true
        });
        fetch({
          url: `${config.baseUrl}${config.recruitCLub}/${clubid}`,
          method: "PUT",
          header: {
            'Authorization': wx.getStorageSync('token'),
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            status: 0
          }
        }).then(res => {

          console.log(res);
          wx.showToast({
            title: res.message,
            icon: 'success',
          })
          
          wx.hideLoading();
        })
      } else if (res.cancel) {
        
      }
    }
  })

},
// 注销社团
deprecatedClub(){
  let clubid = this.data.clubid
  wx.showModal({
    title: '提示',
    content: '是否确认注销此社团',
    success (res) {
      if (res.confirm) {
        wx.showLoading({
          title: '加载中',
          mask: true
        });
        fetch({
          url: `${config.baseUrl}${config.deprecatedClub}/${clubid}`,
          method: "PUT",
          header: {
            'Authorization': wx.getStorageSync('token'),
            'content-type':'application/x-www-form-urlencoded'
          },
          data: {
            status:1
          }
        }).then(res => {

          console.log(res);
          wx.showToast({
            title: res.message,
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.navigateBack({
                delta: 1
              });
              
            }
          })
          wx.hideLoading();
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.clubid)
    this.setData({
      clubid:options.clubid
    })
    
    this.getClubInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})