// pages/project-submit/project-submit.js
var submit_str = '0,1,2,3,4,5,6,7,8';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemShow: [],
    itemClass: ['', '', '', '', '', '', '', '', ''],
    date: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var submit_arr = submit_str.split(',');
    var itemShow_02 = ['false', false, false, false, false, false, false, false, false];
    console.log(itemShow_02);
    console.log(submit_arr);
    
    for (var i = 0; i < itemShow_02.length; i++) {
      for (var j = 0; j < submit_arr.length; j++) {
        if (submit_arr[j] == i) {
          itemShow_02[i] = true;
          console.log(itemShow_02[i]);
        }
      }
    }
    this.setData ({
      itemShow: itemShow_02
    })
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
  formTest: function(event) {
    var formType = event.currentTarget.dataset.type;
    var formKey = Number(event.currentTarget.dataset.key);
    var formValue = event.detail.value;
    var itemClass_02 = this.data.itemClass;
    if (!formValue) {
      
      itemClass_02[formKey] = 'no';
      
    } else {
      
      itemClass_02[formKey] = 'yes';
    }
    console.log(itemClass_02);
    this.setData({
      itemClass: itemClass_02
    })
  },
  pickerTest: function (event){
    this.setData({
      date: event.detail.value
    })
  }
})