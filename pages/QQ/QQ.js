// pages/QQ/QQ.js
var settings = require('../../settings.js');
var app = getApp();
var url = app.globalData.server_domain;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      qq:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that = this;
    //获取全局信息判断QQ号是否存在
    if (app.globalData.userInfo.qq_number){
        that.setData({
          qq: app.globalData.userInfo.qq_number
        })
    }
  },
  submit:function(e){
    var token = wx.getStorageSync("token");
     let qq = e.detail.value.qq;
     let regx = /^[1-9]\d{4,9}$/;
     if(!regx.test(qq)){
        wx.showModal({
          title: '提示',
          content: '请输入正确的QQ号码',
        })
        return;
     }
     wx.request({
      //  url: 'http://test.51fanshu.com/xcx/update_userinfo/ ',
       url: url + "/xcx/update_userinfo/",
       data: {
         qq_number:qq
       },
       header: {
         'app-id': app.globalData.app_id,
         'AUTHORIZATION': token
       },
       dataType:JSON,
       method: 'post',
       success: function(res) {
         console.log(res);
         wx.showModal({
           title: '提示',
           content: '修改成功！',
           success: function (event) {
             if (event.confirm) {
               wx.navigateBack({
                 delta: 2
               })
             } else if (event.cancel) {
               console.log("取消");
             }
           }
         })
         app.globalData.userInfo.qq_number = qq;
       },
       fail:function(){
         wx.showModal({
           title: '提示',
           content: '修改失败',
         });
       }
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