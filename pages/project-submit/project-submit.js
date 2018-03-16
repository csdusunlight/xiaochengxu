// pages/project-submit/project-submit.js
var util = require('../../utils/util.js')
var app = getApp();
var submit_arr = [];
var project_id;
var isDate;
var isQQ;
var isZfb;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemShow: [],
    itemClass: ['', '', '', 'yes', '', '', '', '', ''],
    imageList: [],
    imgLimitCount: 6,
    submitData: ['', '', '', '', '', '', '', '', '', '',],
    submit_date: '',
    isfutou: false,
    canvasImgUrl: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    isDate = false;
    isQQ = false;
    isZfb = false;
    submit_arr = options.need_str.split(',');
    console.log(submit_arr);
    for (var j = 0; j < submit_arr.length; j++) {
      if (submit_arr[j] == 3) {
        isDate = true;
      } else if (submit_arr[j] == 4) {
        isZfb = true;
      } else if (submit_arr[j] == 7) {
        isQQ = true;
      }
    }
    console.log(isDate);
    console.log(isZfb);
    console.log(isQQ);
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.title
    })
    project_id = options.project;
    var itemShow_02 = [false, false, false, false, false, false, false, false, false];

    for (var i = 0; i < itemShow_02.length; i++) {
      for (var j = 0; j < submit_arr.length; j++) {
        if (submit_arr[j] == i) {
          itemShow_02[i] = true;
        }
      }
    }
    var submitData_02 = this.data.submitData;
    submitData_02[3] = this.getNowFormatDate();
    if (isZfb) {
      submitData_02[4] = app.globalData.userInfo.zhifubao;
    }
    if (isQQ) {
      submitData_02[7] = app.globalData.userInfo.qq_number;
    }
    
    this.setData({
      itemShow: itemShow_02,
      submit_date: this.getNowFormatDate(),
      submitData: submitData_02,
      isfutou: (options.isfutou == 'true' ? true : false)
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
  formTest: function (event) {
    var formType = event.currentTarget.dataset.type;
    var formKey = Number(event.currentTarget.dataset.key);
    var formValue = event.detail.value;
    console.log(formValue);
    var itemClass_02 = this.data.itemClass;

    var regNum = /^[0-9]*$/;
    var regQQ = /[1-9][0-9]{4,}/;
    var regName = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;
    var regMobile = /^13[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$/;//验证手机

    var isTrue = true;

    switch (formType) {
      case 'phone':
        if (!regMobile.test(formValue)) {
          itemClass_02[formKey] = 'no';
          isTrue = false;
        } else {
          itemClass_02[formKey] = 'yes';
          isTrue = true;
        }
        break;
      case 'qq':
        if (!regQQ.test(formValue)) {
          itemClass_02[formKey] = 'no';
          isTrue = false;
        } else {
          itemClass_02[formKey] = 'yes';
          isTrue = true;
        }
        break;
      case 'num':
        console.log(formValue);
        if (!regNum.test(formValue) || !formValue) {
          itemClass_02[formKey] = 'no';
          isTrue = false;
        } else {
          itemClass_02[formKey] = 'yes';
          isTrue = true;
        }
        break;
      case 'name':
        if (!regName.test(formValue)) {
          itemClass_02[formKey] = 'no';
          isTrue = false;
        } else {
          itemClass_02[formKey] = 'yes';
          isTrue = true;
        }
        break;
      case 'need':
        if (!formValue) {
          console.log(formValue);
          itemClass_02[formKey] = 'no';
          isTrue = false;
        } else {
          itemClass_02[formKey] = 'yes';
          isTrue = true;
        }
        break;
    }

    var submitData_02 = this.data.submitData;
    if (isTrue === false) {
      submitData_02[formKey] = '';
    } else {
      submitData_02[formKey] = formValue;
    }
    console.log(isTrue);
    console.log(submitData_02);

    this.setData({
      itemClass: itemClass_02,
      submitData: submitData_02
    })
  },
  pickerTest: function (event) {
    var formValue = event.detail.value;
    var submitData_02 = this.data.submitData;
    submitData_02[3] = formValue;
    this.setData({
      submit_date: formValue,
      submitData: submitData_02
    })
  },
  getNowFormatDate: function () {

    if (isDate) {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    } else {
      return '';
    }

  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: this.data.imgLimitCount,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        that.setData({
          imageList: res.tempFilePaths,
          canvasImgUrl: []
        })
        if (res.tempFilePaths) {
          console.log('图片张数' + res.tempFilePaths.length)
          // for (var i=0; i<res.tempFilePaths.length; i++) {
          // 缩放图片

          that.prodImageOpt(1, res.tempFilePaths.length, res.tempFilePaths);
          // }
        }
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      // urls: this.data.imageList
      urls: this.data.canvasImgUrl
    })
  },
  onSubmitData: function (e) {
    var investlog_id;
    var formFlag = true;
    var imgFlag = false;
    console.log(this.data.submitData);
    console.log(submit_arr);
    for (var i = 0; i < this.data.submitData.length; i++) {
      for (var j = 0; j < submit_arr.length; j++) {
        var index = Number(submit_arr[j]);
        if (index != 8 && !this.data.submitData[index]) {
          formFlag = false
        }
      }
    }
    if (!formFlag) {
      wx.showModal({
        title: '提示',
        content: '提交数据有误，请检查后重新提交',
      })
      return;
    }
    var that = this;
    for (var i = 0; i < submit_arr.length; i++) {
      if (submit_arr[i] == 8) {
        imgFlag = true;
        if (!that.data.imageList.length) {
          wx.showModal({
            title: '提示',
            content: '请选择提交截图',
          })
          return;
        }
      }
    }

    var submit_type = e.detail.value.submit_type ? e.detail.value.submit_type : 1;
    wx.showLoading({
      title: '处理中...',
    })


    var submit_url = app.globalData.server_domain + '/submitOrder/';
    var submit_data = {
      project: project_id,
      invest_mobile: this.data.submitData[5],
      invest_name: this.data.submitData[0],
      invest_amount: this.data.submitData[1],
      invest_term: this.data.submitData[2],
      invest_date: this.data.submitData[3],
      zhifubao: this.data.submitData[4],
      expect_amount: this.data.submitData[6],
      qq_number: this.data.submitData[7],
      submit_type: submit_type,
      remark: this.data.submitData[9],
    }
    console.log(submit_data);
    // const app = getApp();
    var token = wx.getStorageSync('token');
    wx.request({
      url: submit_url,
      method: 'POST',
      data: submit_data,
      header: {
        'app-id': app.globalData.app_id,
        'AUTHORIZATION': token,
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data.code == 0) {
          investlog_id = res.data.investlog_id;
          var successUp = 0; //成功个数
          var failUp = 0; //失败个数
          var length = that.data.imageList.length; //总共个数
          var i = 0; //第几个
          console.log(imgFlag);
          if (imgFlag) {
            that.uploadImg(investlog_id, that.data.canvasImgUrl, successUp, failUp, i, length)
          } else {
            wx.hideLoading();
            wx.showToast({ title: '提交成功！' });
          }
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg ? res.data.msg : '网络错误',
          })
          wx.hideLoading();
        }
      },
      fail: function (error) {
        wx.hideLoading();
        console.log(error);
        console.log('fail')
      },
      complete: function () {

      }
    })
  },
  prodImageOpt: function (i, length, files) {
    console.log(i);
    console.log(length);
    console.log(files[i - 1]);
    console.log(files);
    console.log('prodImageOpt');
    var that = this;
    const ctx = wx.createCanvasContext('attendCanvasId');
    ctx.drawImage(files[i - 1], 0, 0, 50, 90);
    // ctx.draw();
    ctx.draw(false, function (e) {


      wx.canvasToTempFilePath({
        canvasId: 'attendCanvasId',
        success: function success(res) {
          console.log('压缩图片成功');
          i++;
          var canvasImgUrl_02 = that.data.canvasImgUrl;
          console.log(res.tempFilePath);
          canvasImgUrl_02.push(res.tempFilePath);

          that.setData({
            canvasImgUrl: canvasImgUrl_02
          });
          if (i <= length) {
            that.prodImageOpt(i, length, files);
          } else {
            return;
          }
        },
        complete: function complete(e) {
          console.log(e);
        }
      });
    })


  },
  uploadImg: function (investlog_id, filePaths, successUp, failUp, i, length) {
    var that = this;
    console.log(investlog_id);
    console.log(filePaths[i]);
    console.log('i=' + i + ',length=' + length);
    // var timetamp = new Date().getTime()
    wx.uploadFile({
      url: app.globalData.server_domain + '/xcx/submit_screenshot/',
      filePath: filePaths[i],
      name: 'screenshot',
      header: {
        "Content-Type": "image/jpeg",
      },
      formData: { 'id': investlog_id },
      success: function (res) {

        var data = JSON.parse(res.data);
        if (data.code == 0) {
          successUp++;
          console.log('success');
        } else {
          failUp++;
          console.log('fail');
        }

      },
      fail: function (res) {
        failUp++;
        console.log('fail');
      },
      complete: function (res) {
        console.log(res);
        i++;
        if (i == length) {
          wx.hideLoading();
          wx.showToast({ title: '' + '成功！截图：' + successUp });
        } else { //递归调用uploadDIY函数 
          that.uploadImg(investlog_id, filePaths, successUp, failUp, i, length);
        }
      },
    });
  }
})