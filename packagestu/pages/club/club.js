// pages/student/club/club.js
const config = require('../../../config')
import {
  fetch
} from '../../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiperImg: [
    // ],
    // qrCode: [
    // ],
    // qrCodes: [ //渲染
    // ],
    // name: "",
    // intro: '',
    // // logo: '',
    // department: [
      
    // ],
    // open: 0

  },
  // 获取社团信息
  async getClubInfo(clubid) {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.getClubInfoStudent}/${clubid}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token'),
        },
      })
      let qrCode = this.setImags(res.data.qrCode);
      this.setData({...res.data,
        qrCodes:this.setQrCode(qrCode),
        swiperImg:this.setImags(res.data.swiperImg)
      })
      this.setDepartmentArray()
      wx.hideLoading();
      console.log(res)
    } catch (err) {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: err.message,
      })
      console.log(err)
    }
  },
  // 获取部门列表，判断有无部门
  async getDepartments(clubid) {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      const res = await fetch({
        url: `${config.baseUrl}${config.getDepartments}/${clubid}`,
        method: "GET",
        header: {
          'Authorization': wx.getStorageSync('token'),
        },
      })
      wx.hideLoading();
      console.log(res)
    } catch (err) {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: err.message,
      })
      console.log(err)
    }
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接   
      urls: this.setImags( this.data.qrCode) // 需要预览的图片http链接列表   
    })

  },
  // 设置picker部门
  setDepartmentArray(){
    console.log(this.data.department)
    let departmentArray = this.data.department.map((item, index) => {
      return `${item.name} ${item.time}`
    }).join(',').split(',');
    this.setData({
      departmentArray: departmentArray
    })
  },
  // 无部门跳转
  navigateToSignup(){
    let clubid = this.data.clubid
    let club = this.data.name
    let departmentName = ''
    let departmentID = this.data.department[0].departmentID
    console.log(this.data.department)
    if(this.data.department[0].open==0){
      wx.showModal({
        title: '提示',
        content: '该社团暂未开放报名',
      })
    }else{
    wx.navigateTo({
      url: `/pages/student/signup/signup?clubID=${clubid}&club=${club}&department=${departmentName}&departmentID=${departmentID}`
    })
    }
  },
  // 选择部门
  showDepartment(e) {
    let index = e.detail.value
    let clubid = this.data.clubid
    let club = this.data.name
    let department = this.data.department
    let departmentID = department[index].departmentID
    let departmentName = department[index].name
    if(department[index].open==0){
      wx.showModal({
        title: '提示',
        content: '该部门暂未开放报名',
      })
    }else{
    wx.navigateTo({
      url: `/pages/student/signup/signup?clubID=${clubid}&club=${club}&department=${departmentName}&departmentID=${departmentID}`
    })
  }
  },
  // 将返回的图片中的url提取成数组
  setImags(array){
    let res = [];
    array.forEach(element => {
      for (let key in element) {
      if(key=='url'){
        res.push(element[key])
      }
    }
    });
    return res;
  },

  // 二维码分组
  setQrCode(array) {
    const length = array.length;
    let index = 0 //用来表示切割元素的范围start
    let resIndex = 0 //用来递增表示输出数组的下标

    //根据length和size算出输出数组的长度，并且创建它。
    let result = new Array(Math.ceil(length / 3))
    //进行循环
    while (index < length) {
      //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
      result[resIndex++] = array.slice(index, (index += 3))
    }
    //输出新数组
    return result
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    console.log(options)
    this.getDepartments(options.clubid)
    this.getClubInfo(options.clubid)
    this.setData({
      ...options
    })
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