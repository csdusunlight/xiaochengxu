// pages/dataEditor/dataEditor.js
var app = getApp();
var server_domain = app.globalData.server_domain;
var pageId;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token');
    pageId = options.id; //获取该条数据的id
    console.log("pageId:",pageId);
    var that = this;
    wx.showLoading({
      title: '正在刷新',
    })
    wx.request({
      url: server_domain + "/xcx/investlogs/" + pageId,
      method: "get",
      header: {
        'app-id': app.globalData.app_id,
        'AUTHORIZATION': token
      },
      success: function (res) {
        let dataList = res.data;
        let submit_time = dataList.submit_time.split("T")[0];//截取提交时间T前面的字符串
        console.log(dataList);
        that.setData({
          array: dataList,
          "array.submit_time": submit_time
        })
        wx.hideLoading();
      }
    })
  },
  retrun:function(){
     wx.navigateTo({
       url: '../orderRecord/orderRecord',
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