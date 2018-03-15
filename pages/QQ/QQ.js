// pages/QQ/QQ.js
var app = getApp();
var token = wx.getStorageSync("token");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------',app.globalData.userInfo)
  },
  submit:function(e){
     let qq = e.detail.value.qq;
     let regx = /^[1-9]\d{4,9}$/;
     if(!regx.test(qq)){
        wx.showModal({
          title: '提示',
          content: '请输入正确的QQ号码',
        })
     }
     wx.request({
       url: 'http://test.51fanshu.com/xcx/update_userinfo/ ',
       data: {
         qq_number:qq
       },
       header: {
         'app-id': app.globalData.app_id,
         'AUTHORIZATION': token
       },
       dataType:JSON,
       method: 'post',
       success: function(res) {
         console.log(res);
         wx.showModal({
           title: '提示',
           content: '修改成功'
         })
       },
       fail:function(){
         wx.showModal({
           title: '提示',
           content: '修改失败',
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