var settings = require('../../settings.js');
var data = require('../../data/data.js');
var app = getApp();
var server_domain = app.globalData.server_domain;
var pages;     //设置分页
var pageSize = 5; //加载数据的条数
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList:''
    // array: [],
    // xianshi: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let _that = this;
      _that.setData({
        dataList: data.listData.results
      })
  },
  jampPage:function(e){
    let title = e.currentTarget.dataset.title;
    let id = e.currentTarget.dataset.id;
    let text = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '../projectDetails/projectDetails?id=' + id + '&title=' + title + '&text=' + text +'/'
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
        console.log("rua");
        // wx.hideNavigationBarLoading()
        // console.log(data.listData.results)
        wx.showLoading({
          title: '正在刷新~~~',
        })
        setTimeout(function () {
          wx.hideLoading()
          wx.stopPullDownRefresh();
        }, 1500)
        let _that = this;
        _that.setData({
          dataList:data.listData.results
        });
        
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let data = data.listData.results.push(data.listData.results);
    let _that = this;
    console.log(data)
    wx.showLoading({
      title: '正在加载~~~',
    })
    setTimeout(function () {
      wx.hideLoading()
      wx.stopPullDownRefresh();
    }, 1500)
    _that.setData({
      dataList: data
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})