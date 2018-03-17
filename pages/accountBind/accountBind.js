// pages/accountBind/accountBind.js
var settings = require('../../settings.js');
var app = getApp();
var url = app.globalData.server_domain;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bind_qq: false,
		bindAlipay: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this;
		console.log("----", app.globalData.userInfo.qq_number);
		if (!app.globalData.userInfo.qq_number) {
			that.setData({
				bind_qq: false
			})
		}else{
      that.setData({
        bind_qq: true
      })
    }
		if (!app.globalData.userInfo.zhifubao) {
			that.setData({
				bindAlipay: false
			})
		}else{
      that.setData({
        bindAlipay: true
      })
    }
	},
	//点击跳转到绑定QQ页面
	qqbind: function () {
		wx.navigateTo({
			url: '../QQ/QQ',
		})
	},
	//点击跳转到绑定支付宝页面
	alibind: function () {
		wx.navigateTo({
			url: '../Alipay/Alipay',
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

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	}
	
})