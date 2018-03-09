// pages/orderRecord/orderRecord.js
// var util = require('../../utils/util.js');
var app = getApp();
var token = wx.getStorageSync('token');
var page = 1;
var pageSize = 5;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [
      
    ]
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("pageSize:" + pageSize);
    var that = this;
    console.log("start");
    wx.request({
      url: 'http://test.51fanshu.com/xcx/investlogs/?page=1&pageSize=pageSize',
      method: "get",
      header: {
        'app-id': app.globalData.app_id,
        'AUTHORIZATION': token
      },
      success: function (res) {
        var dataList = res.data.results;
        console.log(dataList);
        for (var i in res.data.results) {
          var splitData = res.data.results[i].submit_time.split("T")[0];
          console.log("------", splitData);
          dataList.push(res.data.results[i]);
        }
        that.setData({
          array: dataList
        })
      }
    })
  },
  //跳转到编辑页面
  editor: function () {
    wx.navigateTo({
      url: '../dataEditor/dataEditor',
    });
  },
  //删除数据
  delete: function () {
    wx.showModal({
      title: '提示',
      content: '是否要删除该条数据？',
      success: function (event) {
        if (event.confirm) {
          console.log("删除该条数据")
          wx.request({
            url: '',
            method: "delete",
            data: {

            },
            header: {
              'app-id': app.globalData.app_id,
              'AUTHORIZATION': token
            },
            success: function () {
                
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
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("下拉loading~");
    wx.request({
      url: 'http://test.51fanshu.com/xcx/investlogs/?page=1&pageSize=pageSize',
      method: "get",
      header: {
        'app-id': app.globalData.app_id,
        'AUTHORIZATION': token
      },
      success: function (res) {
        var dataList = res.data.results;
        console.log(dataList);
        for (var i in res.data.results) {

          dataList.push(res.data.results[i])
        }
        page++;
        that.setData({
          array: dataList
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})