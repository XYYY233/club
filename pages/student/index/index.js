// pages/student/index/index.js
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
    clubs:[
      {
        name:'思想政治类',
        category:'politics',
        color:'#fff5f5',
      },
      {
        name:'学术科技类',
        category:'technology',
        color:'#f2f8ff',
      },
      {
        name:'创新创业类',
        category:'business',
        color:'#fff7da',
      },
      {
        name:'文化体育类',
        category:'culture',
        color:'#f0f7ff',
      },
      {
        name:'志愿公益类',
        category:'volunteer',
        color:'#f0f7ff',
      },
      {
        name:'自律互助类',
        category:'assistance',
        color:'#fffef5',
      },
      {
        name:'其他类',
        category:'other',
        color:'#e3e4ff',
      }
    ]
  },
  
  /**
   * 组件的方法列表
   */

  methods: {
    
  },
  
  lifetimes:{
   
  }
  
})