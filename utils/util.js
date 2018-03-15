const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function http(url,method,data,callBack) {
  const app = getApp();
  var token = wx.getStorageSync('token');
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'app-id': app.globalData.app_id,
      'AUTHORIZATION': token
      // "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}

//extend方法
function extend(des, src, override) {
  if (src instanceof Array) {
    for (var i = 0; i < src.length; i++) {
      extend(des, src[i], override);
    }
  }
  else {
    for (var i in src) {
      if (override || !(i in des)) {
        des[i] = src[i];
      }
    }
  }

  return des;
}

module.exports = {
  formatTime: formatTime,
  http: http,
  extend:extend
}
