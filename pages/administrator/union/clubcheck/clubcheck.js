// pages/administrator/union/clubcheck/clubcheck.js
const config = require('../../../../config')
import {
  fetch
} from '../../../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubInfo: {},
    clubTypeList: {
      politics: '思想政治类',
      technology: '学术科技类',
      business: '创新创业类',
      culture: '文化体育类',
      volunteer: '志愿公益类',
      assistance: '自律互助类',
      other: '其他类'
    },
  },
  
  //获取社团信息
  async getClubInfo() {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const clubinfo = await fetch({
        url: `${config.baseUrl}${config.getClubHomeInfo}/${this.data.clubid}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token')
        },
      })
      let clubType = clubinfo.data.clubType
      this.setData({
        clubInfo: {
          ...clubinfo.data
        },
        'clubInfo.clubType': this.data.clubTypeList[clubType],
      })
      wx.hideLoading();
    } catch (err) {
      console.log(err)
    }
  },
  formSubmit(e) {
    console.log(e.detail.value);
    let that = this;
    let pass = e.detail.value.pass == '1' ? '通过' : '不通过';
    wx.showModal({
      title: '提示',
      content: `您选择了【${pass}】该社团的入驻申请`,
      confirmColor: '#E5C136',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
            mask: true
          });
          fetch({
            url: `${config.baseUrl}${config.checkClub}/${that.data.clubid}`,
            method: "POST",
            header: {
              'Authorization': wx.getStorageSync('token'),
              'content-type':'application/x-www-form-urlencoded'
            },
            data: {
              status:parseInt(e.detail.value.pass)
            }
          }).then(res => {

            console.log(res);
            wx.hideLoading();
            wx.showToast({
              title: res.message,
              icon: 'success',
              duration: 2000,
              success: function () {
                wx.reLaunch({
                  url: 'pages/administrator/union/union/union?active=2',
                });
               
              }
            })

          }).catch(err => {
            console.log(err);
            wx.showModal({
              title: '提示',
              content: err.message,
            })
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })

},
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  console.log(options)
  this.setData({
    ...options
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