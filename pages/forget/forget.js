// pages/forget/forget.js
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
    title:'获取验证码',
    count:60,   // 倒计时的秒数
    countConst:60,
    sendDisabled:false,
    btdisabled: true
  },
  // 判断输入有无空项
  judgeinput() {
    if (this.data.input.verifyCode == true && this.data.input.username == true && this.data.input.passwordconfirm == true && this.data.input.newPass== true) {
      this.setData({
        btdisabled: false
      })
    }
  },
  input(e) {
    if(e.target.dataset.type=="username"){

      this.setData({
        username: e.detail.value
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
      title: "加载中",
      mask: true,
      
    });
    console.log(this.data.username)
    let count = this.data.count;
    // 当count不为0开始倒计时，当count为0就关闭倒计时
      try {
        const res = await fetch({
          url: `${config.baseUrl}${config.forgetEmail}`,
          method: "POST",
          header: {
            'Authorization': wx.getStorageSync('token'),
            'content-type':'application/x-www-form-urlencoded'
          },
          data:{
            username:this.data.username
          }
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

  },1000),
  //发送表单
  async formSubmit(e) {
    console.log(e.detail.value)
    let form = {
      ...e.detail.value
    }
    delete form.passwordconfirm;
    console.log(form)
    console.log
    if (e.detail.value.newPass.length < 6) {
      wx.showModal({
        title: '提示',
        content: '密码不能小于6位',
        showCancel: false
      })
    } else if (e.detail.value.newPass.length > 15) {
      wx.showModal({
        title: '提示',
        content: '密码不能大于15位',
        showCancel: false
      })
    } else if (e.detail.value.newPass == e.detail.value.passwordconfirm) {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      try {
        const res = await fetch({
          url: `${config.baseUrl}${config.forgetPsw}`,
          method: "PUT",
          header: {
            'Authorization': wx.getStorageSync('token'),
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            ...form
          }
        })
        wx.hideLoading();
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              });
            }, 2000) //延迟时间
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
    } else {
      wx.showToast({
        title: '密码输入不一致',
        icon: 'error'
      })
    }

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