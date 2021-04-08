// pages/student/clublist/clublist.js
const config = require('../../../config')
import {
  fetch
} from '../../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubs:[]
  },
  async getclubs(category) {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const activies = await fetch({
        url: `${config.baseUrl}${config.getClubsStudent}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token'),
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{category:category}
      }).then(res => {
        wx.hideLoading();
        console.log(res)
        this.setData({
          clubs: res.data

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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({ title: options.club }) 
      this.getclubs(options.category)
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