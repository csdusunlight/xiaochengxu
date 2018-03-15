// pages/demo/demo.js
var util = require('../../utils/util.js')
var app = getApp();
let projectListData = require('../../data/projectListData.js');

Page({

  data: {
    projectListData: []
  },
  onLoad: function (options) {
    var that = this;
    var url = app.globalData.base_url + '/xcx/get_project_list/';
    util.http(url, 'get', '', function (res) {
      that.HandleData(res);
    });
  },
  // http: function(url, method, callBack) {
  //   const app = getApp();
  //   var token = wx.getStorageSync('token');
  //   wx.request({
  //     url: url,
  //     method: method,
  //     header: {
  //       'app-id': app.globalData.app_id,
  //       'AUTHORIZATION': token
  //       // "Content-Type": "json"
  //     },
  //     success: function (res) {
  //       callBack(res.data);
  //     },
  //     fail: function (error) {
  //       console.log(error);
  //     }
  //   })
  // },
  HandleData: function(res) {
    this.setData({
      projectListData: res
    })
  },

  bindtap(e) {
    console.log(e.detail);
    var id = e.detail.id;
    var need_str = e.detail.necessary_fields;
    var isfutou = e.detail.is_multisub_allowed;
    wx.navigateTo({
      url: "../project-submit/project-submit?id=" + id + "&need_str=" + need_str + "&isfutou=" + isfutou
    })
  }

})