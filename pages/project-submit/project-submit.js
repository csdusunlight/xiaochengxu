// pages/project-submit/project-submit.js
var submit_str = '0,1,2,3,4,5,6,7,8';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemShow: [],
    itemClass: ['', '', '', '', '', '', '', '', ''],
    date: '',
    imageList: [],
    imgLimitCount: 6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
      itemShow: itemShow_02,
      date: this.getNowFormatDate()
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

    var regNum = /^[0-9]*$/;
    var regQQ = /[1-9][0-9]{4,}/;
    var regName = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;
    var regMobile = /^13[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$/;//验证手机
    switch (formType){
      case 'phone':
        if (!regMobile.test(formValue)) {
          itemClass_02[formKey] = 'no';
        } else {
          itemClass_02[formKey] = 'yes';
        }
        break;
      case 'qq':
        if (!regQQ.test(formValue)) {
          itemClass_02[formKey] = 'no';
        } else {
          itemClass_02[formKey] = 'yes';
        }
        break;
      case 'num':
      console.log(formValue);
      if (!regNum.test(formValue) || !formValue) {
          itemClass_02[formKey] = 'no';
        } else {
          itemClass_02[formKey] = 'yes';
        }
        break;
      case 'name':
        if (!regName.test(formValue)) {
          itemClass_02[formKey] = 'no';
        } else {
          itemClass_02[formKey] = 'yes';
        }
        break;
      case 'need':
        if (!formValue) {
          console.log(formValue);
          itemClass_02[formKey] = 'no';
        } else {
          itemClass_02[formKey] = 'yes';
        }
        break;
    }
    
    console.log(itemClass_02);
    this.setData({
      itemClass: itemClass_02
    })
  },
  pickerTest: function (event){
    var formValue = event.detail.value;
    this.setData({
      date: formValue
    })
  },
  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if(month >= 1 && month <= 9) {
      month = "0" + month;
    }
        if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: this.data.imgLimitCount,
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  submitData : function () {
    console.log('submit');
  }
})