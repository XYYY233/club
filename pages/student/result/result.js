// pages/student/result/result.js
const config = require('../../../config')
import {
  fetch
} from '../../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: '',
    club: '',
    department: '',
    current: 1, //当前面试结果的面数
    content: '', //统一公告
    personal: '' //个性化公告
  },
  async getResult(resumeid) {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.getResult}/${resumeid}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token'),
        },
      })
      console.log(res)
      this.setData({
        ...res.data
      })
      wx.hideLoading();
    } catch (err) {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: err.message,
      })
      console.log(err)
    }
  },
  setRoundTitle(round){
    let stepsList = ['一面', '二面', '三面', '四面', '五面', '六面', '七面', '八面', '九面', '十面', '十一面', '十二面', '十三面']
    this.setData({round:stepsList[parseInt(round)]})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      ...options
    })
    this.setRoundTitle(options.round)
    this.getResult(options.resumeid);
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