var settings = require('../../settings.js');
var app = getApp();
var server_domain = app.globalData.server_domain;
var pages;    
var pageSize = 6; 
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      that.loading();
  },
  loading: function () {
    let that = this;
    pages = 1;
    var token = wx.getStorageSync("token");
    if (!app.globalData.userInfo.nickName) {
      that.setData({
        array: ''
      })
    } else {
      wx.request({
        url:server_domain + "/restapi/notice?page=" + pages + '&pageSize=' + pageSize,
        data: {},
        header: {
          'app-id': app.globalData.app_id,
          'AUTHORIZATION': token
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log("----", res.data.results);
          let dataList = res.data.results;
          that.setData({
            array: dataList
          })
        }
      })
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
    var that = this;
    wx.showNavigationBarLoading();
    that.loading();
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    wx.hideNavigationBarLoading();
    var token = wx.getStorageSync('token');
    var that = this;
    wx.request({
      url: server_domain + '?page=' + pages + '&pageSize=' + pageSize,
      method: "get",
      header: {
        'app-id': app.globalData.app_id,
        'AUTHORIZATION': token
      },
      success: (res) => {
        let dataList = res.data.results;
        if (dataList) {
          for (var i = 0, l = dataList.length; i < l; i++) {
            that.data.array.push(dataList[i])
          }
          pages++;
          that.setData({
            array: that.data.array
          })
        } else {
          that.setData({
            xianshi: true
          })
        }
      }
    })
  },  

})