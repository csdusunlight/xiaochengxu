//导入extend方法
var util = require('./utils/util.js');

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.request({
          url: 'http://test.51fanshu.com/xcx/login/',
          data:{
            code: res.code
          },
          header: {
            'app-id': this.globalData.app_id
          },
          success: res => {
            console.log(res);
            if (res.data.code == 0){
              wx.setStorage({
                key: "token",
                data: res.data.token
              })
              // console.log("---this.globalData---",this.globalData.userInfo)
              util.extend(this.globalData.userInfo, res.data)
              // console.log("---this.globalData2---", this.globalData.userInfo)
            }
            else{
              wx.showToast({
                title: res.data.msg,
              })
            }
          }
        })
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              util.extend(this.globalData.userInfo, res.userInfo);
              // console.log("---this.globalData3---", this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        // }
      // }
  //   })
  },
  globalData: {
    // userInfo:"",
    userInfo: {},
    app_id: 'wx5df1719e40e064f7'
  }
})
