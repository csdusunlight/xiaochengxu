var projectsData = require('../../data/project-data.js')
var projectsSearchData = require('../../data/project-search-data.js')
var util = require('../../utils/util.js')
var get_project_data_url = 'http://test.51fanshu.com/restapi/sub/?is_on=true';
var projectListData = [];
var searchListData = [];
var url_page = 1;

Page({

  data: {
    listData: [],
    searchData: [],
    listBoxShow: true,
    searchBoxShow: false,
    noDataShow: false
  },

  onLoad: function (options) {
    // this.setData({
    //   projectList: projectsData.projectData
    // });
    var url = get_project_data_url + '&page=' + url_page + '&pageSize=4';
    var that = this;
    wx.showNavigationBarLoading();
    util.http(url, 'get', function (res) {
      that.HandleData(res.results,'listData')
    });
  },

  onProjectTab: function (event) {
    var projectId = event.currentTarget.dataset.id;
    var need_str = event.currentTarget.dataset.needs;
    wx.navigateTo({
      url: "../project-submit/project-submit?id=" + projectId + "&need_str=" + need_str
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
    util.http(url, 'get', function (res) {
      that.HandleData(res.results,'searchData')
    });
    // this.setData({
    //   projectSearchList: projectsSearchData.projectData
    // })
  },
  cancelSearch: function () {
    this.setData({
      listBoxShow: true,
      searchBoxShow: false
    })
  },
  onScrollLower: function () {
    wx.showNavigationBarLoading();
    var that = this;
    var url = get_project_data_url + '&page=' + url_page + '&pageSize=4';
    util.http(url, 'get', function (res) {
      that.HandleData(res.results,'listData')
    });
  },
  HandleData: function (data,settleKey) {
    var that = this;
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
          necessary_fields: data[i].necessary_fields
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
  }
})