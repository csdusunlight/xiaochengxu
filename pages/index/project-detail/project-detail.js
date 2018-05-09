var util = require('../../../utils/util.js')
var id='';
var title = '';
var project = '';
var needs = '';
var yuyue = '';
var isfutou = '';
var desc = ''
Page({

  data: {
    projectId: '',
    needs: '',
    project: '',
    interest: '',
    price: '',
    term: '',
    range: '',
    desc:''
  },

  onLoad: function (options) {
    id = options.id;
    title = options.title;
    project = options.project;
    needs = options.need_str;
    yuyue = options.yuyue;
    isfutou = options.isfutou;
    desc = options.desc
    console.log(options);

    util.getAuditeState(this);
    
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
      range: options.range,
      desc : options.desc
    })

  },

  onSubmit: function (event) {
    wx.navigateTo({
      url: "../../project-submit/project-submit?id=" + id + "&title=" + title + "&project=" + project + "&need_str=" + needs + "&isfutou=" + isfutou
    })
  }
})