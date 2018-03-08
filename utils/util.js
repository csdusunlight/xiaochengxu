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

function http(url,method,callBack) {
  const app = getApp();
  var token = wx.getStorageSync('token');
  wx.request({
    url: url,
    method: method,
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

module.exports = {
  formatTime: formatTime,
  http: http
}
