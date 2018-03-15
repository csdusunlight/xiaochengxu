var app = getApp();
var pages = 1;     //设置分页
var pageSize = 10; //加载数据的条数
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
    var that = this;
    // var token = wx.getStorageSync('token');
    var token = "";
    wx.request({
      url: 'http://test.51fanshu.com/xcx/investlogs/?page='+pages+'&pageSize='+pageSize,
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
      },
      fail:function(){
        console.log(error);
      }
    })
  },
  //删除数据
  delete: function (e) {
    let that = this;
    var token = wx.getStorageSync('token');
    var dId = e.currentTarget.id;//获取当前数据的id
    console.log(dId);
    wx.showModal({
      title: '提示',
      content: '是否要删除该条数据？',
      success: function (event) {
        if (event.confirm) {
          console.log("删除该条数据")
          wx.request({
            url: 'http://test.51fanshu.com/xcx/investlogs/',
            method: "delete",
            data: {
              id:dId
            },
            header: {
              'app-id': app.globalData.app_id,
              'AUTHORIZATION': token
            },
            success: function () {
                wx.showToast({
                  title: '删除成功！',
                })
            },
          })
        } else if (event.cancel) {
          console.log("取消");
        }
        //更新列表状态
        let list = that.data.dataList;
        that.setData({
            array:list
        })
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
      url: 'http://test.51fanshu.com/xcx/investlogs/?page=' + pages + '&pageSize=' + pageSize,
      method: "get",
      header: {
        'app-id': app.globalData.app_id,
        'AUTHORIZATION': token
      },
      success:(res) =>{
        let dataList = res.data.results;
        dataList.forEach((item) => {
          item.submit_time = item.submit_time.substring(0,10);
        });
        pages++;
        that.setData({
          array:dataList
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