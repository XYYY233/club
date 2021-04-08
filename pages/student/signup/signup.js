// pages/student/signup/signup.js
const config = require('../../../config')
import {
  fetch
} from '../../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {},
    styleTemplate: {
    },
    politicsArray: [
      '共青团员',
      '中共党员', '群众', '中共预备党员'
    ],
    volitionArray: [
      '第一志愿', '第二志愿'
    ],
    custom: []
  },

  // 判断是否有邮箱
  async getEmail(){
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.getEmail}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token'),
        },
      })
      console.log(res)
      let message = res.message
      if(message.indexOf("暂未设置邮箱")!=-1){
        wx.showModal({
          title: '提示',
          content: '您还未设置账号邮箱，点击前往设置邮箱',
          showCancel:false,
          success (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/emailset/emailset'
              })
            }
          }
        })
      }
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
  //获取学生基本信息
  async getStudentInfo() {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.getBaseInfoStudent}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token'),
        },
      })
      console.log(res)
      let pick = ['campus', 'classes', 'college', 'sex', 'name', 'studentNumber'];
      let info = pick.reduce((info, item) => {
        if (item in res.data) {
          info[item] = res.data[item];
        }
        return info;
      }, {});
      this.setData({
        form: {
          ...info
        }
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

  // 获取报名表样式
  async getStyle() {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.getResumeStyle}/${this.data.departmentID}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token'),
        },
      })
      console.log(res.data)
      this.setData({
        styleTemplate: {
          ...res.data
        }
      })
      this.parsingKey() //自定义字段
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
  // 启用简历模版
  handleChange(e) {
    // 拷贝一份
    if (e.detail.value) {
      // 获取模版
      this.getTemplate()
    } else {
      let emptyTemplate = ['advantage', 'hobby', 'self', 'photo', 'phone', 'wechat', 'politics']
      let form = this.data.form;
      for (let item of emptyTemplate) {
        form[item] = ''
      }
      // 关闭启用模版
      this.setData({
        form: {
          ...form
        }
      })
      // 启用拷贝的
    }
  },
  // 获取简历模板
  async getTemplate() {
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
        form: template.data
      })
      wx.hideLoading();
      console.log(template)
    } catch (err) {
      wx.hideLoading();
      if (err.code == "QP404") {
        let that = this;
        // 未创建模版
        wx.showModal({
          title: '提示',
          content: err.message,
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../myinfo/myinfo'
              })
            }
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: err.message,
        })
      }
      console.log(err)
    }
  },
  bindPickerChange: function (e) {
    let array = this.data[`${e.target.dataset.item}Array`]
    let res = array[e.detail.value]
    let item = `form.${e.currentTarget.dataset.item}`
    this.setData({
      [item]: res
    })
  },
  // 上传照片
  chooseImg: function (e) {
    if (this.data.reviseStatus) {
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
                'form.photo': url,
            })
          },
          fail: function(err) {
            wx.showToast({
              title: '连接超时',
              icon: 'error'
            })
          }
        })

      }
    })

  },
  // 设置默认头像
  getdefaultImg() {
    if (this.data.form.sex == '女') {
      this.setData({
        defaultImg: '/img/girl.jpeg'
      })
    } else {
      this.setData({
        defaultImg: '/img/boy.jpeg'
      })
    }
  },
  // 获取报名表样式时使用
  // 将extra不带value的字段解析并渲染
  parsingKey() {
    let custom = this.data.styleTemplate.custom
    let obj = []
    if (custom == "") {
      obj = []
    } else {
      let keyArray = custom.split('#');

      for (let i = 0; i < keyArray.length; i++) {
        let objtemp = {};
        objtemp.value = "";
        objtemp.key = keyArray[i];
        obj.push(objtemp);
      }
    }
    this.setData({
      custom: obj
    })
  },

  // 提交表单
  formSubmit(e) {
    let form = e.detail.value

    for (let item in form) {
      if (form[item] == '' || form[item] == null) {
        wx.showToast({
          title: '您有未填写项',
          icon: 'error'
        })
        return
      }
    }
    var phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!phone.test(form.phone)) {
      wx.showToast({
        title: '请检查手机号码',
        icon: 'error'
      })
      return
    }
    if (this.data.form.photo == '' || this.data.form.photo == null) {
      wx.showToast({
        title: '未上传照片',
        icon: 'error'
      })
      return
    }
    // 自定义字段设置
    let customize = new Object()
    // 删除form中的自定义项
    let array = this.data.custom
    for (let i = 0; i < array.length; i++) {
      let element = array[i].key;
      customize[element] = form[element]
      delete form[element]
    }
    form.customize = JSON.stringify(customize) //自定义字段

    // 用空字符串补上缺失的字段（因为没有这个样式
    let formItems = ['advantage', 'hobby', 'self', 'reason', 'volition'];
    for (let item of formItems) {
      if (!(item in form)) {
        // console.log(item)
        form[item] = ''
      }
    }
    console.log(form)
    if (this.data.submitted == false) { //没提交过
      this.signUp(form) //报名
    } else {
      this.revise(form)
    }
  },
  // 报名
  async signUp(Info) {
    Info.photo = this.data.form.photo
    Info.departmentID = this.data.departmentID
    Info.clubID = this.data.clubID
    console.log(Info)
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.resumeOperate}`,
        method: "POST",
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        data: {
          ...Info
        }
      })
      wx.hideLoading();
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'success',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 2000);
        }
      })

    } catch (err) {
      console.log(err)
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: err.message,
        showCancel: false,
      })
    }
  },
  // 获取当前学年
  getPresentYear() {
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth();
    if (month <= 7) {
      year -= 1;
    }
    return year;
  },
  // 修改
  async revise(Info) {
    Info.photo = this.data.form.photo
    Info.departmentID = this.data.departmentID
    Info.year = this.getPresentYear()
    console.log(typeof (Info.year))
    console.log(Info)
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.resumeOperate}`,
        method: "PUT",
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        data: {
          ...Info
        }
      })

      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'success',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 2000);
        }
      })
      wx.hideLoading();
    } catch (err) {
      console.log(err)
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: err.message,
        showCancel: false,
      })
    }
  },
  // 获取报名表内容
  async getResume() {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.getResume}/${this.data.departmentID}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token')
        },
      })

      console.log(res)
      this.setData({
        form: {
          ...res.data
        },
        submitted: true
      })
      this.setCustoms(JSON.parse(res.data.customize))
      wx.hideLoading();
    } catch (err) {
      console.log(err)
      if (err.code == "QR404") {
        this.setData({
          submitted: false
        })
      }
      wx.hideLoading();
    }
  },
  // 设置自定义字段报名表内容
  setCustoms(json){
    let customs = [];
    for (let key_ in json) {
      // console.log(obj[key_]) // foo, bar
      let obj = new Object()
      obj.key = key_
      obj.value = json[key_]
      customs.push(obj)
    }
    this.setData({
      custom:customs
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
    this.getEmail()
    this.getStyle()
    this.getStudentInfo();
    this.getdefaultImg();
    this.getResume();
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