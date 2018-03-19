var id='';
var title = '';
var project = '';
var needs = '';
var yuyue = '';
var isfutou = '';
Page({

  data: {
    projectId: '',
    needs: '',
    project: '',
    interest: '',
    price: '',
    term: '',
    range: ''
  },

  onLoad: function (options) {
    id = options.id;
    title = options.title;
    project = options.project;
    needs = options.need_str;
    yuyue = options.yuyue;
    isfutou = options.isfutou;
    console.log(options);
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      id: options.id,
      project: options.project,
      needs: options.need_str,
      yuyue: options.yuyue,
      intrest: options.intrest,
      price: options.price,
      term: options.term,
      range: options.range
    })

  },

  onSubmit: function (event) {
    wx.navigateTo({
      url: "../../project-submit/project-submit?id=" + id + "&title=" + title + "&project=" + project + "&need_str=" + needs + "&isfutou=" + isfutou
    })
  }
})