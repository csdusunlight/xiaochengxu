var settings = require('../../settings.js');
var app = getApp();
var server_domain = app.globalData.server_domain;
var pages;     //设置分页
var pageSize = 12; //加载数据的条数
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    xianshi: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.loadMore()

  },
  //删除数据
  delete: function (e) {
    console.log(e);

    let that = this;
    var token = wx.getStorageSync('token');//获取token
    var dId = e.currentTarget.id;//获取当前数据的id
    // console.log("-- did --",dId);
    wx.showModal({
      title: '提示',
      content: '是否要删除该条数据？',
      success: function (event) {
        if (event.confirm) {
          wx.request({
            url: url + dId,
            method: "delete",
            data: {
              // id:dId
            },
            header: {
              'app-id': app.globalData.app_id,
              'AUTHORIZATION': token
            },
            success: function (e) {
              wx.showToast({
                title: '删除成功！',
              })
            },
          })
        } else if (event.cancel) {
          console.log("取消");
        }

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
    wx.showNavigationBarLoading();
    this.loadMore();
    wx.hideNavigationBarLoading() //完成停止加载
    
  },
  loadMore: function () {
    var that = this;
    pages = 1;
    var token = wx.getStorageSync('token');
    //判断用户是否登录，没有登陆，设置array没空；登陆了则进行request请求
    if (!app.globalData.userInfo.nickName) {
      that.setData({
        array: ""
      })
    } else {
      wx.request({
        url: server_domain + '/xcx/investlogs/?page=' + pages + '&pageSize=' + pageSize,
        method: "get",
        header: {
          'app-id': app.globalData.app_id,
          'AUTHORIZATION': token
        },
        success: (res) => {
          let dataList = res.data.results;
          console.log("---dataList---:",dataList);
          dataList.forEach((item) => {
            item.submit_time = item.submit_time.substring(0, 10);
          })
          that.setData({
            array: dataList,
          })
          wx.stopPullDownRefresh() //停止下拉刷新
        },
        fail: function () {
          console.log()
        }
      })
    }
  },

  /**
   * 页面上拉触asd底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    wx.hideNavigationBarLoading()

    var token = wx.getStorageSync('token');
    var that = this;
    console.log("下拉loading~");
    wx.request({
      url: server_domain + '?page=' + pages + '&pageSize=' + pageSize,
      method: "get",
      header: {
        'app-id': app.globalData.app_id,
        'AUTHORIZATION': token
      },
      success: (res) => {//res请求成功并返回的数据
        let dataList = res.data.results;
        if (res.data.results) {
          //判断data是否有值   有循环并push 没有直接让xianshi为true
          dataList.forEach((item) => {
            item.submit_time = item.submit_time.substring(0, 10);
          });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})