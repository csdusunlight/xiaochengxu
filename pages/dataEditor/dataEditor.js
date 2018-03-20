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
    console.log(pageId);
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: server_domain + "/xcx/investlogs/" + pageId +'/',
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
  //修改时间
  changeDate: function (e) {
    var that = this;
    let _date = e.detail.value;
    that.setData({
      'array.invest_date': _date
    })
  },
  //提交数据
  click: function (e) {
    var token = wx.getStorageSync('token');
    var that = this;
    console.log("pid:", pageId);//由全局变量传过来的pageId
    var project_title = e.detail.value.project_title; //获取项目标题
    var sub_time = e.detail.value.submit_time; //获取提交时间
    var term_val = e.detail.value.term;  //获取标期
    var amount_val = e.detail.value.amount; //获取金额
    var return_amount = e.detail.value.return_amount; //获取返现金额
    var phone = e.detail.value.phone_num; //获取手机号
    var date_val = e.detail.value.date; //获取投资日期
    if (!term_val || !amount_val || !return_amount || !phone) {
      wx.showModal({
        title: '提示',
        content: '输入框不能为空',
      })
      return;
    }
    wx: wx.request({
      url: server_domain + '/xcx/investlogs/' + pageId + '/',
      data: {
        submit_time: sub_time,
        project_title: project_title,
        invest_term: term_val,
        invest_amount: amount_val,
        return_amount: return_amount,
        invest_mobile: phone,
        invest_date: date_val
      },
      header: {
        'app-id': app.globalData.app_id,
        'AUTHORIZATION': token
      },
      method: 'put',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '是否修改该数据',
          success: function (event) {
            if (event.confirm) {
              wx.navigateTo({
                url: '../orderRecord/orderRecord',
              })
            } else if (event.cancel) {
              console.log("取消");
            }

          }

        })
      },
    })
  },
  //金额正则验证
  checkAomunt: function (e) {
    let regx = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if (!regx.test(e.detail.value)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的金额',
      });
      return;
    }
  },
  //返现金额正则验证
  checkMoney: function (e) {
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
  checkNum: function (e) {
    let regx = /^1(3|4|5|7|8)\d{9}$/;
    if (!regx.test(e.detail.value)) {
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