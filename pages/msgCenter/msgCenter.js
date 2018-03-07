// pages/megCenter/msgCenter.js
var page = 1;
var pageSize = 8;
//请求数据
var loadMore = function(that){
   var that = this;
   wx.request({
     url: 'http://127.0.0.1:8000/',
   }) 
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      {
        id: 0,
        title: '福利审核',
        time: "2018-01-31 10:08:46",
        state: '您提交的“ppmoney”项目审核已通过。'
      },
      {
        id: 1,
        title: '福利审核1',
        time: "2018-01-31 10:08:46",
        state: '您提交的“ppmoney”项目审核已通过。'
      },
      {
        id: 2,
        title: '福利审核2',
        time: "2018-01-31 10:08:46",
        state: '您提交的“ppmoney”项目审核已通过。'
      },
      {
        id: 3,
        title: '福利审核3',
        time: "2018-01-31 10:08:46",
        state: '您提交的“ppmoney”项目审核已通过。'
      },
      {
        id: 3,
        title: '福利审核3',
        time: "2018-01-31 10:08:46",
        state: '您提交的“ppmoney”项目审核已通过。'
      },
      {
        id: 3,
        title: '福利审核3',
        time: "2018-01-31 10:08:46",
        state: '您提交的“ppmoney”项目审核已通过。'
      },
      {
        id: 3,
        title: '福利审核3',
        time: "2018-01-31 10:08:46",
        state: '您提交的“ppmoney”项目审核已通过。'
      },
      {
        id: 3,
        title: '福利审核3',
        time: "2018-01-31 10:08:46",
        state: '您提交的“ppmoney”项目审核已通过。'
      },
      {
        id: 3,
        title: '福利审核3',
        time: "2018-01-31 10:08:46",
        state: '您提交的“ppmoney”项目审核已通过。'
      },
      {
        id: 3,
        title: '福利审核3',
        time: "2018-01-31 10:08:46",
        state: '您提交的“ppmoney”项目审核已通过。'
      },
      {
        id: 4,
        title: '福利审核4',
        time: "2018-01-31 10:08:46",
        state: '您提交的“ppmoney”项目审核已通过。'
      }
    ],

  },
  intoMsg: function (e) {
    wx.showToast({
      title: '进入下一级消息详情',
    })
  },
  scroll:function(event){
    console.log(123)
  },
  loadMore:function(){
    console.log("下拉");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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