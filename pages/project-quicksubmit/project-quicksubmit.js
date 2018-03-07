// pages/demo/demo.js
let projectListData = require('../../data/projectListData.js');

Page({

  data: {
    projectListData: projectListData
  },

  bindtap(e) {
    console.log(e.detail)
  }

})