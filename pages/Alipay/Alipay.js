var settings = require('../../settings.js');
var app = getApp();
var url = app.globalData.server_domain;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      zhifubao:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo.zhifubao){
      that.setData({
        zhifubao: app.globalData.userInfo.zhifubao
      })
    }
  },
  submit: function (e) {
    let that = this;
    var token = wx.getStorageSync("token");
    let Alipay = e.detail.value.qq;
    wx.request({
      // url: 'http://test.51fanshu.com/xcx/update_userinfo/ ',
      url: url + '/xcx/update_userinfo /',
      data: {
        zhifubao:Alipay
      },
      header: {
        'app-id': app.globalData.app_id,
        'AUTHORIZATION': token
      },
      dataType: JSON,
      method: 'post',
      success: function (res) {
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
          app.globalData.userInfo.zhifubao = Alipay;
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '修改失败',
        })
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