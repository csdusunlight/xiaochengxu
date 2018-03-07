var projectSubmitData = require('../../data/projectSubmitData.js')
var submitData = [
  {
    title: '项目名称',
    time: '投资时间',
    term: '投资标期',
    telnum: '投资手机号',
    state: '审核状态',
    remark: '备注'
  }
];
Page({

  data: {
    submitData: submitData
  },


  onLoad: function (options) {
    console.log(projectSubmitData.projectSubmitData);
    for (var i in projectSubmitData.projectSubmitData) {
      submitData.push(projectSubmitData.projectSubmitData[i]);
    }
    console.log(submitData);
    this.setData ({
      submitData: submitData
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底');
    console.log(projectSubmitData.projectSubmitData);
    for (var i in projectSubmitData.projectSubmitData) {
      submitData.push(projectSubmitData.projectSubmitData[i]);
    }
    console.log(submitData);
    this.setData({
      submitData: submitData
    })
  },

})