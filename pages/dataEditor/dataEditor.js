// pages/dataEditor/dataEditor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        proName:'友金所',
        subTime:"2017-11-11",
        date:"2017-11-12",
        amount:"",
        money:"",
        phone:""
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

  },
  changeDate: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  click:function(){
      console.log("提交数据");

  },
  //金额正则验证
  checkAomunt:function(e){
      let regx = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if(!regx.test(e.detail.value)){
          wx.showModal({
            title: '提示',
            content: '请输入正确的金额',
          });
          return;
      }
  },
  //返现金额正则验证
  checkMoney:function(e){
    let regx = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if (!regx.test(e.detail.value)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的返现金额',
      });
      return;
    }
  },
  //电话号码验证
  checkNum:function(e){
    let regx = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;
    if(!regx.test(e.detail.value)){
      wx.showModal({
        title: '提示',
        content: '请输入正确的电话号码',
      });
      return;
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