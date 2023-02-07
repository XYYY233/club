// pages/emailset/emailset.js
const config = require('../../config.js');
import {
  fetch
} from "../../request/request.js";
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordRead: false,
    title: '获取验证码',
    count: 60, // 倒计时的秒数
    countConst:60,
    sendDisabled: false,
    email: '',
    btdisabled: true,
  },
    // 判断输入有无空项
    judgeinput() {
      if (this.data.input.password == true && this.data.input.verifyCode == true && this.data.input.email == true ) {
        this.setData({
          btdisabled: false
        })
      }
    },
  // 获取邮箱
  async getEmail(){
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    try {
      const res =await fetch({
        url: `${config.baseUrl}${config.getEmail}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token')
        },
      })
      console.log(res)
      if(res.data==null){
        this.setData({originEamil:'暂未绑定邮箱'})
      }else{
        this.setData({originEamil:res.data})
      }
      wx.hideLoading();
    } catch (err) {
      wx.showToast({
        title: err.message,
        icon: 'error'
      })
    }
  },
  // 密码显示控制
  passwordRead() {
    this.setData({
      passwordRead: !this.data.passwordRead
    })
  },
  // 输入获取邮箱
  input(e) {
    if(e.target.dataset.type=="email"){

    this.setData({
      email: e.detail.value
    })
  }
    if (e.detail.cursor === 0) {
      this.setData({
        btdisabled: true,
        [`input.${e.target.dataset.type}`]: false
      })
    } else {
      this.setData({
        [`input.${e.target.dataset.type}`]: true
      })
      this.judgeinput();
    }
  },
  // 发送验证码
  send:util.throttle(async function(e)  {
    wx.showLoading({
      title:'加载中' ,
      mask: true,
    });
    let count = this.data.count;
    // 当count不为0开始倒计时，当count为0就关闭倒计时
    let model = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (model.test(this.data.email)) { //验证邮箱
      try {
        const res = await fetch({
          url: `${config.baseUrl}${config.sendEmail}?email=${this.data.email}`,
          method: "POST",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
        })
        console.log(res);
        wx.hideLoading();
        wx.showToast({
          title: res.message,
          icon: 'success'
        })
        
        // 设置定时器
        var countdown = setInterval(() => {
          if (count == 0) {
            this.setData({
              title: '获取验证码',
              count: this.data.countConst,
              sendDisabled: false
            });
            // 取消定时器
            clearInterval(countdown);
          } else {
            this.setData({
              title: "剩余" + count-- + "s",
              sendDisabled: true
            });
          }
        }, 1000);

      } catch (err) {
        console.log(err)
        wx.hideLoading();
        wx.showModal({
          content: err.message,
          showCancel: false
        })
      }


    } else {
      wx.showToast({
        title: '请输入正确邮箱',
        icon: 'error',
      });
    }

  },1000),
  //发送表单
  async formSubmit(e) {
    console.log(e.detail.value)
    let info = {...e.detail.value};
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.reviseEmail}`,
        method: "PUT",
        header: {
          'Authorization': wx.getStorageSync('token'),
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{...info}
      })
      wx.hideLoading();
      wx.showToast({
        title: res.message,
        icon: 'success',
        duration: 2000,
        success:function(){
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 2000) 
        }
      })
    } catch (err) {
      console.log(err)
      wx.hideLoading();
      wx.showModal({
        content: err.message,
        showCancel:false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEmail()
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