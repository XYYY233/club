// pages/adminLogin/adminLogin.js
const config = require('../../config.js');
import {
  fetch
} from "../../request/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordRead: false,
    role: ['社团负责人', '社团管理者', '指导老师', '指导单位'],
    typeindex: '',
    havechoose: false,
    btdisabled: true,
    user:{},
    userinput: {}
  },


  bindPickerChange: function (e) {

    this.setData({
      typeindex: e.detail.value,
      havechoose: true,
    })
    this.judgeinput();
  },

  // 判断输入有无空项
  judgeinput() {
    if (this.data.userinput.password == true && this.data.userinput.username == true && this.data.havechoose == true) {
      this.setData({
        btdisabled: false
      })
    }
  },

  // 输入
  input(e) {
    if (e.detail.cursor === 0) {
      this.setData({
        btdisabled: true,
        [`userinput.${e.target.dataset.type}`]: false
      })
    } else {
      this.setData({
        [`userinput.${e.target.dataset.type}`]: true
      })
      this.judgeinput();
    }

  },
  //删除
  delete(e) {
    this.setData({
      'user.username': '',
      'userinput.username': false,
      btdisabled: true
    })
  },
// 密码显示控制
passwordRead() {
  this.setData({
    passwordRead: !this.data.passwordRead
  })
},
  // 登录
  async formSubmit(e) {
    let role = ["club", "union", "teacher", "guide"]
    let user = e.detail.value;
    user.role = role[parseInt(e.detail.value.role)];
    user.terminal = 'weixin'
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const Loginres = await fetch({
          url: `${config.baseUrl}${config.loginUrl}`,
          method: "POST",
          data: user
        }).then(res => {
          console.log(res);
          wx.hideLoading();
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('roleid',res.data.roleID);
          wx.setStorageSync('role',user.role);
          wx.reLaunch({
            url: `/pages/administrator/${user.role}/${user.role}/${user.role}`
          })
        }).catch(err => {
          console.log(err)
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: err.message,
            showCancel:false,
          })
        })

    } catch (err) {
    }
  },

  toforget(){
    wx.navigateTo({
      url: '../forget/forget'
    })
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