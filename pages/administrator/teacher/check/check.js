// pages/administrator/guide_teacher/check/check.js
const config = require('../../../../config')
import {
  fetch
} from '../../../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '',
    activityID: '',
    steps: [],
    form: {},
    active: 0,
  },

  formSubmit(e) {
    console.log(e.detail.value);
    let that = this;
    let pass = e.detail.value.pass == '1' ? '通过' : '不通过';
    if (e.detail.value['opinion'] == "" || e.detail.value['sign'] == "") {
      // 有空项
      wx.showToast({
        title: '您有未填写项',
        icon: 'error'
      })
    } else {
      wx.showModal({
        title: '确认审核',
        content: `您选择了【${pass}】该项活动`,
        confirmColor: '#E5C136',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
              mask: true
            });
            fetch({
              url: `${config.baseUrl}${config.checkTeacher}`,
              method: "POST",
              header: {
                'Authorization': wx.getStorageSync('token')
              },
              data: {
                activityID: parseInt(that.data.activityID),
                opinion: e.detail.value.opinion,
                pass: parseInt(e.detail.value.pass),
                sign: e.detail.value.sign,
                teacherID:parseInt(wx.getStorageSync('roleid'))
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
                    url: `/pages/administrator/teacher/teacher/teacher`
                  })
                  
                }
              })

            }).catch(err=>{
              wx.hideLoading();
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
    }

  },
  // 解析活动类型和经费类型
  gettype(types, fund) {
    let type = ['', '邀请非社团内部成员参加活动', '邀请境外人员（含国外及港澳台人员）参加活动或开展合作', '以学生社团名义到校外参加活动', '跨校活动', '超过200人参加到大型活动', '面向全校开展的学生社团活动', '接受校内单位邀请协助举办活动', '仅限于社团内部成员的常规活动']
    types = types.split(',');
    let typeres = [];
    types.forEach(element => {
      typeres.push(type[parseInt(element)])
    });

    fund = fund == 1 ? '校团委划拨的活动经费' : '校内单位提供活动经费';
    this.setData({
      'form.type': typeres,
      'form.fundSource': fund
    })
  },
  // 获取活动申请表内容
  async getActivityDetail() {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });

    try {
      const activies = await fetch({
        url: `${config.baseUrl}${config.activityDetails}/${this.data.activityID}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token')
        },
      }).then(res => {


        // 设置步骤条图标
        let stepState = 1;
        if (res.data.steps[0].content == "审核不通过") {
          stepState = 0;
        }

        let step = [];
        res.data.steps.forEach(element => {
          let temp = {};
          temp.text = `${element.role}${element.content}`
          temp.desc = element.time;
          step.push(temp)
        });
        this.setData({
          steps: step,
          form: res.data,
          stepState: stepState
        })
        this.gettype(res.data.type + '', res.data.fundSource)
      }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: err.message,
          icon: 'error',
          stepState: stepState
        })
      })
      wx.hideLoading();
    } catch (err) {
      console.log(err)
    }
  },

  // 预览文件
  async preview() {
    try {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      const fileurl = await fetch({
        url: `${config.baseUrl}${config.activityFile}/${this.data.activityID}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token')
        },
      })
      console.log(fileurl.data)
      if (fileurl.data == null) {
        throw {
          message: "error"
        }
      } else {
        wx.downloadFile({
          url: fileurl.data,
          success: function (res) {
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                wx.hideLoading();
                // console.log('打开文档成功')
              }
            })
          },
          fail:function(err){
            wx.hideLoading();
            wx.showToast({
              title: '网络连接超时',
              icon:'none',
              duration:1500
            })
            console.log(err)             
        }
        })
      }
    } catch (error) {

      wx.showToast({
        title: error.message,
        icon: 'error'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      state: options.state,
      activityID: options.activityID
    })
    this.getActivityDetail()
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