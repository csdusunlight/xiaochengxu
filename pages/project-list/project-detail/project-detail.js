// pages/projectdetail/projectdetail.js
var id='';
var project = '';
var needs = '';
var yuyue = '';
var isfutou = '';
Page({

  data: {
    projectId: '',
    needs: '',
  },

  onLoad: function (options) {
    id = options.id;
    project = options.project;
    needs = options.need_str;
    yuyue = options.yuyue;
    isfutou = options.isfutou;
      console.log(options);
      this.setData({
        id: options.id,
        project: options.project,
        needs: options.need_str,
        yuyue: options.yuyue,
      })

  },

  onSubmit: function (event) {
    // var projectId = event.currentTarget.dataset.id;
    // var need_str = event.currentTarget.dataset.needs;
    // var yuyue = event.currentTarget.dataset.yuyue;
    wx.navigateTo({
      url: "../../project-submit/project-submit?id=" + id + "&project=" + project + "&need_str=" + needs + "&isfutou=" + isfutou
      // url: "./project-detail/project-detail?id=" + projectId + "&need_str=" + need_str
    })
  }
})