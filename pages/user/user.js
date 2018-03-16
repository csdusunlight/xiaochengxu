// pages/user/user.js
var app = getApp();//获取全局变量
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",
    show: false
  },
  tapOlder: function (e) {
    wx.navigateTo({
      url: '../orderRecord/orderRecord',
    })
  },
  tapMsg: function (e) {
    wx.navigateTo({
      url: '../msgCenter/msgCenter',
    })
  },
  bindUser: function () {
    wx.navigateTo({
      url: '../accountBind/accountBind',
    })
  },
  notice: function () {
    wx.navigateTo({
      url: '../msgDetails/msgDetails',
    })
    console.log("通知公告")
  },
  //点击登录
  login: function (e) {
	  console.log(123)
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        // console.log('————数据' , res);
        var userInfo = res.userInfo //用户基本信息
        var nickName = userInfo.nickName //用户名
        var avatarUrl = userInfo.avatarUrl //头像链接
        that.setData({
          nickName: nickName,
          avatarUrl: avatarUrl,
          show:true
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.globalData.app_name
    })
    console.log("------nickName----",app.globalData);
    var that = this;
    if (app.globalData.userInfo.nickName) {
      that.setData({
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        show:true
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          nickName: app.globalData.userInfo.nickName,
          avatarUrl: app.globalData.userInfo.avatarUrl,
          show: false
        })
      }
    }

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