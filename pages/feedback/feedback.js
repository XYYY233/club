// pages/feedback/feedback.js
const config = require('../../config.js');
import {
  fetch
} from "../../request/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList:[
    ],
    systemInfo:{
    },
    getsystem:false
  },
  getSystemInfo(){
    let that = this
    wx.getSystemInfo({
      success (res) {
        that.setData({
          systemInfo:{...res},getsystem:true
        })
      }
    })
  },
  afterRead(event) {
    let that = this;
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      // url: `${config.baseUrl}${config.uploadFile}/image`, // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success(res) {
        console.log(res);
        // 上传完成需要更新 fileList
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: res.data });
        that.setData({ fileList });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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