var util = require('../../utils/util.js')
var dataList = require("../../data/projectData.js");
var app =  getApp();
var get_project_data_url = app.globalData.server_domain + '/restapi/sub/?is_on=true';
var projectListData = [];
var searchListData = [];
var url_page = 1;

Page({

  data: {
    inputShowed: false,
    inputVal: "",
    listData: [],
    searchData: [],
    listBoxShow: true,
    searchBoxShow: false,
    noDataShow: false,
    projectData:[]
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.globalData.app_name
    })
    var that = this;
    util.getAuditeState(this);
    var url = get_project_data_url + '&page=' + url_page + '&pageSize=8';
    that.setData({
      projectData: dataList.projectData.results
    })
    // if (this.data.is_on_audite) {
    //   console.log(true)
    //   url = get_project_data_url + '&page=' + url_page + '&pageSize=8' + '&is_official=3';
    // } else {
    //   console.log(false)
    // }
    // if (app.globalData.userInfo.is_on_audite) {
    //   this.setData({
    //     is_on_audite: app.globalData.userInfo.is_on_audite
    //   })
    // } else {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoChangeCallback = res => {
    //     this.setData({
    //       is_on_audite: app.globalData.userInfo.is_on_audite
    //     })
    //   }
    // }
    wx.showNavigationBarLoading();
    util.http(url, 'get', '', function (res) {
      that.HandleData(res.results,'listData')
    });
  },
  showInput: function () {
    this.setData({
      inputShowed: true,
      listBoxShow: false,
      searchBoxShow: true,
      searchData: []
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      listBoxShow: true,
      searchBoxShow: false,
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    console.log('typing');
    var that = this;
    this.setData({
      inputVal: e.detail.value,
      searchData: []
    });
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '正在加载...'
    })
    var url = get_project_data_url + '&project_title_contains=' + e.detail.value;
    util.http(url, 'get', '', function (res) {
      that.HandleData(res.results, 'searchData')
    });
  },
  //跳转
  projectTab: function (event){
    var projectId = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    var need_str = event.currentTarget.dataset.needs;
    var yuyue = event.currentTarget.dataset.yuyue;
    var project = event.currentTarget.dataset.project;
    var isfutou = event.currentTarget.dataset.isfutou;
    var intrest = event.currentTarget.dataset.intrest;
    var price = event.currentTarget.dataset.price;
    var term = event.currentTarget.dataset.term;
    var range = event.currentTarget.dataset.range;
    var desc = event.currentTarget.dataset.desc
    wx.navigateTo({
      url: "./project-detail/project-detail?id=" + projectId + "&title=" + title + "&project=" + project + "&need_str=" + need_str + "&yuyue=" + yuyue + "&isfutou=" + isfutou + "&intrest=" + intrest + "&price=" + price + "&term=" + term + "&range=" + range + "&desc="+desc
    })
  },
  onProjectTab: function (event) {
    var projectId = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    var need_str = event.currentTarget.dataset.needs;
    var yuyue = event.currentTarget.dataset.yuyue;
    var project = event.currentTarget.dataset.project;
    var isfutou = event.currentTarget.dataset.isfutou;
    var intrest = event.currentTarget.dataset.intrest;
    var price = event.currentTarget.dataset.price;
    var term = event.currentTarget.dataset.term;
    var range = event.currentTarget.dataset.range;
    wx.navigateTo({
      url: "./project-detail/project-detail?id=" + projectId + "&title=" + title + "&project=" + project + "&need_str=" + need_str + "&yuyue=" + yuyue + "&isfutou=" + isfutou + "&intrest=" + intrest + "&price=" + price + "&term=" + term + "&range=" + range
    })
  },
  onSearchFocus: function () {
    this.setData({
      listBoxShow: false,
      searchBoxShow: true
    })
  },
  onSearchInput: function (event) {
    var that = this;
    wx.showNavigationBarLoading();
    
    var url = get_project_data_url + '&project_title_contains=' + event.detail.value;
    util.http(url, 'get', '', function (res) {
      that.HandleData(res.results,'searchData')
    });
  },
  cancelSearch: function () {
    this.setData({
      listBoxShow: true,
      searchBoxShow: false
    })
  },
  onReachBottom: function () {
    if (!this.data.listBoxShow) {
      return;
    }
    if (this.data.noDataShow) {
      return;
    }
    
    wx.showLoading({
      title: '正在加载...'
    })
    wx.showNavigationBarLoading();
    var that = this;
    var url = get_project_data_url + '&page=' + url_page + '&pageSize=8';
    util.http(url, 'get','', function (res) {
      that.HandleData(res.results,'listData')
    });
  },
  HandleData: function (data,settleKey) {
    var that = this;
    console.log('look data');
    console.log(data);
    if (data) {
      searchListData = [];
      for (var i in data) {
        var temp = {
          id: data[i].id,
          project: data[i].project,
          title: data[i].project_title,
          year: data[i].project_intrest,
          return_amount: (data[i].shortprice ? data[i].shortprice : data[i].project_shortprice),
          range: data[i].project_investrange,
          term: data[i].project_term,
          project_state: data[i].project_state,
          yuyue: data[i].project_is_book,
          necessary_fields: data[i].necessary_fields,
          isfutou: data[i].project_is_multisub_allowed,
          img_url: data[i].project_picture,
          marks: data[i].marks,
          is_on_audite: that.data.is_on_audite
        }
        if (temp.img_url.indexOf('http') !== 0) {
          temp.img_url = app.globalData.server_domain + temp.img_url
        }
        if (settleKey == 'listData') {
          projectListData.push(temp);
        } else if (settleKey == 'searchData') {
          searchListData.push(temp);
        }
      }
      if (settleKey == 'listData') {
        that.setData({
          listData: projectListData
        })
        url_page++;
      } else if (settleKey == 'searchData') {
        that.setData({
          searchData: searchListData
        })
      }
    } else {
      that.setData({
        noDataShow: true
      })
    }
    wx.hideNavigationBarLoading();
    wx.hideLoading();
  },
  onPullDownRefresh: function() {
    if (!this.data.listBoxShow) {
      wx.stopPullDownRefresh();
      return;
    }
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '正在刷新...'
    })
    var that = this;
    url_page = 1;
    var url = get_project_data_url + '&page=' + 1 + '&pageSize=8';
    util.http(url, 'get', '', function (res) {
      that.setData({
        noDataShow: false
      })
      wx.stopPullDownRefresh();
      projectListData = [];
      url_page = 1;
      that.HandleData(res.results, 'listData')
    });
  }
})