// pages/administrator/club/myclub/myclub.js
const config = require('../../../../config')
import {
  fetch
} from '../../../../request/request.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeNames: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */ 
  data: {
    active: 0,
    members: [],
    open:1,
    clubInfo: {
    },
    clubTypeView:'',//显示的社团类型
    clubTypeList:{
      politics:'思想政治类',
      technology:'学术科技类',
      business:'创新创业类',
      culture:'文化体育类',
      volunteer:'志愿公益类',
      assistance:'自律互助类',
      other:'其他类'
    },
    clubTypeArray:['思想政治类', '学术科技类', '创新创业类', '文化体育类', '志愿公益类', '自律互助类', '其他类'],
    clubType: ['politics', 'technology', 'business', 'culture', 'volunteer', 'assistance', 'other'],
    campusArray: ['南校区', '北校区', '南北校区'],
    politicsArray:['群众','团员','预备党员','党员'],
    teacherCollegeArray:['校团委','体育部','广外实验教学中心','教育集团','学生工作部（处）','党委组织部','党委宣传部','后勤处','学生就业指导中心','保卫处','创新创业教育学院','国际合作与交流处','招生委员会办公室','留学生教育学院','校友总会','图书馆','校史档案馆','英语语言文化学院','经济贸易学院','国际商务英语学院','商学院','会计学院','金融学院','西方语言文化学院','日语语言文化学院、亚非语言文化学院（筹）','东方语言文化学院','中国语言文化学院','法学院','国际关系学院','英语教育学院','信息科学与技术学院','社会与公共管理学院','马克思主义学院','高级翻译学院','新闻与传播学院','艺术学院','数学与统计学院'],
    guideArray: [
      '创新创业教育学院', 
    '档案馆、校史馆',
     '党委宣传部', 
     '国际合作与交流处', 
     '保卫处', 
     '法学院', 
     '公管学院', 
     '国关学院', 
     '后勤处计生办', 
     '经贸学院', 
     '金融学院', 
     '会计学院', 
     '留学生教育学院', 
     '日语亚非学院', 
     '学生就业指导中心', 
     '数统学院', 
     '商学院', 
     '广外实验教学中心', 
     '商英学院',
     '图书馆',
     '体育部',
     '校团委',
     '信息学院',
     '广外校友总会',
     '艺术学院',
     '英语语言文化学院',
     '招生办',
     '中文学院',
     '教育集团',
    '宣传部',
    '学生工作处',
    '党委组织部'],
    collegeArray: ['英语语言文化学院', '经济贸易学院', '国际商务英语学院', '商学院', '会计学院', '金融学院', '西方语言文化学院', '日语语言文化学院', '东方语言文化学院', '中国语言文化学院', '法学院', '国际关系学院', '英语教育学院', '信息科学与技术学院', '社会与公共管理学院', '马克思主义学院', '高级翻译学院', '新闻与传播学院', '艺术学院', '数学与统计学院'],
    reviseStatus: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChangeTabs(e) {
      this.setData({
        active: e.detail.index
      });
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
    //获取社团基本信息
    async getClub() {
      try {
        const res = await fetch({
          url: `${config.baseUrl}${config.getClubBaseInfo}/${wx.getStorageSync('roleid')}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
        })
        // console.log(res.data.club)
        this.setData({
          club: res.data.club
        })
        wx.hideLoading();
      } catch (error) {
        console.log(error)
      }
    },
    //会员信息页面
    // 手风琴
    onChange(event) {
      this.setData({
        activeNames: event.detail,
      });
    },
    // 获取当前学年社员信息
    async getMembers() {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      try {
        const members = await fetch({
          url: `${config.baseUrl}${config.getMembers}?club_id=${wx.getStorageSync('roleid')}&year=${this.data.time}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
        })
        if (members.data.length == 0) {
          this.setData({
            nomember: true
          })
        } else {
          this.setData({
            members: members.data,
            nomember: false
          })
        }
        wx.hideLoading();
      } catch (error) {
        console.log(error)
      }

    },
    //搜索
    handleSearchInput(e) {
      const {
        value
      } = e.detail;
      this.setData({
        value: e.detail.value
      })
      if (value!=""&&!value.trim()) {
        return
      }
      // 请求获取数据
      clearTimeout(this.TimeId);
      this.TimeId = setTimeout(() => {
        if(value==""){
          this.getMembers()
        }else{
        this.searchMember(value)
        };
      }, 1000); //1秒后
    },

    async searchMember(key) {
      console.log(key)
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      try {
        const members = await fetch({
          url: `${config.baseUrl}${config.searchMember}`,
          method: "POST",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
          data: {
            clubID: wx.getStorageSync('roleid'),
            key: key
          }
        })
        console.log(members)
        if (members.data.length == 0) {
          this.setData({
            nomember: true
          })
        } else {
          this.setData({
            members: members.data,
            nomember:false
          })
        }
        wx.hideLoading();
      } catch (error) {
        console.log(error)
        wx.showToast({
          title: '',
          icon: 'error'
        })

      }
    },
    handleSearch() {
      this.searchMember(this.data.value)
    },
//社团信息页面
    // 选择图片
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
            url: `${config.baseUrl}${config.uploadLogo}`, 
            filePath: res.tempFilePaths[0],
            header: {
              'Authorization': wx.getStorageSync('token')
            },
            name: 'logo',
            success (res){
              console.log(res)
              let url = JSON.parse( res.data).data.ossFileUrl

              that.setData({
                'clubInfo.logo': url,
              })
            }
          })


        }
      })

    },
    // picker选择
    bindPickerChange: function (e) {
      
      let array = this.data[`${e.target.dataset.item}Array`]
      let res = array[e.detail.value]
      let temp = `clubInfo.${e.target.dataset.content}`
      if(e.target.dataset.item=='clubType'){
        let type = this.data.clubType[e.detail.value] //英文
        this.setData({
          clubTypeView:res,//中文
          [temp]: type,
        })
      }else{
      this.setData({
        [temp]: res,
      })
    }
    },
    // 改变修改状态
    changeStatus() {
      this.setData({
        reviseStatus: !this.data.reviseStatus
      })
    },
    // 添加老师
    addteacher() {
      let teacher = {
        name: '',
        jobNumber: '',
        phone: '',
        college: ''
      }
      let temp = this.data.clubInfo.teachers
      temp.push(teacher)
      this.setData({
        'clubInfo.teachers': temp
      })

    },
    // 删除老师
    deleteTeacher(e) {
      let index = e.target.dataset.index
      let temp = this.data.clubInfo.teachers
      let that = this;
      wx.showModal({
        title: '提示',
        content: '是否确认删除该指导老师信息',
        success(res) {
          if (res.confirm) {
            temp.splice(index, 1);
            that.setData({
              'clubInfo.teachers': temp
            })
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    },
    //取消修改
    cancelRevise() {
      this.setData({
        clubInfo: {...this.data.clubInfokeep},
        clubTypeView:this.data.clubTypeList[this.data.clubInfokeep.clubType]
      })
      this.changeStatus()
    },
    //获取社团信息
    async getMine() {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      try {
        const mine = await fetch({
          url: `${config.baseUrl}${config.getClubHomeInfo}/${wx.getStorageSync('roleid')}`,
          method: "GET",
          header: {
            'Authorization': wx.getStorageSync('token')
          },
        })
        let clubType=mine.data.clubType
        this.setData({
          clubInfo:{...mine.data},
          clubTypeView:this.data.clubTypeList[clubType],
          clubInfokeep:{...mine.data},
        })
        wx.hideLoading();
      } catch (err) {
        console.log(err)
      }
    },
    // 提交表单
    formSubmit(e) {
      let info = e.detail.value;
      // 将修改后的存到clubInfo
      for(let key  in info){
        let temp = `clubInfo.${key}`
        this.setData({
          [temp]:info[key]
        })
      }
      info = this.data.clubInfo
      let full = true;
      // 判断是否有空项
      for(let key in info){
        if(info[key]===""){
          full = false;
        }
      }
      for(let i=0;i<=info.teachers.length;i++){
        for(let key in info.teachers[i]){
          if(key=='email'){
            continue
          }
          if(info.teachers[i][key]===""){
            full = false;
          }
        }
      }
      if(full){
        // 填写完整
        console.log('填写完整')
        console.log(this.data.clubInfo)
        this.reviseClubInfo(this.data.clubInfo)
      }else{
        //不完整
        wx.showToast({
          title: '您有未填写项',
          icon: 'error'
        })
      }
      
    },
    // 修改社团信息
    async reviseClubInfo(Info) {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
      try {
        const res = await fetch({
          url: `${config.baseUrl}${config.reviseClubInfo}/${wx.getStorageSync('roleid')}`,
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
        this.getMine()
        
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
    // 版权信息位置
    computeminHeight() {
      //获取屏幕可用高度
      let screenHeight = wx.getSystemInfoSync().windowHeight
      //计算 scroll-view 的高度
      let minHeight = screenHeight - 60 - 180
      this.setData({
        minHeight: minHeight,
        movableHeight: screenHeight - 160
      })
      console.log(minHeight)
    }
  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.computeminHeight();
    this.setData({
      time: this.getPresentYear()
    })
    this.getClub();
    this.getMembers();
    this.getMine();
  },

})