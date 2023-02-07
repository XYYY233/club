// pages/administrator/club_manage/club_check/club_check.js
const config = require('../../../../config')
import {
  fetch
} from '../../../../request/request.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    recruitClubs: false,
    openModifyDate:'',//开放社团修改信息时间
    stopclubs: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 审核社团
    async getClubCheckList() {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      try {
        const clublist = await fetch({
          url: `${config.baseUrl}${config.getClubCheckList}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
        })
        this.setData({
          ...clublist.data
        })
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
    onRefresh(e) {
      this.getClubCheckList();
      this.setData({
        triggered: false
      })
    },
    computeScrollViewHeight() {
      let that = this
      let query = wx.createSelectorQuery().in(this)
      query.select('.clubnameContainer').boundingClientRect(function (res) {
        //得到标题的高度
        let titleHeight = res.height
        //获取屏幕可用高度
        let screenHeight = wx.getSystemInfoSync().windowHeight
        //计算 scroll-view 的高度
        let scrollHeight = screenHeight - 60 - titleHeight - 90
        that.setData({
          scrollHeight: scrollHeight
        })
      }).exec()

    },
    // 管制社团
    // 获取暂停招新的社团
    async getStopClubs() {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      try {
        const clubs = await fetch({
          url: `${config.baseUrl}${config.getStopClubs}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
        })
        console.log(clubs)
        this.setData({
          stopclubs: clubs.data
        })
        wx.hideLoading();
      } catch (error) {
        console.log(error)
        wx.hideLoading();
        wx.showToast({
          title: error.message,
          icon: 'error'
        })
      }
    },
    // 开启某社团招新
    openclub(e) {
      console.log(e.currentTarget.dataset.clubid)
      let clubid = e.currentTarget.dataset.clubid
      let index = parseInt(e.currentTarget.dataset.index)
      let that = this;
      wx.showModal({
        title: '开启招新',
        content: '您将重新开启该社团的招新',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
              mask: true
            });
            fetch({
              url: `${config.baseUrl}${config.recruitCLub}/${clubid}`,
              method: "PUT",
              header: {
                'Authorization': wx.getStorageSync('token'),
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                status: 1
              }
            }).then(res => {

              console.log(res);
              wx.showToast({
                title: res.message,
                icon: 'success',
              })
              that.getStopClubs();
              wx.hideLoading();
            })
          } else if (res.cancel) {
            let temp = `stopclubs[${index}].checked`
            that.setData({
              [temp]: false
            })
          }
        }
      })

    },
    // 定期开放
    // 获取开放修改日期和是否开放招新
    async getOpenDate(){
      wx.showLoading({
        title: '加载中',
        mask: true,
      });
      try {
        const date = await fetch({
          url: `${config.baseUrl}${config.getOpenDate}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
        })
        console.log(date)
        this.setData({...date.data})
        wx.hideLoading();
      } catch (error) {
        console.log(error)
        wx.hideLoading();
        wx.showToast({
          title: error.message,
          icon: 'error'
        })
      }
    },
    // 开放社团招新
    recruitClubs(e) {
      console.log(e)
      let value = e.detail.value
      let that = this
      wx.showModal({
        title: '提示',
        content: `您将${value==true?'开放':'暂停'}社团招新`,
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
              mask: true
            });
            fetch({
              url: `${config.baseUrl}${config.recruitClubs}`,
              method: "PUT",
              header: {
                'Authorization': wx.getStorageSync('token'),
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                status: value==true?1:0
              }
            }).then(res => {
              console.log(res);
              wx.showToast({
                title: res.message,
                icon: 'success',
                
              })
              wx.hideLoading();
            }).catch(err=>{
              wx.showModal({
                title: '',
                content: err.message,
              })
              wx.hideLoading();
              that.setData({
                recruit: !value
              })
            })
          } else if (res.cancel) {
            console.log(!value)
            that.setData({
              recruit: !value
            })
          }
        }
      })

    },
    // 日历
    onDisplay() {
      this.setData({
        showcalendar: true
      });
    },
    onClose() {
      this.setData({
        showcalendar: false
      });
    },
    formatDate(date) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    },
    // 选择的反选日期日历
    onDisplayChoose() {
      this.setData({
        showcalendarChoose : true
      });
    },
    onCloseChoose() {
      this.setData({
        showcalendarChoose : false
      });
    },

    //开放反选日期
    onConfirmChoose(event) {

      let that = this;
      let [start, end] = event.detail;
      start = this.formatDate(start)
      end = this.formatDate(end)
      wx.showModal({
        title: '提示',
        content: `是否确认会员反选开放日期为【${start}至${end}】？`,
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
              mask: true
            });
            fetch({
              url: `${config.baseUrl}${config.openChoose}`,
              method: "PUT",
              header: {
                'Authorization': wx.getStorageSync('token'),
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                end: end,
                start: start
              }
            }).then(res => {
              wx.showToast({
                title: res.message,
                icon: 'success',
              })
              that.getOpenDate();
              that.onCloseChoose();
              wx.hideLoading();
            }).catch(err=>{
              wx.showModal({
                title: '提示',
                content: err.message,
              })
            })
          }
        }
      })
    },
    // 开放社团修改信息日期
    onConfirm(event) {
      let that = this;
      let [start, end] = event.detail;
      start = this.formatDate(start)
      end = this.formatDate(end)
      wx.showModal({
        title: '提示',
        content: `是否确认修改开放日期为【${start}至${end}】？确认后将发送邮件至社团邮箱`,
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
              mask: true
            });
            fetch({
              url: `${config.baseUrl}${config.openModify}`,
              method: "PUT",
              header: {
                'Authorization': wx.getStorageSync('token'),
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                end: end,
                start: start
              }
            }).then(res => {
              wx.showToast({
                title: res.message,
                icon: 'success',
              })
              that.getOpenDate()
              that.onClose();
              wx.hideLoading();
            }).catch(err=>{
              wx.showModal({
                title: '提示',
                content: err.message,
              })
            })
          }
        }
      })
    },
  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.computeScrollViewHeight()
    this.getClubCheckList()
    this.getStopClubs()
    this.getOpenDate()
  }
})