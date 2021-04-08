// import Toast from '../miniprogram_npm/@vant/weapp/toast/toast'
function fetch(options){
    // if(options.load === 1){
    //   wx.showLoading({
    //     title: '加载中',
    //   })
    // }
    return new Promise((resolve,reject)=>{
      if(Object.prototype.toString.call(options.data) === '[object string]'){
        let obj = JSON.parse(options.data)
        options.data = JSON.stringify(obj)
      }
      wx.request({
      //   url: `${baseUrl}${options.url}`,
        url:options.url,
        method:options.method,
        header:options.header||{},
        data:options.data,
        success:function(res){
          // console.log(res);
          options.load === 1 ? wx.hideLoading() : ''
          if(res.data.code == '00000'){
            resolve(res.data)
          }else if(res.data.code == 'A0311'){
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: res.data.message,
              showCancel:false,
              success (res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '/pages/index/index',
                    
                  });
                }
              }
            })
          }
          else{
            // wx.showToast({
            //   title: res.data.msg,
            //   icon: 'none'
            // })
            reject(res.data)
          }
        },
        fail:function(res){
          console.log(res)
          reject(res.data)
          // options.load == 1 ? wx.hideLoading() : ''
          wx.showToast({
            title: '网络连接超时',
            icon:'none',
            duration:1500
          })
        }
      })
    })
  }
  
  module.exports = {
    fetch
  }