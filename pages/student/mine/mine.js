// pages/student/mine/mine.js
const config = require('../../../config')
import {
  fetch
} from '../../../request/request.js'
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
    // resultlist: [''
    // ],
    // chooseList: [
    // ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setSteps(resultlist) {
      let stepsList = ['一面', '二面', '三面', '四面', '五面', '六面', '七面', '八面', '九面', '十面', '十一面', '十二面', '十三面']
      let results = new Object()
      results = resultlist;
      for (let item of results) {
        let progresses = item.progresses
        let steps = []
        if (item.result == 1) {
          item.icon = '/icons/gou.png'
        } else if (item.result == 2) {
          item.icon = '/icons/cha.png'
        } else {
          item.icon = '/icons/yuan.png'
        }
        for (let i = 0; i < progresses; i++) {
          let obj = new Object();
          obj.text = stepsList[i]
          steps.push(obj)
        }
        item.steps = steps
      }
      return results
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
        this.setData({
          ...res.data
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
    async getResultList() {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      try {
        const res = await fetch({
          url: `${config.baseUrl}${config.getResultList}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token'),
          },
        })
        console.log(res)
        this.setData({
          resultlist: this.setSteps(res.data)
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
    async getChooseList() {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      try {
        const res = await fetch({
          url: `${config.baseUrl}${config.getChooseList}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token'),
          },
        })
        console.log(res)
        this.setData({
          ...res.data
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
    choose(e) {
      let that = this;
      let deptid = e.currentTarget.dataset.deptid
      let index = e.currentTarget.dataset.index
      let tip = e.detail.value == '1' ? '加入' : '不加入'
      wx.showModal({
        title: '提示',
        content: `是否确认【${tip}】该社团`,
        async success(res) {
          if (res.confirm) {
            try {
              const res = await fetch({
                url: `${config.baseUrl}${config.studentChoose}/${deptid}`,
                method: "PUT",
                header: {
                  'Authorization': wx.getStorageSync('token'),
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  status: parseInt(e.detail.value)
                }
              })
              console.log(res)
              wx.showToast({
                title: res.message,
                icon: 'success'
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
          } else if (res.cancel) {
            // 点击取消返回
            let item = `chooseList[${index}].join`
            let join = e.detail.value == '1' ? 2 : 1
            that.setData({
              [item]: join
            })
          }
        }
      })
    },
    onRefresh(e) {
      this.getResultList()
      this.getChooseList()
      this.setData({
        triggered: false
      })
    },
    computeScrollViewHeight() {
      let that = this
      let query = wx.createSelectorQuery().in(this)
      query.select('.title').boundingClientRect(function (res) {
        //   //得到标题的高度
        let titleHeight = res.height
        //scroll-view的高度 = 屏幕高度- tab高(50) - 10 - 10 - titleHeight
        //获取屏幕可用高度
        let screenHeight = wx.getSystemInfoSync().windowHeight
        //计算 scroll-view 的高度
        let scrollHeight = screenHeight - titleHeight - 105
        that.setData({
          scrollHeight: scrollHeight
        })
      }).exec()

    },
  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.computeScrollViewHeight()
    this.getStudentInfo()
    this.getResultList()
    this.getChooseList()
  },

})