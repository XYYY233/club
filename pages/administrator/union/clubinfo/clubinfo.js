// pages/administrator/union/clubinfo/clubinfo.js
const config = require('../../../../config')
import {
  fetch
} from '../../../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',
    clubid:'',
    members:[
      
    ],
  },
  bindTimeChange(e){
    this.setData({
      time:e.detail.value
    })
    this.getMembers(e.detail.value)
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
  // 获取对应学年的社员信息
  async getMembers(year){
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const members = await fetch({
      url:`${config.baseUrl}${config.getMembers}?club_id=${this.data.clubid}&year=${year}`,
      method: "GET",
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      })
      this.setData({
        members:members.data
      })
      wx.hideLoading();
    } catch (error) {
      console.log(error)
    }
    
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      time:this.getPresentYear(),
      clubid:options.clubid
    })
    this.getClubInfo()
    this.getMembers(this.getPresentYear());
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