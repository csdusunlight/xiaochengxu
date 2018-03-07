// pages/user/user.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: ""
  },
  tapOlder: function (e) {
    wx.showToast({
      title: '跳转到交单信息',
    })
  },
  tapMsg: function (e) {
    wx.navigateTo({
      url: '../msgCenter/msgCenter',
    })
  },
  service: function (e) {
    console.log("跳转到联系客服");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("加载ing");
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log('————数据' + res);
        // var userStr = JSON.stringify(res);
        // console.log("---"+userStr);
        var userInfo = res.userInfo //用户基本信息
        var nickName = userInfo.nickName //用户名
        var avatarUrl = userInfo.avatarUrl //头像链接
        that.setData({
          nickName: nickName,
          avatarUrl: avatarUrl
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