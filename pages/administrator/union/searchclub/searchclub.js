// pages/administrator/union/searchclub/searchclub.js
const config = require('../../../../config')
import {
  fetch
} from '../../../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    type:'',
    TimeId:-1,
    clubs:[
    ],
  },
// 搜索
  handleSearchInput(e) {
    const {value} = e.detail;
    this.setData({value:e.detail.value})
    if(!value.trim()&&value!=""){
      this.setData({
        havesearch:false,
        nodata:false
      })
      return
    }
      // 请求获取数据
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(()=>{
      if(value==""){
        this.setData({
          havesearch:false,
          clubs:[],
          nodata:false
        })
      }else{
        this.searchClubs(value)
      };
    },1000);//1秒后
  },

  async searchClubs(key){
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const clubs = await fetch({
        url: `${config.baseUrl}${config.searchClub}`,
        method: "POST",
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        data: {
          key: key
        }
      })
      console.log(clubs)
      if (clubs.data.length == 0) {
        this.setData({
          nodata: true,
          havesearch:true,
        })
      } else {
        this.setData({
          clubs: clubs.data,
          nodata:false,
          havesearch:true
        })
      }
      wx.hideLoading();
    } catch (error) {
      console.log(error)
      // wx.showToast({
      //   title: '',
      //   icon: 'error'
      // })

    }
  },
  handleSearch(){
    console.log(this.data.value)
    this.setData({
      havesearch:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({type:options.type})
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