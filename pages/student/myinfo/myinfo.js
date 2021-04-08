// pages/student/myinfo/myinfo.js
const config = require('../../../config')
import {
  fetch
} from '../../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviseStatus:true,
    photo:'',
    student:{
    },
    defaultImg:'',
    politicsArray:[
      '共青团员',
      '中共党员',
      '群众',
      '中共预备党员'
    ]
  },
  // 选择
  bindPickerChange(e){
    this.setData({
      'student.politics':this.data.politicsArray[parseInt(e.detail.value)]
    })
  },
  // 获取简历模板
  async getTemplate(){
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const template = await fetch({
        url: `${config.baseUrl}${config.getTemplate}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token'),
        },
      })
      // 如果已创建
      this.setData({
        student: template.data
      })
      wx.hideLoading();
      console.log(template)
    } catch (err) {
      wx.hideLoading();
      if(err.code=="QP404"){
        let that = this;
        // 未创建模版
        wx.showModal({
          title: '提示',
          content: err.message,
          success (res) {
            if (res.confirm) {
              that.establishTemplate()
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1
              });
            }
          }
        })
      }else{
      wx.showModal({
        title: '提示',
        content: err.message,
      })
    }
      console.log(err)
    }
  },
  // 创建模版
  async establishTemplate() {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.templateOperate}`,
        method: "POST",
        header: {
          'Authorization': wx.getStorageSync('token'),
        },
      }).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: res.message,
          icon: 'success'
        })
        this.getTemplate()
      }).catch(err => {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: err.message,
        })
      })

    } catch (err) {
      console.log(err)
    }
  },
  // 改变修改状态
  changeStatus() {
    this.setData({
      reviseStatus: !this.data.reviseStatus
    })
  },
  // 设置默认头像
  getdefaultImg(){
    if(this.data.student.sex=='女'){
      this.setData({
        defaultImg:'/img/girl.jpeg'
      })
    }else{
      this.setData({
        defaultImg:'/img/boy.jpeg'
      })
    }
  },
  // 上传照片
  chooseImg: function (e) {
    if(this.data.reviseStatus){
      return
    }
    let that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.uploadFile({
          url: `${config.baseUrl}${config.uploadPhoto}`, 
          filePath: res.tempFilePaths[0],
          header: {
            'Authorization': wx.getStorageSync('token')
          },
          name: 'profile',
          success (res){
            console.log(res)
              let url = JSON.parse( res.data).data.ossFileUrl

              that.setData({
                'student.photo': url,
              })
          }
        })

      }
    })

  },
  async formSubmit(e){
    console.log(e.detail.value)
    let items = ['','wechat','phone','politics'];//必填字段
    
    for(let key  in e.detail.value){
      if(items.includes(key)&&e.detail.value[key]==""){
        wx.showToast({
          title: '您有未填写项',
          icon: 'error'
        })
        return
      }
    }
    if(this.data.student.photo==""){
      wx.showToast({
        title: '您未上传照片',
        icon: 'error'
      })
      return 
    }
    var phone=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!phone.test(e.detail.value.phone)) {
      wx.showToast({
        title: '请检查手机号码',
        icon: 'error'
      })
      return
    }
    this.reviseClubInfo(e.detail.value)
  },
  // 修改简历模版
  async reviseClubInfo(Info) {
    Info.studentID = `${wx.getStorageSync('roleid')}`;
    Info.photo = this.data.student.photo
    wx.showLoading({
      title: "加载中",
      mask: true,
    }); 
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.templateOperate}`,
        method: "PUT",
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        data:{...Info}
      })
      wx.hideLoading();
      wx.showToast({
        title: res.message,
        icon: 'success',
      })
      this.changeStatus()
      this.getTemplate()
      
    } catch (err) {
      console.log(err)
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: err.message,
        showCancel:false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTemplate()
    this.getdefaultImg();
    
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