// pages/demo/demo.js
var util = require('../../utils/util.js')
var app = getApp();
Page({

  data: {
    projectListData: []
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.globalData.app_name
    })
    wx.showNavigationBarLoading();
    var that = this;
    util.getAuditeState(this);
    var url = app.globalData.server_domain + '/xcx/get_project_list/';
    util.http(url, 'get', '', function (res) {
      that.HandleData(res);
    });
  },
  HandleData: function(res) {
    for(var i in res){
      var items = res[i].item;
      for(var j in items){
        var logo = items[j].logo
        if (logo.indexOf('http')!==0){
          items[j].logo = app.globalData.server_domain + logo
        }
      }
    }
    this.setData({
      projectListData: res
    })
    wx.hideNavigationBarLoading();
  },

  bindtap: function (e) {
    console.log(e.detail);
    var id = e.detail.id;
    var title = e.detail.name;
    var need_str = e.detail.necessary_fields;
    var isfutou = e.detail.is_multisub_allowed;
    wx.navigateTo({
      url: "../project-submit/project-submit?project=" + id + "&title=" + title + "&need_str=" + need_str + "&isfutou=" + isfutou
    })
  },
  onPullDownRefresh: function(){
    console.log('下拉');
  }
})