// pages/megCenter/msgCenter.js
var app = getApp();
var token = wx.getStorageSync("token");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
     
    ],

  },
  scroll: function (event) {
    console.log(123)
  },
  loadMore: function () {
    console.log("下拉");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://test.51fanshu.com/restapi/notice',
      data: {

      },
      header: {
        'app-id': app.globalData.app_id,
        'AUTHORIZATION': token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log("---",res.data.results);
        let dataList = res.data.results;
        
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
    // console.log("update");
    // wx.stopPullDownRefresh();
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